import express from 'express';
import {
  createReview,
  deleteReviewImage,
  deleteReview,
  getAdminReviews,
  getReviews,
  updateReview,
  reorderReviews
} from '../controllers/reviewController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/admin', protectAdmin, getAdminReviews);
router.post('/', protectAdmin, upload.single('image'), createReview);
router.put('/reorder', protectAdmin, reorderReviews);
router.put('/:id', protectAdmin, upload.single('image'), updateReview);
router.delete('/:id/image', protectAdmin, deleteReviewImage);
router.delete('/:id', protectAdmin, deleteReview);

export default router;
