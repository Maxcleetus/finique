import Enquiry from '../models/Enquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, message, productId } = req.body;

  if (!name || !phone || !email || !message) {
    res.status(400);
    throw new Error('Name, phone, email and message are required');
  }

  const enquiry = await Enquiry.create({
    name,
    phone,
    email,
    message,
    productId: productId || null
  });

  res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
});

export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().populate('productId', 'title slug').sort({ createdAt: -1 });
  res.json(enquiries);
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['new', 'contacted', 'closed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  res.json(enquiry);
});
