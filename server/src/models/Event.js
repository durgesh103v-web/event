import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160
    },
    startsAt: {
      type: Date,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 100000
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ''
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attendees: [attendeeSchema]
  },
  { timestamps: true }
);

eventSchema.index({ title: 'text', description: 'text', category: 'text', location: 'text' });
eventSchema.index({ startsAt: 1 });

eventSchema.virtual('attendeeCount').get(function attendeeCount() {
  return this.attendees.length;
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

export default mongoose.model('Event', eventSchema);
