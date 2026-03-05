import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    images: [{ type: String }],
    videoUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
