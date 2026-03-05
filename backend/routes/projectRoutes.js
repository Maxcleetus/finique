import express from 'express';
import {
  createProject,
  deleteProject,
  deleteProjectMedia,
  getProjects,
  updateProject
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', protectAdmin, upload.array('media', 15), createProject);
router.put('/:id', protectAdmin, upload.array('media', 15), updateProject);
router.delete('/:id', protectAdmin, deleteProject);
router.delete('/:id/media', protectAdmin, deleteProjectMedia);

export default router;
