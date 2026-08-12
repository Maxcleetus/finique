import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Review from '../models/Review.js';

dotenv.config();

const main = async () => {
  const host = await connectDB();
  console.log(`Connected to MongoDB: ${host}`);

  const reviews = await Review.find();
  console.log(`Found ${reviews.length} reviews. Migrating...`);

  for (const review of reviews) {
    let updated = false;

    if (review.name?.toLowerCase().includes('manoj')) {
      review.designation = 'Home Owner';
      review.location = 'Thrissur';
      updated = true;
    } else if (review.name?.toLowerCase().includes('benny')) {
      review.designation = 'Project Manager';
      review.location = 'Design Craft Builders';
      updated = true;
    } else if (review.name?.toLowerCase().includes('design factory')) {
      review.designation = 'Architects';
      review.location = '';
      updated = true;
    } else if (review.name?.toLowerCase().includes('asif')) {
      review.designation = 'Home Owners';
      review.location = 'Thrissur';
      updated = true;
    } else {
      // Fallback: if there is a comma, split it. Otherwise, set designation to location, and clear location
      if (review.location) {
        if (review.location.includes(',')) {
          const parts = review.location.split(',');
          review.designation = parts[0].trim();
          review.location = parts.slice(1).join(',').trim();
        } else {
          review.designation = review.location;
          review.location = '';
        }
        updated = true;
      }
    }

    if (updated) {
      await review.save();
      console.log(`Updated review for ${review.name}: designation="${review.designation}", location="${review.location}"`);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
