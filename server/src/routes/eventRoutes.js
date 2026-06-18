import express from 'express';
import { body, param } from 'express-validator';
import {
  cancelRegistration,
  createEvent,
  deleteEvent,
  getEventAttendees,
  getEventById,
  getEvents,
  registerForEvent,
  updateEvent
} from '../controllers/eventController.js';
import { authorize, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const eventValidation = [
  body('title').trim().isLength({ min: 3, max: 140 }).withMessage('Title must be 3-140 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Description must be 10-3000 characters'),
  body('category').trim().isLength({ min: 2, max: 60 }).withMessage('Category must be 2-60 characters'),
  body('location').trim().isLength({ min: 2, max: 160 }).withMessage('Location must be 2-160 characters'),
  body('startsAt').isISO8601().toDate().withMessage('Start date must be a valid date'),
  body('capacity').isInt({ min: 1, max: 100000 }).withMessage('Capacity must be between 1 and 100000'),
  body('imageUrl').optional({ checkFalsy: true }).isURL().withMessage('Image URL must be valid')
];

const idValidation = [param('id').isMongoId().withMessage('Valid event id is required')];

router.get('/', getEvents);
router.get('/:id', idValidation, validate, getEventById);
router.get('/:id/attendees', idValidation, validate, getEventAttendees);
router.post('/', protect, authorize('admin'), eventValidation, validate, createEvent);
router.put('/:id', protect, authorize('admin'), idValidation, eventValidation, validate, updateEvent);
router.delete('/:id', protect, authorize('admin'), idValidation, validate, deleteEvent);
router.post('/:id/register', protect, idValidation, validate, registerForEvent);
router.delete('/:id/register', protect, idValidation, validate, cancelRegistration);

export default router;
