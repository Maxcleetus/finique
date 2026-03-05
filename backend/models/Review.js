import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
