import express from 'express';
import {
  createReview,
  deleteReview,
  getAdminReviews,
  getReviews,
  updateReview
} from '../controllers/reviewController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/admin', protectAdmin, getAdminReviews);
router.post('/', protectAdmin, createReview);
router.put('/:id', protectAdmin, updateReview);
router.delete('/:id', protectAdmin, deleteReview);

export default router;
