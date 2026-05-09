import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideRight, slideLeft, staggerContainer, viewport } from '../../utils/motion';

const WhyKeralaSection = () => {
  return (
    <motion.section
      className="bg-brand-navy py-12 lg:py-24 overflow-hidden relative"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="container-shell relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div variants={slideRight} className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-sm mb-6">
              Local Authority
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-gilroy font-extrabold text-white leading-[1.1] mb-6 tracking-tight">Built for the Coast.<br />Proven in the Rain.</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-light">
              For years, homes in Kerala have struggled with heavy monsoons, coastal corrosion, and urban noise. Traditional windows often fail — leading to leakage, rusting, and swelling. Finique solves these problems with engineering-led systems designed specifically for modern living in Kerala.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-navy shadow-lg transition-all duration-300 hover:bg-slate-200 hover:-translate-y-1">
                Get Your Free Window Audit
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
          <motion.div variants={slideLeft} className="space-y-5">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Corrosion Resistance", desc: "Essential for homes within 5km of the coastline. VEKA uPVC is completely immune to salt air and coastal humidity that destroys aluminium and steel over time." },
              { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", title: "Wind Load Capacity", desc: "Engineered to withstand high-pressure winds in high-rise apartments and exposed hillside homes — tested to international wind resistance standards." },
              { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "Monsoon Drainage Tracks", desc: "Integrated drainage channels within the frame profile ensure that not a single drop of water enters your living room — even during the harshest Karkidakam rains." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-6 py-6 border-b border-white/10 last:border-0 group">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center text-white">
                  <svg className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-gilroy font-extrabold text-white text-xl mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-[15px] leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyKeralaSection;
