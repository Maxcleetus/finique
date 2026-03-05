import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EnquiryPopup from '../components/EnquiryPopup';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { slideUp } from '../utils/motion';

const PublicLayout = ({ children }) => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnquiryOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <motion.main initial="hidden" animate="show" variants={slideUp}>
        {children}
      </motion.main>
      <Footer />
      <EnquiryPopup open={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default PublicLayout;
