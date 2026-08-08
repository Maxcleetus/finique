import GalleryItem from '../models/GalleryItem.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { destroyCloudinaryAsset, uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

export const getGalleryItems = asyncHandler(async (req, res) => {
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  res.json(items);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title } = req.body;
  
  const mainImageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
  if (!mainImageFile) {
    res.status(400);
    throw new Error('Main image file is required');
  }

  const uploadedMain = await uploadBufferToCloudinary(mainImageFile.buffer, 'finique/gallery', 'image');
  
  const galleryImagesUrls = [];
  if (req.files && req.files['galleryImages'] && req.files['galleryImages'].length > 0) {
    for (const file of req.files['galleryImages']) {
      const uploadedSub = await uploadBufferToCloudinary(file.buffer, 'finique/gallery', 'image');
      galleryImagesUrls.push(uploadedSub.secure_url);
    }
  }

  const item = await GalleryItem.create({
    image: uploadedMain.secure_url,
    title: title || '',
    galleryImages: galleryImagesUrls
  });

  res.status(201).json(item);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }

  if (item.image) {
    await destroyCloudinaryAsset(item.image, 'image');
  }

  if (item.galleryImages && item.galleryImages.length > 0) {
    for (const imgUrl of item.galleryImages) {
      await destroyCloudinaryAsset(imgUrl, 'image');
    }
  }

  await GalleryItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Gallery item deleted successfully' });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const { title, existingGalleryImages } = req.body;
  const item = await GalleryItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }

  // Update Title
  if (title !== undefined) {
    item.title = title;
  }

  // Handle Main Cover Photo replacement
  const newMainImageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
  if (newMainImageFile) {
    if (item.image) {
      await destroyCloudinaryAsset(item.image, 'image');
    }
    const uploadedMain = await uploadBufferToCloudinary(newMainImageFile.buffer, 'finique/gallery', 'image');
    item.image = uploadedMain.secure_url;
  }

  // Handle existing sub-images retention
  let keptGalleryImages = [];
  if (existingGalleryImages) {
    try {
      keptGalleryImages = typeof existingGalleryImages === 'string'
        ? JSON.parse(existingGalleryImages)
        : existingGalleryImages;
    } catch {
      keptGalleryImages = Array.isArray(existingGalleryImages) ? existingGalleryImages : [existingGalleryImages];
    }
  } else {
    keptGalleryImages = item.galleryImages || [];
  }

  // Identify deleted sub-images and destroy them from Cloudinary
  const deletedImages = (item.galleryImages || []).filter(imgUrl => !keptGalleryImages.includes(imgUrl));
  for (const imgUrl of deletedImages) {
    await destroyCloudinaryAsset(imgUrl, 'image');
  }

  // Handle new sub-images upload and append
  const newGalleryImagesUrls = [];
  if (req.files && req.files['galleryImages'] && req.files['galleryImages'].length > 0) {
    for (const file of req.files['galleryImages']) {
      const uploadedSub = await uploadBufferToCloudinary(file.buffer, 'finique/gallery', 'image');
      newGalleryImagesUrls.push(uploadedSub.secure_url);
    }
  }

  item.galleryImages = [...keptGalleryImages, ...newGalleryImagesUrls];

  await item.save();
  res.json(item);
});

export const getGalleryItemById = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json(item);
});
