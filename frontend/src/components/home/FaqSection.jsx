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
    <div className={`border-b transition-colors duration-300 ${isOpen ? 'border-brand-navy' : 'border-slate-200'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left focus:outline-none py-6 group"
      >
        <div className="flex items-center gap-6 flex-1 pr-4">
          <span className={`text-sm font-gilroy font-extrabold transition-colors ${isOpen ? 'text-brand-navy' : 'text-slate-300'}`}>0{index + 1}</span>
          <h5 className="flex-1 text-base sm:text-lg font-gilroy font-extrabold text-brand-navy">{faq.question}</h5>
        </div>
        <div className={`flex shrink-0 items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-navy' : 'rotate-0 text-slate-400 group-hover:text-brand-navy'}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="pb-8 pt-0 pl-11 pr-4">
              <p className="text-slate-600 text-[15px] leading-relaxed font-light">{faq.answer}</p>
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
      <div className="container-shell relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
        <motion.div variants={slideRight} className="lg:sticky lg:top-32">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-6">
            Questions & Answers
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-gilroy font-extrabold text-brand-navy leading-tight mb-6 tracking-tight">Frequently Asked Questions</h3>
          <p className="text-slate-600 mb-10 text-base lg:text-lg max-w-md reading-relaxed">
            Have questions about uPVC windows for your Kerala home? Find clear, honest answers here — no jargon.
          </p>
          
          <div className="border border-slate-200 rounded-3xl bg-slate-50 p-8 shadow-sm group">
            <div className="flex flex-col items-start gap-3">
              <h4 className="text-lg font-gilroy font-bold text-brand-navy">Still need help?</h4>
              <p className="text-slate-500 text-[15px] mb-6 leading-relaxed">Our dedicated support team is ready to assist you with any custom architectural inquiries.</p>
              <Link to="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-brand-navy group-hover:text-black transition-colors underline underline-offset-4 decoration-2 decoration-brand-navy/30 hover:decoration-black">
                Contact Support
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={slideLeft} className="flex flex-col border-t border-slate-200">
          {faqData.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FaqSection;
