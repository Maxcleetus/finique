import { motion, useAnimationControls } from 'framer-motion';
import { useRef, useEffect } from 'react';
import AppLoader from '../AppLoader';
import { slideUp, viewport } from '../../utils/motion';

const ReviewsSection = ({ reviews, loading }) => {
  const containerRef = useRef(null);
  const controls = useAnimationControls();

  // Doubling the reviews for the infinite effect
  const doubledReviews = [...reviews, ...reviews];
  
  // Dynamic duration based on number of reviews to keep speed consistent
  const duration = reviews.length * 10; 

  const startAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (!loading && reviews.length > 0) {
      startAnimation();
    }
  }, [loading, reviews.length]);

  return (
    <section className="bg-white pt-20 lg:pt-24 pb-12 overflow-hidden relative">
      

      <div className="container-shell relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20" 
          initial="hidden" whileInView="show" viewport={viewport} variants={slideUp}
        >
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-6">
            Client Testimonials
          </span>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-gilroy font-extrabold text-brand-navy tracking-tight">What Our Customers Say</h3>
        </motion.div>
      </div>

      {loading ? (
        <AppLoader label="Loading reviews..." />
      ) : reviews.length === 0 ? (
        <p className="text-center text-slate-500 relative z-10">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="relative w-full overflow-hidden">
           {/* Fade gradients for smooth visual transitions */}
           <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none" />

           {/* Infinite Marquee Container */}
           <motion.div 
             className="flex gap-8 py-10 w-max cursor-grab active:cursor-grabbing"
             animate={controls}
             onMouseEnter={() => controls.stop()}
             onMouseLeave={() => startAnimation()}
             style={{ x: 0 }}
           >
             {doubledReviews.map((review, idx) => (
               <div 
                 key={`${review._id}-${idx}`} 
                 className="w-[300px] sm:w-[450px] shrink-0 relative border-l border-slate-200 pl-8 pr-12 py-2 group hover:border-brand-navy transition-colors duration-500"
               >
                 <div className="flex text-brand-navy mb-6">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                 </div>
                 
                 <p className="text-slate-700 text-lg leading-relaxed min-h-[120px] font-light relative z-10">"{review.text}"</p>
                 
                 <div className="mt-8 relative z-10">
                   <p className="font-gilroy font-extrabold text-brand-navy text-base tracking-wide">{review.name}</p>
                   {review.location && <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">{review.location}</p>}
                 </div>
               </div>
             ))}
           </motion.div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
