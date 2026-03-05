import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EnquiryPopup from '../components/EnquiryPopup';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { slideUp } from '../utils/motion';

const PublicLayout = ({ children }) => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    let timer = null;

    const scheduleAutoPopup = (remainingMs = 10000) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsEnquiryOpen(true);
      }, Math.max(0, remainingMs));
    };

    const preloaderDoneAt = window.__finiquePreloaderCompleteAt;
    if (typeof preloaderDoneAt === 'number') {
      const elapsedMs = Date.now() - preloaderDoneAt;
      scheduleAutoPopup(10000 - elapsedMs);
    } else {
      const handlePreloaderComplete = () => scheduleAutoPopup(10000);
      window.addEventListener('finique:preloader-complete', handlePreloaderComplete, { once: true });
      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener('finique:preloader-complete', handlePreloaderComplete);
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
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
