import { motion } from 'framer-motion';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';

const featureData = [
  {
    title: "Thermal Lift",
    description: "Multi-chambered VEKA profiles block heat transfer, keeping your interiors significantly cooler and lowering your AC bills — even during Kerala's peak summer.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Acoustic Silence",
    description: "Precision-sealed gaskets and double-glazed glass deliver up to 40dB noise reduction — transforming your home into a sanctuary away from street noise and monsoon rain.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    )
  },
  {
    title: "Zero-Gravity Maintenance",
    description: "No rot. No rust. No repainting. Ever. VEKA uPVC is termite-proof, corrosion-resistant, and UV-stabilized for Kerala's coastal air and tropical sun.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Storm-Shield",
    description: "Integrated drainage channels and watertight engineering ensure not a single drop enters your living room — even during the harshest Karkidakam rains.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  }
];

const PillarsSection = () => {
  return (
    <motion.section
      className="bg-white py-12 lg:py-24 border-y border-slate-200"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell">
        <motion.div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14 px-4" variants={slideUp}>
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-3">The Finique Difference</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-tight mb-3">Engineered for Kerala.<br className="hidden sm:block" /> Built to Last.</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every VEKA uPVC system we install is measured against Kerala's most demanding conditions. These are not features. These are expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featureData.map((feature, idx) => (
            <motion.div key={idx} variants={slideUp} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-slate rounded-full flex items-center justify-center mb-4 sm:mb-6">
                {feature.icon}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-brand-navy mb-2">{feature.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PillarsSection;
