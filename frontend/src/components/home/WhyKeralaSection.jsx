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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.25)_0%,transparent_70%)] pointer-events-none" />
      <div className="container-shell relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div variants={slideRight} className="text-center lg:text-left">
            <span className="inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200 mb-5">Local Authority</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-5">Built for the Coast.<br />Proven in the Rain.</h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              From the humid backwaters of Kochi to the relentless monsoons of Wayanad — Kerala's climate is unlike anywhere else. Finique Windows are tested for real-life performance in every corner of the state.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-brand-navy">
                Get Your Free Window Audit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
              <div key={idx} className="flex items-start gap-5 bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
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
