import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideUp, slideLeft, staggerContainer } from '../../utils/motion';

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-brand-navy">
      {/* Background Image with Slow Zoom */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center sm:object-right"
        />
      </motion.div>
      
      {/* Architectural Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.25] mix-blend-overlay" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }} 
      />
      
      {/* Cinematic Vignette & Gradients (Deep Shade) */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b sm:bg-gradient-to-r from-brand-navy/90 via-brand-navy/80 to-brand-navy/50 sm:to-black/20" />
      
      {/* Foreground Content */}
      <div className="absolute inset-0 z-40 flex items-center justify-center lg:justify-start">
        <div className="container-shell w-full relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 px-6 sm:px-8 py-10 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <motion.div variants={slideUp} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-100 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                VEKA Certified · German Engineering · Kerala
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 variants={slideUp} className="mt-5 text-4xl sm:text-5xl font-extrabold leading-[1.08] text-white drop-shadow-2xl lg:text-7xl">
              Windows That
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-100 to-white">
                Defy the Elements.
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p variants={slideUp} className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300">
              Experience a home that feels lighter, quieter, and cooler. Finique brings German-engineered VEKA uPVC systems to Kerala — designed to withstand the monsoon and the heat.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div variants={slideUp} className="mt-7 flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
               <Link to="/products" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                 Explore the Finique Standard
                 <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </Link>
               <Link to="/contact" className="w-full sm:w-auto group inline-flex justify-center items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white">
                 <svg className="w-4 h-4 text-violet-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 Visit Experience Centre
               </Link>
            </motion.div>
          </motion.div>

          {/* Floating Glassmorphic Badge / Awards */}
          <motion.div 
             variants={slideLeft}
             initial="hidden"
             animate="show"
             className="hidden lg:flex absolute bottom-4 right-4 items-center gap-6 rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full mix-blend-screen filter blur-[40px] opacity-40 animate-pulse" />
             <div className="flex flex-col relative z-10">
                <span className="text-3xl font-extrabold text-white">50+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Year Lifespan</span>
             </div>
             <div className="w-px h-12 bg-white/10 relative z-10" />
             <div className="flex flex-col relative z-10">
                <span className="text-3xl font-extrabold text-white">VEKA</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Certified System</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
