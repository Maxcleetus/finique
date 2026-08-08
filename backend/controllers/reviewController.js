import Review from '../models/Review.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { destroyCloudinaryAsset, uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
};

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
  res.set('Cache-Control', 'public, max-age=300');
  res.json(reviews);
});

export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ sortOrder: 1, createdAt: -1 });
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

  let imageUrl = '';
  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file.buffer, 'finique/reviews', 'image');
    imageUrl = uploaded.secure_url;
  }

  const review = await Review.create({
    name,
    location,
    rating: numericRating,
    text,
    imageUrl,
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
  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file.buffer, 'finique/reviews', 'image');
    if (review.imageUrl) {
      await destroyCloudinaryAsset(review.imageUrl, 'image');
    }
    review.imageUrl = uploaded.secure_url;
  }
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

  if (review.imageUrl) {
    await destroyCloudinaryAsset(review.imageUrl, 'image');
  }

  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted successfully' });
});

export const deleteReviewImage = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.imageUrl) {
    await destroyCloudinaryAsset(review.imageUrl, 'image');
    review.imageUrl = '';
    await review.save();
  }

  res.json({ message: 'Review image removed successfully', review });
});

export const reorderReviews = asyncHandler(async (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) {
    res.status(400);
    throw new Error('Order array of IDs is required');
  }

  const bulkOps = order.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { sortOrder: index } }
    }
  }));

  await Review.bulkWrite(bulkOps);
  res.json({ message: 'Reviews reordered successfully' });
});
