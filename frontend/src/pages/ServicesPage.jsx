import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';
import { buildCanonicalUrl, siteConfig } from '../utils/siteSeo';



const ServicesPage = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'uPVC Window Installation Kerala',
    serviceType: 'Fenestration Services',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name
    },
    areaServed: 'Kerala',
    description: 'VEKA uPVC window systems in Kerala. Engineered for heavy monsoon, noise reduction, and thermal insulation.'
  };

  return (
    <main className="relative bg-white overflow-hidden">
      <Seo
        title="uPVC Windows Kerala | VEKA German Profiles | Finique Windows"
        description="Finique specializes in uPVC windows in Kerala designed for heavy monsoons, heat, and coastal air. Powered by VEKA Germany."
        schema={serviceSchema}
        keywords="uPVC windows Kerala, VEKA uPVC Kerala, soundproof windows, best uPVC windows Kochi, weatherproof windows Kerala"
      />

      {/* ── Hero Section ── */}
      <section className="relative bg-brand-navy pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-transparent pointer-events-none" />
        
        <div className="container-shell relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={slideUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md shadow-sm mb-6">
                Powered by VEKA Germany
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-gilroy font-extrabold text-white leading-[1.1] mb-8">
                uPVC Windows <br />
                <span className="text-white drop-shadow-sm">
                  Built for Kerala.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-2xl">
                A long-term investment in comfort, durability, and lifestyle. Engineered to withstand Kerala’s heavy monsoons, humidity, and rising heat.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slideRight}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/shutterstock_725317243.webp" 
                  alt="Modern Kerala Interior with Large Windows" 
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slideLeft}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-gilroy font-extrabold text-brand-navy leading-tight">
                More Than Just Windows. <br />
                A Better Way to Live.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                As a founder-led fenestration brand, we understand that homeowners today are searching for quieter spaces, lower maintenance, and a more refined living experience.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our uPVC window systems are designed to reduce outside noise, improve thermal insulation, prevent water leakage, and enhance ventilation while maintaining a clean and contemporary appearance.
              </p>
              <div className="pt-4">
                 <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-brand-navy bg-white px-8 py-3.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:bg-brand-navy hover:text-white">
                    Request a Personalized Consultation
                    <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                 </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  </main>
  );
};

export default ServicesPage;
