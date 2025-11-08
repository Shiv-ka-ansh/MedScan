import express from 'express';
import { chat } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', chat);

export default router;


