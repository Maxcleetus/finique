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
          className="relative hidden md:block w-11/12 lg:w-4/5 mx-auto overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl order-2 lg:order-1"
        >
          <img 
            src="/img.png" 
            alt="Kerala home with premium uPVC windows" 
            className="w-full h-auto transition-transform duration-700 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 border border-white/20 rounded-2xl lg:rounded-3xl pointer-events-none"></div>
        </motion.div>

        {/* Content Column */}
        <motion.div variants={slideLeft} className="text-center lg:text-left order-1 lg:order-2 flex flex-col items-center lg:items-start">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-navy mb-6 border border-slate-300 px-4 py-1.5 rounded-full">
            The Founder's Perspective
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gilroy font-extrabold text-brand-navy leading-tight sm:leading-[1.15] tracking-tight mb-8">
            Built for Kerala's Climate. <br className="hidden sm:block lg:hidden xl:block" /> Made for Your Home.
          </h2>
          
          <div className="space-y-6 mb-10 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl text-left">
            <p className="text-center lg:text-left">
              At Finique Windows, we started with a simple mission — to solve the everyday window problems faced by South Indian homes.
            </p>

            <p className="text-center lg:text-left">
              Heavy monsoons, termites, humidity, safety concerns, and high maintenance are challenges we have seen closely for years. That is why we are passionate about building durable, secure, and weather-resistant window systems designed for our climate and lifestyle.
            </p>
            
            <blockquote className="border-l-4 border-brand-navy pl-6 py-4 my-8 bg-slate-50/80 rounded-r-2xl pr-6 shadow-sm flex flex-col justify-center">
              <p className="italic font-medium text-lg sm:text-xl text-brand-navy leading-relaxed">
                "For us, windows are not just products. They are a long-term part of how families experience comfort, safety, and peace at home."
              </p>
            </blockquote>
          </div>

          {/* Mobile-only image — sits between text and buttons */}
          <div className="md:hidden w-full mb-8 relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/img.png"
              alt="Kerala home with premium uPVC windows"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none" />
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