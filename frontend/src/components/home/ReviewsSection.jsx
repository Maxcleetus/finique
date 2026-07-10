import { motion } from 'framer-motion';
import AppLoader from '../AppLoader';
import { slideUp, viewport } from '../../utils/motion';

const ReviewsSection = ({ reviews, loading }) => {
  // Ensure we have at least 6 reviews for a smooth scroll effect
  const reviewsCount = reviews?.length || 0;
  const minReviewsNeeded = 6;
  const multiplier = reviewsCount > 0 ? Math.max(1, Math.ceil(minReviewsNeeded / reviewsCount)) : 1;
  const baseReviews = reviewsCount > 0 ? Array(multiplier).fill(reviews).flat() : [];
  const doubledReviews = [...baseReviews, ...baseReviews];
  
  // Calculate speed: 8 seconds per review item (e.g. 6 items = 48s, 12 items = 96s)
  const duration = baseReviews.length * 8;

  return (
    <section className="bg-white pt-20 lg:pt-24 pb-12 overflow-hidden relative">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reviews-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll var(--marquee-duration, 40s) linear infinite;
        }
        .reviews-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

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
      ) : reviewsCount === 0 ? (
        <p className="text-center text-slate-500 relative z-10">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="relative w-full overflow-hidden">
          {/* Fade gradients for smooth visual transitions */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee Container */}
          <div 
            className="reviews-marquee-track py-10"
            style={{ '--marquee-duration': `${duration}s` }}
          >
            {doubledReviews.map((review, idx) => {
              const hasImage = Boolean(review.imageUrl);

              return (
                <div key={`${review._id}-${idx}`} className="px-4 shrink-0">
                  <div
                    className={`relative group transition-all duration-300 rounded-2xl border border-slate-100 bg-white shadow-panel overflow-hidden ${
                      hasImage
                        ? 'w-[300px] sm:w-[580px] min-h-[360px] sm:min-h-[280px]'
                        : 'w-[280px] sm:w-[400px] min-h-[280px]'
                    }`}
                  >
                    {/* Decorative quote icon */}
                    <div className="absolute top-6 right-6 text-slate-100 pointer-events-none transition-colors duration-300 group-hover:text-slate-200/70">
                      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <div className={`grid h-full ${hasImage ? 'grid-cols-1 sm:grid-cols-[1.35fr,0.65fr]' : 'grid-cols-1'}`}>
                      <div className="flex flex-col justify-between p-6 sm:p-8 relative z-10">
                        <div>
                          {/* Rating Stars */}
                          <div className="flex gap-1 mb-5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-current'
                                    : 'text-slate-200 fill-current'
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>

                          {/* Review Text */}
                          <p className="text-sm sm:text-base leading-relaxed text-slate-600 italic font-medium line-clamp-6">
                            "{review.text}"
                          </p>
                        </div>

                        {/* Author Profile */}
                        <div className="mt-8 flex items-center gap-3">
                          {!hasImage && (
                            <div className="w-10 h-10 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold text-sm shrink-0 border border-brand-navy/10">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-gilroy font-extrabold text-brand-navy text-sm sm:text-base tracking-wide">
                              {review.name}
                            </p>
                            {review.location && (
                              <p className="text-[10px] uppercase tracking-widest mt-1 font-bold text-slate-400">
                                {review.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {hasImage && (
                        <div className="relative min-h-[160px] sm:min-h-full overflow-hidden bg-slate-100">
                          <img
                            src={review.imageUrl}
                            alt={review.name}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
