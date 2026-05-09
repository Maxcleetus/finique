import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';
import { buildCanonicalUrl, siteConfig } from '../utils/siteSeo';

const benefits = [
  {
    title: 'Premium VEKA uPVC profiles',
    desc: 'World-class German engineering for superior performance and elegance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Precision Fabrication',
    desc: 'State-of-the-art manufacturing ensures perfect fit and finish for every system.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )
  },
  {
    title: 'Advanced Locking',
    desc: 'Multi-point locking systems providing maximum security and peace of mind.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: 'High-Performance Sealing',
    desc: 'Advanced EPDM gaskets for ultimate air and water tightness.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

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
    description: 'Premium VEKA uPVC window systems in Kerala. Engineered for heavy monsoon, noise reduction, and thermal insulation.'
  };

  return (
    <main className="relative bg-white overflow-hidden">
      <Seo
        title="Premium uPVC Windows Kerala | VEKA German Profiles | Finique Windows"
        description="Finique specializes in premium uPVC windows in Kerala designed for heavy monsoons, heat, and coastal air. Powered by VEKA Germany."
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
                Premium uPVC Windows <br />
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
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" 
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

      {/* ── Why Finique ── */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-200">
        <div className="container-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={slideUp} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-5">The Finique Advantage</motion.span>
            <motion.h2 variants={slideUp} className="text-3xl sm:text-4xl font-gilroy font-extrabold text-brand-navy">Why Homeowners Prefer Finique</motion.h2>
            <motion.p variants={slideUp} className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Choosing the best uPVC windows requires more than comparing prices. It requires understanding profile quality, fabrication precision, and installation expertise.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={slideUp}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-500 flex items-center justify-center text-brand-navy mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={slideUp}
            className="mt-16 bg-white/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-10">
               <div>
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Integrated Approach</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    This integrated approach—from premium VEKA profiles to professional installation—helps homeowners achieve better soundproofing, enhanced energy efficiency, and long-lasting structural performance.
                  </p>
                  <ul className="space-y-3">
                     {[
                       'Better soundproofing & noise isolation',
                       'Enhanced thermal & energy efficiency',
                       'Improved rain & moisture protection',
                       'Reduced dust infiltration',
                       'Long-lasting structural performance'
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                          <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                       </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Ideal For</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                       'Luxury Villas',
                       'Contemporary Homes',
                       'Coastal Properties',
                       'High-rise Apartments',
                       'Premium Commercial Projects'
                     ].map((prop, i) => (
                       <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-hidden group">
                          <div className="w-2 h-2 rounded-full bg-brand-navy group-hover:scale-150 transition-transform" />
                          <span className="text-slate-700 font-bold text-sm tracking-tight">{prop}</span>
                       </div>
                     ))}
                  </div>
                  <p className="mt-8 text-slate-500 text-sm italic">
                    We collaborate closely with architects, builders, and interior designers to ensure every fenestration system aligns with the design language of your project.
                  </p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Climate Focus ── */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        
        <div className="container-shell">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
               initial="hidden"
               whileInView="show"
               viewport={viewport}
               variants={staggerContainer}
            >
               <motion.span variants={slideUp} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm mb-5">Engineering for Truth</motion.span>
               <motion.h2 variants={slideUp} className="text-3xl sm:text-5xl font-gilroy font-extrabold text-brand-navy mb-8">Designed for Kerala Climate</motion.h2>
               <motion.p variants={slideUp} className="text-slate-600 text-lg leading-relaxed mb-12">
                 One of the biggest challenges in Kerala is managing heat, moisture, and heavy rainfall. Our weatherproof uPVC windows use multi-chambered VEKA profiles and airtight sealing to ensure zero leakage, corrosion, or swelling over time.
               </motion.p>
               <motion.div variants={slideUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Monsoon Shield', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3', desc: 'Integrated drainage channels for heavy rains.' },
                    { title: 'Thermal Barrier', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', desc: 'Multi-chambered systems to block heat.' },
                    { title: 'Acoustic Clarity', icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z', desc: 'Seal street noise with airtight precision.' }
                  ].map((feat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all text-left">
                       <svg className="w-8 h-8 text-brand-navy mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feat.icon} />
                       </svg>
                       <h5 className="font-bold text-brand-navy mb-2">{feat.title}</h5>
                       <p className="text-slate-500 text-sm">{feat.desc}</p>
                    </div>
                  ))}
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="container-shell py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={slideUp}
          className="relative overflow-hidden rounded-[2rem] bg-brand-navy px-8 py-20 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-gilroy font-extrabold text-white mb-6">
               Experience German Engineering <br className="hidden sm:block" /> with Finique Windows
            </h3>
            <p className="text-slate-200 mb-10 text-lg leading-relaxed">
              From consultation to installation, every detail is handled with precision. Create a living space that performs beautifully for decades.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-brand-navy shadow-xl transition-all duration-300 hover:scale-105 hover:text-brand-navy"
              >
                Book Your Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-10 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                View Collections
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ServicesPage;
