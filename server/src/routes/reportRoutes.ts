import express from 'express';
import {
  uploadReport,
  getUserReports,
  getReport,
  getPendingReports,
  reviewReport,
  deleteReport,
} from '../controllers/reportController';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Patient routes
router.post('/upload', upload.single('file'), uploadReport);
router.get('/', getUserReports);
router.get('/:id', getReport);
router.delete('/:id', deleteReport);

// Doctor routes
router.get('/pending/all', authorize('doctor', 'admin'), getPendingReports);
router.put('/:id/review', authorize('doctor', 'admin'), reviewReport);

export default router;


