import mongoose from 'mongoose';

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  return conn.connection.host;
};
