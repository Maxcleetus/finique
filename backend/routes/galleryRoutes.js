import express from 'express';
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  getGalleryItemById
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);
router.post(
  '/',
  protectAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'galleryImages', maxCount: 20 }
  ]),
  createGalleryItem
);
router.put(
  '/:id',
  protectAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'galleryImages', maxCount: 20 }
  ]),
  updateGalleryItem
);
router.delete('/:id', protectAdmin, deleteGalleryItem);

export default router;
