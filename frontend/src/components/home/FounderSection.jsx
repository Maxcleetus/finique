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
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-navy mb-6 bg-slate-100 px-5 py-2 rounded-full border border-slate-200 shadow-sm">
            The Founder's Perspective
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gilroy font-extrabold text-brand-navy leading-tight sm:leading-[1.15] tracking-tight mb-8">
            Beyond Specifications. <br className="hidden sm:block lg:hidden xl:block" /> It's How It Feels.
          </h2>
          
          <div className="space-y-6 mb-10 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl text-left">
            <p className="text-center lg:text-left">
              Growing up inside a family business, our founder saw how building a home is one of life's most emotional investments. That journey inspired our simple philosophy:
            </p>
            
            <blockquote className="border-l-4 border-brand-navy pl-6 py-4 my-8 bg-slate-50/80 rounded-r-2xl pr-6 shadow-sm flex flex-col justify-center">
              <p className="italic font-medium text-lg sm:text-xl text-brand-navy leading-relaxed">
                "People may forget the specifications of a window, but they never forget how a space made them feel. Finique was born to solve the 'Heavy Home' problem."
              </p>
            </blockquote>

            <p className="text-center lg:text-left">
              This human-centered approach influences everything we do—from design guidance to installation. We collaborate with architects and homeowners to ensure every window engineers quieter mornings and stronger protection for years to come.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-4">
            <Link to="/about" className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-navy px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-black shadow-lg hover:-translate-y-0.5">
              Our Story
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-sm sm:text-base font-bold text-brand-navy transition-all duration-300 hover:border-brand-navy hover:bg-slate-50">
              Explore Range
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FounderSection;