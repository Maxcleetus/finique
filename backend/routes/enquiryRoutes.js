import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', protectAdmin, getEnquiries);
router.patch('/:id/status', protectAdmin, updateEnquiryStatus);

export default router;
