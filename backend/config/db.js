import mongoose from 'mongoose';
import dns from 'dns';

// Force DNS resolution to prefer IPv4 to avoid secureConnect timeouts with MongoDB Atlas on IPv6-incompatible networks
dns.setDefaultResultOrder('ipv4first');

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  return conn.connection.host;
};
