import mongoose from 'mongoose';
import Event from '../models/Event.js';
import { buildEventFilter } from '../utils/eventQuery.js';

const normalizeEventBody = (body) => ({
  title: body.title,
  description: body.description,
  category: body.category,
  location: body.location,
  startsAt: body.startsAt,
  capacity: Number(body.capacity),
  imageUrl: body.imageUrl || ''
});

const canManageEvent = (user) => user.role === 'admin';

export const getEvents = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 50);
    const skip = (page - 1) * limit;
    const filter = buildEventFilter(req.query);

    const [events, total] = await Promise.all([
      Event.find(filter)
        .populate('organizer', 'name email')
        .sort({ startsAt: 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments(filter)
    ]);

    res.json({
      data: events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid event id' });
    }

    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees.user', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees.user', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      eventId: event._id,
      title: event.title,
      attendeeCount: event.attendees.length,
      capacity: event.capacity,
      attendees: event.attendees
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...normalizeEventBody(req.body),
      organizer: req.user._id
    });

    const populatedEvent = await event.populate('organizer', 'name email');
    res.status(201).json(populatedEvent);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!canManageEvent(req.user)) {
      return res.status(403).json({ message: 'Only an admin can update this event' });
    }

    const nextCapacity = Number(req.body.capacity);
    if (nextCapacity < event.attendees.length) {
      return res.status(400).json({
        message: 'Capacity cannot be lower than the current attendee count'
      });
    }

    Object.assign(event, normalizeEventBody(req.body));
    await event.save();
    await event.populate('organizer', 'name email');

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!canManageEvent(req.user)) {
      return res.status(403).json({ message: 'Only an admin can delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.attendees.some((attendee) => attendee.user.toString() === req.user._id.toString())) {
      return res.status(409).json({ message: 'You are already registered for this event' });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'This event is already full' });
    }

    event.attendees.push({ user: req.user._id });
    await event.save();
    await event.populate('attendees.user', 'name email');

    res.status(201).json({
      message: 'Registered successfully',
      attendeeCount: event.attendees.length,
      attendees: event.attendees
    });
  } catch (error) {
    next(error);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const beforeCount = event.attendees.length;
    event.attendees = event.attendees.filter(
      (attendee) => attendee.user.toString() !== req.user._id.toString()
    );

    if (beforeCount === event.attendees.length) {
      return res.status(404).json({ message: 'Registration not found for this user' });
    }

    await event.save();
    res.json({ message: 'Registration cancelled', attendeeCount: event.attendees.length });
  } catch (error) {
    next(error);
  }
};

export const getMyRegisteredEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ 'attendees.user': req.user._id })
      .populate('organizer', 'name email')
      .sort({ startsAt: 1 });

    const data = events.map((event) => {
      const registration = event.attendees.find(
        (attendee) => attendee.user.toString() === req.user._id.toString()
      );

      return {
        ...event.toObject(),
        myRegistration: {
          registeredAt: registration?.registeredAt
        }
      };
    });

    res.json({ data, total: data.length });
  } catch (error) {
    next(error);
  }
};
