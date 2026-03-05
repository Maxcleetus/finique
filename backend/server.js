import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import Admin from './models/Admin.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
if (fs.existsSync('.env.example')) {
  dotenv.config({ path: '.env.example', override: false });
}

const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

const app = express();

app.use(helmet());
app.use(compression());
const corsOptions = {
  origin: (_origin, callback) => callback(null, true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const ensureDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  const name = process.env.DEFAULT_ADMIN_NAME || 'FINIQUE Admin';

  if (!email || !password) return;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    if (process.env.NODE_ENV !== 'production') {
      existingAdmin.name = name;
      existingAdmin.password = password;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
    }
    return;
  }

  await Admin.create({
    name,
    email,
    password,
    role: 'admin'
  });
};

const startServer = async () => {
  try {
    const host = await connectDB();
    await ensureDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} | MongoDB: ${host}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
