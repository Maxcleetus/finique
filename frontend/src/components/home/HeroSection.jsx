import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideUp, slideLeft, staggerContainer } from '../../utils/motion';

const ArrowIcon = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4 text-slate-300 transition-colors group-hover:text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

/* ── VEKA Badge — logo only ─────────────────────────────────── */
const VekaBadge = () => (
  <div
    aria-label="VEKA Certified"
    className="w-10 h-10 lg:w-20 lg:h-20 rounded-lg lg:rounded-xl bg-white shadow-md lg:shadow-lg flex items-center justify-center p-1.5 lg:p-1 flex-shrink-0"
  >
    <img
      src="/images.png"
      alt="VEKA Certified"
      className="w-full h-full object-contain"
      draggable={false}
    />
  </div>
);

const HeroSection = () => {
  return (
    <section
      className="relative h-[85vh] min-h-[600px] overflow-hidden bg-brand-navy"
      aria-label="Hero"
    >
      {/* VEKA badge — fixed to true bottom-right of hero, independent of content */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate="show"
        className="absolute bottom-4 right-4 z-50"
      >
        <VekaBadge />
      </motion.div>
      {/* Background — slow parallax zoom */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        aria-hidden="true"
      >
        <img
          src="/shutterstock_195881123.webp"
          alt="Home with finique windows"
          className="w-full h-full object-cover object-center sm:object-right"
          loading="eager"
          fetchpriority="high"
        />
      </motion.div>

      {/* Dot-matrix architectural overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 z-[5] bg-black/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Directional gradient — bottom-up for mobile, left-to-right for desktop */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#000745]/95 via-[#000745]/75 to-[#000745]/30 sm:bg-gradient-to-r sm:from-[#000745] sm:via-[#000745]/65 sm:to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle aesthetic overlay to enrich the colors */}
      <div
        className="absolute inset-0 z-[11] bg-gradient-to-bl from-transparent via-violet-900/10 to-transparent pointer-events-none mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="absolute inset-0 z-40 flex items-center justify-center lg:justify-start">
        <div className="container-shell w-full relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 px-6 sm:px-8 py-10 text-center lg:text-left"
          >
            <motion.h1
              variants={slideUp}
              className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-gilroy font-extrabold leading-[1.1] text-white tracking-tight"
            >
              Barriers Against
              <span className="block mt-1 sm:mt-2 text-slate-300 font-medium">
                Heat, Rain, and Time.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={slideUp}
              className="mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-400 max-w-lg mx-auto lg:mx-0 font-light"
            >
              uPVC window and door systems engineered for Kerala's unique climate. Designed for comfort, built for life.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={slideUp}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
            >
              <Link
                to="/products"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-navy transition-all duration-300 hover:bg-slate-100"
              >
                Explore Collections
                <ArrowIcon />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
              >
                <LocationIcon />
                Visit Experience Centre
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;