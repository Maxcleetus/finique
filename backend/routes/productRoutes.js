import express from 'express';
import {
  createProduct,
  deleteProduct,
  deleteProductMedia,
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
  updateProduct
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

router.post(
  '/',
  protectAdmin,
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 }
  ]),
  createProduct
);

router.put(
  '/:id',
  protectAdmin,
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 }
  ]),
  updateProduct
);

router.delete('/:id', protectAdmin, deleteProduct);
router.delete('/:id/media', protectAdmin, deleteProductMedia);

export default router;
