import Review from '../models/Review.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
};

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  res.set('Cache-Control', 'public, max-age=300');
  res.json(reviews);
});

export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res) => {
  const { name, location = '', rating, text, isPublished } = req.body;

  if (!name || !text || rating === undefined) {
    res.status(400);
    throw new Error('Name, rating and review text are required');
  }

  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  const review = await Review.create({
    name,
    location,
    rating: numericRating,
    text,
    isPublished: isPublished === undefined ? true : parseBoolean(isPublished)
  });

  res.status(201).json(review);
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  const { name, location, rating, text, isPublished } = req.body;

  if (name !== undefined) review.name = name;
  if (location !== undefined) review.location = location;
  if (text !== undefined) review.text = text;
  if (isPublished !== undefined) review.isPublished = parseBoolean(isPublished);
  if (rating !== undefined) {
    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      res.status(400);
      throw new Error('Rating must be between 1 and 5');
    }
    review.rating = numericRating;
  }

  const updated = await review.save();
  res.json(updated);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted successfully' });
});
