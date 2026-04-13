import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';
import { buildCanonicalUrl, siteConfig } from '../utils/siteSeo';

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '100%', label: 'Quality Certified' },
  { value: '24/7', label: 'Customer Support' }
];

const processSteps = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Consultation & Design',
    detail: 'Requirement study, opening analysis, and profile-system recommendation aligned to architecture.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Precision Fabrication',
    detail: 'CNC-assisted profile cutting, reinforcement integration, and weld-finish quality checks.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Hardware & Glazing',
    detail: 'Branded hardware installation, glazing assembly, and air-water-tightness inspection.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Final QA & Dispatch',
    detail: 'Dimensional verification, surface review, packing standards, and project-ready dispatch.'
  }
];

const AboutPage = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    url: buildCanonicalUrl('/about'),
    description:
      'Learn about FINIQUE, our manufacturing process, quality standards, and premium aluminium window and door systems.'
  };

  return (
    <>
      <Seo
        title="About"
        description="Learn about FINIQUE, our manufacturing process, and the premium aluminium window and door systems we deliver for modern projects."
        schema={aboutSchema}
        keywords="about FINIQUE, aluminium windows manufacturer, aluminium doors company, Kerala window manufacturer"
      />

      {/* ── Hero Section ── */}
      <motion.section
        className="relative bg-brand-navy overflow-hidden"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        {/* Background decorative elements */}
        {/* Text contrast layer – dark scrim at top where headline lives */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-transparent pointer-events-none" />
        {/* Bottom transition to white – starts low so it doesn't bleed onto text */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        <div className="container-shell py-24 lg:py-32 relative z-10">
          <motion.div variants={slideUp} className="max-w-3xl">
            <span className="inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200 mb-8">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8">
              Crafted for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300">
                Perfection
              </span>
            </h1>
            <p className="text-lg text-slate-100 leading-relaxed max-w-2xl">
              FINIQUE is a premium aluminium windows and doors manufacturer focused on precision engineering, dependable lifecycle performance, and clean architectural aesthetics for residential and commercial projects.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={slideUp}
                className="bg-white/5 hover:bg-white/10 transition-colors duration-300 px-8 py-8 text-center"
              >
                <p className="text-4xl font-extrabold text-white mb-2">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Mission & Vision ── */}
      <motion.section
        className="container-shell py-20 lg:py-28"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={slideUp}>
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700 mb-4">Our Foundation</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Built on Purpose
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.article
            variants={slideRight}
            className="group relative overflow-hidden rounded-3xl bg-brand-navy p-10 text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600/30 mb-6 border border-violet-400/20">
                <svg className="w-6 h-6 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                To deliver high-performance aluminium systems that improve comfort, energy efficiency, and long-term project value while maintaining premium finish standards across every installation.
              </p>
            </div>
          </motion.article>

          <motion.article
            variants={slideLeft}
            className="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-violet-100/60 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-100 mb-6 border border-violet-200">
                <svg className="w-6 h-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To be the trusted benchmark in premium fenestration through disciplined manufacturing, transparent execution, and service reliability — setting the standard for modern architectural facades.
              </p>
            </div>
          </motion.article>
        </div>
      </motion.section>

      {/* ── Manufacturing Process ── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 lg:py-28">
        <motion.div
          className="container-shell"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={slideUp}>
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700 mb-4">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Manufacturing Process</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Every FINIQUE product passes through a rigorous four-stage process designed to ensure flawless quality and precision.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                variants={slideUp}
                className="group relative rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-violet-50 transition-colors select-none">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-3 group-hover:text-violet-800 transition-colors">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <motion.section
        className="container-shell py-20 lg:py-28"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div
          variants={slideUp}
          className="relative overflow-hidden rounded-3xl bg-brand-navy px-8 py-16 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.3)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Build With FINIQUE?</h3>
            <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
              Let's bring your architectural vision to life with our premium door and window systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-brand-navy shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-violet-700"
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default AboutPage;
