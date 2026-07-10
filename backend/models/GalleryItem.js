import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, trim: true, default: '' },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;
