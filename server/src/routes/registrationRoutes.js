import express from 'express';
import { getMyRegisteredEvents } from '../controllers/eventController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/my-events', protect, getMyRegisteredEvents);

export default router;
