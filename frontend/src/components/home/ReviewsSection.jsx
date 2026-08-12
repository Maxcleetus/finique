import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import AppLoader from '../AppLoader';
import { slideUp, viewport } from '../../utils/motion';

const ReviewsSection = ({ reviews, loading }) => {
  const reviewsCount = reviews?.length || 0;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef(null);

  // Auto-play loop that pauses when the user hovers over the testimonials
  useEffect(() => {
    if (loading || reviewsCount === 0 || isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % reviewsCount);
    }, 6000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [loading, reviewsCount, isHovered]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviewsCount);
  };

  const handleDotClick = (idx, e) => {
    e.stopPropagation(); // Prevent card trigger from firing
    setActiveIdx(idx);
  };

  // Fade In / Fade Out Transition Variants
  const cardVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="bg-slate-50/50 border-y border-slate-100 py-20 lg:py-24 overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-navy/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-shell relative z-10 flex flex-col items-center">
        {loading ? (
          <AppLoader label="Loading reviews..." />
        ) : reviewsCount === 0 ? (
          <div className="text-center max-w-3xl mx-auto py-10">
            <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-6">
              Client Testimonials
            </span>
            <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            {/* Centered Heading */}
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-16"
              initial="hidden" 
              whileInView="show" 
              viewport={viewport} 
              variants={slideUp}
            >
              <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-6">
                Client Testimonials
              </span>
              <h3 className="text-3xl sm:text-4xl font-gilroy font-extrabold text-brand-navy tracking-tight leading-tight">
                What Our Customers Say
              </h3>
            </motion.div>

            {/* DESKTOP VIEW: Split layout side-by-side */}
            <div className="hidden lg:flex flex-row items-stretch justify-center gap-12 lg:gap-16 w-full max-w-5xl">
              {/* Left Side: Dynamic Client Photo Card */}
              <motion.div
                className="relative w-[360px] h-[420px] rounded-[24px] overflow-hidden bg-white shadow-panel border border-slate-100/50 shrink-0"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={slideUp}
              >
                <AnimatePresence mode="wait">
                  {reviews[activeIdx]?.imageUrl ? (
                    <motion.img
                      key={activeIdx}
                      src={reviews[activeIdx].imageUrl}
                      alt={reviews[activeIdx].name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: reviews[activeIdx]?.name?.toLowerCase().includes('benny') ? 'center 30%' : 'center'
                      }}
                    />
                  ) : (
                    <motion.div
                      key="fallback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full bg-brand-navy/5 flex items-center justify-center text-brand-navy font-bold text-4xl"
                    >
                      {reviews[activeIdx]?.name?.charAt(0).toUpperCase()}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Subtle dark gradient overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                
                {/* Clean, minimalist text overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                  {/* 1st option: Name */}
                  <p className="font-gilroy font-bold text-white text-xs sm:text-sm tracking-wide drop-shadow-sm">
                    {reviews[activeIdx]?.name}
                  </p>
                  {/* 2nd option: Designation */}
                  {reviews[activeIdx]?.designation && (
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-bold text-white drop-shadow-sm">
                      {reviews[activeIdx]?.designation}
                    </p>
                  )}
                  {/* 3rd option: Location */}
                  {reviews[activeIdx]?.location && (
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5 font-bold text-white/80 drop-shadow-sm">
                      {reviews[activeIdx]?.location}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Right Side: 3D Flip Testimonial Card */}
              <div 
                className="w-full max-w-[500px] flex flex-col justify-between items-center relative min-h-[340px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="w-full relative flex-1 flex items-center justify-center" style={{ perspective: 1200 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onClick={handleNext}
                      className="w-full bg-white rounded-3xl border border-slate-100 shadow-panel p-6 sm:p-10 flex flex-col justify-between min-h-[260px] select-none cursor-pointer hover:border-slate-200 transition-colors duration-300 text-left"
                      whileHover={{ y: -4, scale: 1.01 }}
                    >
                      <div className="flex flex-col flex-1">
                        {/* Quote decoration */}
                        <div className="flex justify-end items-start mb-4">
                          <svg className="w-8 h-8 text-slate-100 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* Testimonial Quote */}
                        <p className="text-[14px] sm:text-[16px] leading-relaxed text-slate-600 italic font-medium mb-4 flex-1">
                          "{reviews[activeIdx].text}"
                        </p>

                        {/* Rating stars */}
                        <div className="flex gap-1 text-amber-400 mt-auto mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < reviews[activeIdx].rating
                                  ? 'fill-current'
                                  : 'text-slate-200 fill-current'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      {/* Interactive Hint */}
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-6 border-t border-slate-100/50 mt-6">
                        Click card to view next testimonial
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination Indicators */}
                <div className="flex items-center gap-6 mt-8">
                  <span className="text-xs font-bold font-gilroy text-slate-400">
                    {String(activeIdx + 1).padStart(2, '0')} / {String(reviewsCount).padStart(2, '0')}
                  </span>
                  <div className="flex gap-2">
                    {reviews.slice(0, 5).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => handleDotClick(idx, e)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIdx === idx 
                            ? 'w-6 bg-brand-navy' 
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE & TABLET VIEW: Unified single card UI containing photo and text */}
            <div 
              className="flex lg:hidden flex-col items-center w-full max-w-[420px] mx-auto px-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="w-full relative flex-1 flex items-center justify-center" style={{ perspective: 1200 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onClick={handleNext}
                    className="w-full bg-white rounded-3xl border border-slate-100 shadow-panel overflow-hidden flex flex-col min-h-[460px] select-none cursor-pointer hover:border-slate-200 transition-colors duration-300 text-left"
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    {/* Top: Client Photo */}
                    <div className="relative w-full h-[220px] bg-slate-100 overflow-hidden shrink-0">
                      {reviews[activeIdx]?.imageUrl ? (
                        <img
                          src={reviews[activeIdx].imageUrl}
                          alt={reviews[activeIdx].name}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            objectPosition: reviews[activeIdx]?.name?.toLowerCase().includes('benny') ? 'center 30%' : 'center'
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-brand-navy/5 flex items-center justify-center text-brand-navy font-bold text-3xl">
                          {reviews[activeIdx]?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {/* Subtle dark gradient overlay at the bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      
                      {/* Clean, minimalist text overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                        {/* 1st option: Name */}
                        <p className="font-gilroy font-bold text-white text-xs sm:text-sm tracking-wide drop-shadow-sm">
                          {reviews[activeIdx]?.name}
                        </p>
                        {/* 2nd option: Designation */}
                        {reviews[activeIdx]?.designation && (
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-bold text-white drop-shadow-sm">
                            {reviews[activeIdx]?.designation}
                          </p>
                        )}
                        {/* 3rd option: Location */}
                        {reviews[activeIdx]?.location && (
                          <p className="text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5 font-bold text-white/80 drop-shadow-sm">
                            {reviews[activeIdx]?.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Testimonial Content */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        {/* Rating and Quote Decoration */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < reviews[activeIdx].rating ? 'fill-current' : 'text-slate-200 fill-current'
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <svg className="w-7 h-7 text-slate-100 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* Testimonial Quote */}
                        <p className="text-[13.5px] leading-relaxed text-slate-600 italic font-medium">
                          "{reviews[activeIdx].text}"
                        </p>
                      </div>

                      {/* Interactive Hint */}
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 pt-4 border-t border-slate-100/50 mt-4">
                        Click card to view next testimonial
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <span className="text-xs font-bold font-gilroy text-slate-400">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(reviewsCount).padStart(2, '0')}
                </span>
                <div className="flex gap-2">
                  {reviews.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => handleDotClick(idx, e)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIdx === idx 
                          ? 'w-6 bg-brand-navy' 
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
