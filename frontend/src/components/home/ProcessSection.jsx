import { motion } from 'framer-motion';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';

const ProcessSection = () => {
  return (
    <motion.section
      className="bg-slate-50 py-12 lg:py-24 border-y border-slate-200"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell">
        <motion.div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14 px-4" variants={slideUp}>
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-3">Our Process</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-tight mb-3">The Weightless Journey</h3>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">From conversation to installation — every detail handled, every step of the way.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {[
            { step: "01", title: "The Dialogue", desc: "We don't sell; we educate. A free consultation to understand your home's orientation, lifestyle needs, and design goals." },
            { step: "02", title: "Precision Mapping", desc: "Expert measurement using laser technology — because a window is only as good as its fit. Zero guesswork, zero gaps." },
            { step: "03", title: "Seamless Installation", desc: "Trained technicians ensure a thermal-bridge-free installation. Clean, efficient, and built to perform from day one." },
            { step: "04", title: "The Finique Guarantee", desc: "Long-term peace of mind with dedicated after-sales support. We stand behind every window we install, for the long haul." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={slideUp} className="relative bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="text-4xl sm:text-5xl font-black text-violet-100 leading-none block mb-3">{item.step}</span>
              <h4 className="text-base font-bold text-brand-navy mb-1.5">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessSection;
