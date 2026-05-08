import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slideUp, slideRight, slideLeft, staggerContainer, viewport } from '../../utils/motion';

const faqData = [
  {
    question: "Are uPVC windows good for Kerala's climate?",
    answer: "Absolutely. uPVC windows are among the best choices for Kerala's demanding climate. Their multi-chambered profiles provide excellent thermal insulation to keep rooms cooler, while their fully sealed systems resist water ingress during the heaviest monsoons. Unlike wood, uPVC does not rot or swell in humidity. Unlike aluminium, it doesn't corrode in coastal salt air. VEKA uPVC is specifically stabilized for UV resistance in tropical conditions, ensuring long-lasting performance without yellowing or brittleness."
  },
  {
    question: "What is the difference between uPVC and aluminium windows?",
    answer: "The key differences lie in insulation, maintenance, and longevity. uPVC windows have significantly lower thermal conductivity than aluminium, meaning they block heat far more effectively — critical for Kerala homes. uPVC is also maintenance-free (no painting, no rust, no corrosion), while aluminium can pit and corrode, especially near the coast. VEKA uPVC systems last 50+ years with minimal upkeep, making them a far more economical long-term investment for Kerala homeowners."
  },
  {
    question: "How do uPVC windows reduce noise from outside?",
    answer: "VEKA uPVC systems use precision multi-point locking hardware and double-sealed gaskets that create an airtight seal around the frame. Combined with double-glazed or laminated glass, this can achieve up to 40dB of noise reduction — effectively creating a sanctuary from street noise, traffic, and rain. This is especially valuable for homes near busy roads or urban areas."
  },
  {
    question: "Do Finique Windows products come with a warranty?",
    answer: "Yes. Our VEKA uPVC profiles carry a manufacturer's guarantee for long-term performance, backed by Finique's dedicated after-sales support. We cover both the profiles and hardware, and our installation team ensures a precision fit so your windows perform as intended from day one."
  },
  {
    question: "Can I get custom sizes and configurations for my home?",
    answer: "Yes, every Finique window is custom-fabricated to your specific opening dimensions. We offer sliding systems, casement windows, tilt-and-turn configurations, and more — all in any size. Our team does precision laser measurement before fabrication to ensure a perfect, thermal-bridge-free fit for your home."
  }
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-violet-50/50 border-violet-200 shadow-md' : 'bg-white border-slate-200/60 shadow-sm hover:border-slate-300'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left focus:outline-none p-5 sm:p-6 group"
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          <span className={`text-xs sm:text-sm font-bold font-serif italic ${isOpen ? 'text-violet-600' : 'text-slate-400'}`}>0{index + 1}</span>
          <h5 className={`flex-1 text-base sm:text-lg font-bold transition-colors ${isOpen ? 'text-violet-900' : 'text-brand-navy group-hover:text-violet-700'}`}>{faq.question}</h5>
        </div>
        <div className={`ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600'}`}>
          <svg className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-0 ml-7 sm:ml-10">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  return (
    <motion.section
      className="container-shell py-20 lg:py-32 relative"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-violet-100/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 relative z-10 items-start">
        <motion.div variants={slideRight} className="lg:sticky lg:top-32">
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 mb-6">
            Questions & Answers
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-6">Frequently Asked Questions</h3>
          <p className="text-slate-600 mb-8 text-base lg:text-lg">
            Have questions about uPVC windows for your Kerala home? Find clear, honest answers here — no jargon.
          </p>
          
          <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Still need help?</h4>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">Our dedicated support team is ready to assist you with any custom architectural inquiries.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-navy shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-violet-700">
                  Contact Support
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={slideLeft} className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FaqSection;
