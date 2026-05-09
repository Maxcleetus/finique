import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import ProductCard from '../ProductCard';
import AppLoader from '../AppLoader';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';

const FeaturedProducts = ({ featured, loading }) => {
  const featuredSliderRef = useRef(null);

  const scrollFeatured = (direction = 'right') => {
    const slider = featuredSliderRef.current;
    if (!slider) return;

    const step = Math.max(320, Math.floor(slider.clientWidth * 0.8));
    const delta = direction === 'right' ? step : -step;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (direction === 'right' && slider.scrollLeft >= maxScrollLeft - 4) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction === 'left' && slider.scrollLeft <= 4) {
      slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    slider.scrollBy({ left: delta, behavior: 'smooth' });
  };

  useEffect(() => {
    if (loading || featured.length <= 1) return undefined;
    const interval = setInterval(() => {
      scrollFeatured('right');
    }, 6000);
    return () => clearInterval(interval);
  }, [loading, featured.length]);

  return (
    <motion.section
      className="container-shell pb-16 lg:pb-32"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6" variants={slideUp}>
        <div className="max-w-2xl">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-5">
            Explore Collection
          </span>
          <motion.h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-brand-navy leading-tight" variants={slideUp}>
            Our Product Range
          </motion.h2>
          <motion.p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600" variants={slideUp}>
            Discover our premium VEKA uPVC window and door systems — heat-resistant, soundproof, and zero-maintenance. Built for Kerala.
          </motion.p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollFeatured('left')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand-navy hover:bg-brand-navy hover:text-white"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollFeatured('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-navy bg-brand-navy text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-violet-950"
            aria-label="Next"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      <motion.div className="mt-12 relative" variants={staggerContainer}>
        {loading && <AppLoader label="Loading product range..." className="md:col-span-2 lg:col-span-3" />}
        {!loading && (
          <div className="relative">
            {/* Fade gradient for smooth scroll cutoff on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div
              ref={featuredSliderRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {featured.map((product) => (
                <div key={product._id} className="w-[85vw] max-w-[300px] sm:max-w-none sm:w-[350px] shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProducts;
