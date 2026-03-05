import slugify from 'slugify';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { destroyCloudinaryAsset, uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

const parseSpecifications = (raw) => {
  if (!raw || raw === '') return {};
  if (typeof raw === 'object') return raw;
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Specifications must be a JSON object');
  }
  return parsed;
};

const destroyCloudinaryUrl = async (url, resourceType = 'image') => {
  await destroyCloudinaryAsset(url, resourceType);
};

const uploadImagesSafe = async (imageFiles = []) => {
  const uploaded = [];
  const warnings = [];

  for (const file of imageFiles) {
    try {
      const result = await uploadBufferToCloudinary(file.buffer, 'finique/products', 'image');
      uploaded.push(result.secure_url);
    } catch (error) {
      warnings.push(`Image upload failed: ${file.originalname || 'unknown file'}`);
    }
  }

  return { uploaded, warnings };
};

const uploadVideoSafe = async (videoFile) => {
  if (!videoFile) return { url: '', warning: null };
  try {
    const result = await uploadBufferToCloudinary(videoFile.buffer, 'finique/products', 'video');
    return { url: result.secure_url, warning: null };
  } catch (error) {
    return { url: '', warning: `Video upload failed: ${videoFile.originalname || 'video file'}` };
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  const { category, view } = req.query;
  const filter = category ? { category } : {};
  const query = Product.find(filter).sort({ createdAt: -1 });

  if (view === 'card') {
    query.select('title slug category description images');
    query.lean();
    res.set('Cache-Control', 'public, max-age=120');
  }

  const products = await query;
  res.json(products);
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .select('title slug category description images')
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  res.set('Cache-Control', 'public, max-age=180');
  res.json(products);
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { title, category, description, specifications } = req.body;

  if (!title || !category || !description) {
    res.status(400);
    throw new Error('Title, category and description are required');
  }

  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  const imageFiles = req.files?.images || [];
  const videoFile = req.files?.video?.[0] || null;
  let parsedSpecifications = {};
  try {
    parsedSpecifications = parseSpecifications(specifications);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid specifications JSON');
  }

  const { uploaded: images, warnings: imageWarnings } = await uploadImagesSafe(imageFiles);
  const { url: videoUrl, warning: videoWarning } = await uploadVideoSafe(videoFile);

  const product = await Product.create({
    title,
    slug,
    category,
    description,
    specifications: parsedSpecifications,
    images,
    videoUrl
  });

  const warnings = [...imageWarnings, ...(videoWarning ? [videoWarning] : [])];
  res.status(201).json({ product, warnings });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { title, category, description, specifications } = req.body;

  if (title && title !== product.title) {
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug, _id: { $ne: product._id } })) {
      slug = `${baseSlug}-${count++}`;
    }
    product.slug = slug;
    product.title = title;
  }

  if (category) product.category = category;
  if (description) product.description = description;
  if (specifications !== undefined) {
    try {
      product.specifications = parseSpecifications(specifications);
    } catch (error) {
      res.status(400);
      throw new Error(error.message || 'Invalid specifications JSON');
    }
  }

  const imageFiles = req.files?.images || [];
  const warnings = [];
  if (imageFiles.length) {
    const { uploaded: newImages, warnings: imageWarnings } = await uploadImagesSafe(imageFiles);
    warnings.push(...imageWarnings);
    product.images = [...product.images, ...newImages];
  }

  const videoFile = req.files?.video?.[0] || null;
  if (videoFile) {
    const { url: newVideoUrl, warning: videoWarning } = await uploadVideoSafe(videoFile);
    if (newVideoUrl) {
      if (product.videoUrl) {
        await destroyCloudinaryUrl(product.videoUrl, 'video');
      }
      product.videoUrl = newVideoUrl;
    }
    if (videoWarning) warnings.push(videoWarning);
  }

  const updated = await product.save();
  res.json({ product: updated, warnings });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.images?.length) {
    await Promise.all(product.images.map((url) => destroyCloudinaryUrl(url, 'image')));
  }
  if (product.videoUrl) {
    await destroyCloudinaryUrl(product.videoUrl, 'video');
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted successfully' });
});

export const deleteProductMedia = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400);
    throw new Error('Media URL is required');
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const isVideo = product.videoUrl === url;
  const isImage = product.images.includes(url);
  if (!isVideo && !isImage) {
    res.status(400);
    throw new Error('Media URL does not belong to this product');
  }

  product.images = product.images.filter((img) => img !== url);
  if (isVideo) product.videoUrl = '';

  await destroyCloudinaryUrl(url, isVideo ? 'video' : 'image');

  await product.save();
  res.json({ message: 'Media removed successfully', product });
});
