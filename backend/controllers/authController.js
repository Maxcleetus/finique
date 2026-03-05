import Admin from '../models/Admin.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

export const loginAdmin = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

export const seedDefaultAdmin = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const seedKey = req.headers['x-seed-key'];
    if (!seedKey || seedKey !== process.env.ADMIN_SEED_KEY) {
      res.status(403);
      throw new Error('Forbidden');
    }
  }

  const existingAdmin = await Admin.findOne({ role: 'admin' });
  if (existingAdmin) {
    return res.status(200).json({ message: 'Admin already exists' });
  }

  const name = process.env.DEFAULT_ADMIN_NAME || 'FINIQUE Admin';
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!email || !password) {
    res.status(400);
    throw new Error('Set DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD in .env');
  }

  await Admin.create({ name, email, password, role: 'admin' });

  res.status(201).json({ message: 'Default admin created successfully' });
});
