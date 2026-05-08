import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideRight, slideLeft, staggerContainer, viewport } from '../../utils/motion';

const FounderSection = () => {
  return (
    <motion.section
      className="container-shell py-10 lg:py-24 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image Column */}
        <motion.div 
          variants={slideRight} 
          className="relative max-md:hidden aspect-[4/3] lg:aspect-square xl:aspect-[4/3] w-full overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl order-2 lg:order-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200" 
            alt="Kerala home with premium uPVC windows" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 border border-white/20 rounded-2xl lg:rounded-3xl pointer-events-none"></div>
        </motion.div>

        {/* Content Column */}
        <motion.div variants={slideLeft} className="text-center lg:text-left order-1 lg:order-2 flex flex-col items-center lg:items-start">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-violet-700 mb-4 bg-violet-100/80 px-4 py-1.5 rounded-full">
            The Founder's Perspective
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight sm:leading-[1.15] tracking-tight mb-5">
            The Problem with the <br className="hidden sm:block lg:hidden xl:block" /> Standard Window.
          </h2>
          
          <div className="space-y-4 mb-8 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            <p>
              In Kerala, we don't just have weather — we have intensity. Heavy monsoons, salt air, and rising heat. Most windows are built for a showroom display, not for our climate's relentless reality.
            </p>
            <p>
              Over the years, I saw how poor window choices led to water leakage, unbearable heat buildup, noise, and constant maintenance.
            </p>
          </div>

          {/* Mission Statement - Fixed truncation and optimized scaling */}
          <div className="w-full max-w-2xl mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-500"></div>
            <div className="relative bg-white border border-violet-100 rounded-2xl p-1 shadow-sm">
                <p className="w-full text-center py-4 px-4 sm:px-6 bg-violet-50/50 rounded-xl text-brand-navy font-bold leading-snug tracking-tight text-lg sm:text-xl lg:text-2xl">
                  Finique was born to solve the "Heavy Home" problem.
                </p>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            We replace the weight of maintenance, the noise of the street, and the heat of the sun — with precision-engineered VEKA uPVC systems. Not to sell windows. But to help you understand what a good window should actually do.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-4">
            <Link to="/about" className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-violet-950 hover:shadow-lg hover:-translate-y-0.5">
              Our Story
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-brand-navy transition-all duration-300 hover:border-brand-navy hover:bg-slate-50">
              Explore Range
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FounderSection;