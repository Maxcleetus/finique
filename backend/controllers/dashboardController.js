import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalProducts, totalProjects, totalEnquiries, newEnquiries] = await Promise.all([
    Product.countDocuments(),
    Project.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'new' })
  ]);

  res.json({
    totalProducts,
    totalProjects,
    totalEnquiries,
    newEnquiries
  });
});
