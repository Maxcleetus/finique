import { motion } from 'framer-motion';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';
import LogoLoop from '../LogoLoop';

const SocialConnectSection = () => {
  const socialLogos = [
    {
      node: (
        <span className="p-5 rounded-full border border-slate-200 bg-white text-slate-400 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-50/30 inline-flex items-center justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </span>
      ),
      title: "Instagram",
      href: "https://instagram.com/finiquewindows"
    },
    {
      node: (
        <span className="p-5 rounded-full border border-slate-200 bg-white text-slate-400 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:text-blue-600 hover:border-blue-600/30 hover:bg-blue-50/30 inline-flex items-center justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </span>
      ),
      title: "Facebook",
      href: "https://facebook.com/finiquewindows"
    },
    {
      node: (
        <span className="p-5 rounded-full border border-slate-200 bg-white text-slate-400 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:text-red-600 hover:border-red-600/30 hover:bg-red-50/30 inline-flex items-center justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 00-1.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
          </svg>
        </span>
      ),
      title: "YouTube",
      href: "https://youtube.com/@finiquewindows"
    }
  ];

  return (
    <motion.section
      className="bg-white border-y border-slate-100 py-16"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell flex flex-col items-center justify-center gap-6 text-center">
        <motion.div variants={slideUp} className="flex flex-col items-center gap-5 w-full">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Connect with us
          </span>

          <div className="w-full max-w-xl mx-auto overflow-hidden py-4">
            <LogoLoop
              logos={socialLogos}
              speed={50}
              direction="left"
              logoHeight={82}
              gap={32}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Social media links"
            />
          </div>

          <p className="text-sm text-slate-400 mt-2 font-medium tracking-wide">
            Follow us for updates
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialConnectSection;