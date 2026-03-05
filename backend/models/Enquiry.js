import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
