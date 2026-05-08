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
    <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden relative border-y border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(237,233,254,0.6)_0%,transparent_80%)] pointer-events-none" />

      <div className="container-shell relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16" 
          initial="hidden" whileInView="show" viewport={viewport} variants={slideUp}
        >
          <span className="inline-block rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 mb-6 border border-violet-200 shadow-sm">
            Client Testimonials
          </span>
          <h3 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight">What Our Customers Say</h3>
        </motion.div>
      </div>

      {loading ? (
        <AppLoader label="Loading reviews..." />
      ) : reviews.length === 0 ? (
        <p className="text-center text-slate-500 relative z-10">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="relative w-full overflow-hidden">
           {/* Fade gradients for smooth visual transitions */}
           <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent z-20 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-slate-50 via-slate-50/50 to-transparent z-20 pointer-events-none" />

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
                 className="w-[300px] sm:w-[450px] shrink-0 relative rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-[0_10px_40px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_25px_60px_rgb(0,0,0,0.1)] hover:-translate-y-2"
               >
                 <div className="absolute top-6 right-10 text-9xl font-serif text-slate-100/50 leading-none pointer-events-none">"</div>
                 
                 <div className="flex text-yellow-500 mb-8 font-bold">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className={`w-6 h-6 ${i < review.rating ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                 </div>
                 
                 <p className="text-slate-700 text-base sm:text-lg leading-relaxed min-h-[100px] italic font-medium relative z-10">"{review.text}"</p>
                 
                 <div className="mt-10 flex items-center gap-5 relative z-10">
                   <div className="h-12 w-12 shrink-0 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-inner ring-4 ring-violet-50">
                     {review.name.charAt(0).toUpperCase()}
                   </div>
                   <div>
                     <p className="font-extrabold text-brand-navy text-base">{review.name}</p>
                     {review.location && <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-black">{review.location}</p>}
                   </div>
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
