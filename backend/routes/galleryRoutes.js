import express from 'express';
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', protectAdmin, upload.single('image'), createGalleryItem);
router.delete('/:id', protectAdmin, deleteGalleryItem);

export default router;
