import GalleryItem from '../models/GalleryItem.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { destroyCloudinaryAsset, uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

export const getGalleryItems = asyncHandler(async (req, res) => {
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  res.json(items);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title } = req.body;
  
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }

  const uploaded = await uploadBufferToCloudinary(req.file.buffer, 'finique/gallery', 'image');
  
  const item = await GalleryItem.create({
    image: uploaded.secure_url,
    title: title || ''
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

  await GalleryItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Gallery item deleted successfully' });
});
