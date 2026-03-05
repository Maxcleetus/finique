import express from 'express';
import { loginAdmin, seedDefaultAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/seed', seedDefaultAdmin);

export default router;
