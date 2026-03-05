import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';

const AboutPage = () => {
  const processSteps = [
    {
      title: 'Consultation & Design',
      detail: 'Requirement study, opening analysis, and profile-system recommendation aligned to architecture.'
    },
    {
      title: 'Precision Fabrication',
      detail: 'CNC-assisted profile cutting, reinforcement integration, and weld-finish quality checks.'
    },
    {
      title: 'Hardware & Glazing',
      detail: 'Branded hardware installation, glazing assembly, and air-water-tightness inspection.'
    },
    {
      title: 'Final QA & Dispatch',
      detail: 'Dimensional verification, surface review, packing standards, and project-ready dispatch.'
    }
  ];

  return (
    <>
      <Seo title="About" description="About FINIQUE - premium uPVC windows and doors manufacturer." />
      <motion.section
        className="border-b border-brand-border bg-brand-slate/60"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="container-shell py-16">
          <motion.h1 className="section-title" variants={slideUp}>
            About FINIQUE
          </motion.h1>
          <motion.p className="section-subtitle" variants={slideUp}>
            FINIQUE is a premium uPVC windows and doors manufacturer focused on precision engineering, dependable lifecycle
            performance, and clean architectural aesthetics for residential and commercial projects.
          </motion.p>

          <motion.div className="mt-8 grid gap-6 sm:grid-cols-3" variants={staggerContainer}>
            <motion.article className="card" variants={slideUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Product Focus</p>
              <p className="mt-2 text-xl font-bold text-brand-navy">uPVC Windows & Doors</p>
            </motion.article>
            <motion.article className="card" variants={slideUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</p>
              <p className="mt-2 text-xl font-bold text-brand-navy">Residential + Commercial</p>
            </motion.article>
            <motion.article className="card" variants={slideUp}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Positioning</p>
              <p className="mt-2 text-xl font-bold text-brand-navy">Premium Manufacturing Brand</p>
            </motion.article>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="container-shell py-14"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.article className="card" variants={slideRight}>
            <h3 className="text-lg font-bold text-brand-navy">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              To deliver high-performance uPVC systems that improve comfort, energy efficiency, and long-term project value
              while maintaining premium finish standards.
            </p>
          </motion.article>
          <motion.article className="card" variants={slideLeft}>
            <h3 className="text-lg font-bold text-brand-navy">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              To be the trusted benchmark in premium fenestration through disciplined manufacturing, transparent execution, and
              service reliability.
            </p>
          </motion.article>
        </div>

        <div className="mt-12">
          <motion.h2 className="section-title" variants={slideUp}>
            Manufacturing Process
          </motion.h2>
          <motion.div className="mt-6 grid gap-4 md:grid-cols-2" variants={staggerContainer}>
            {processSteps.map((step, index) => (
              <motion.article key={step.title} className="card" variants={slideUp}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {index + 1}</p>
                <h3 className="mt-2 text-base font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div className="mt-12 grid gap-6 md:grid-cols-2" variants={staggerContainer}>
          <motion.article
            variants={slideRight}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="relative overflow-hidden rounded-xl border border-brand-border bg-gradient-to-br from-brand-navy to-slate-800 p-7 text-white"
          >
            <motion.div
              className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/10"
              animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">Why FINIQUE</p>
            <h3 className="mt-3 text-2xl font-bold">Performance Driven</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-100/95">
              Every system is built for acoustic comfort, thermal stability, and weather resilience with premium visual finish.
            </p>
          </motion.article>

          <motion.article
            variants={slideLeft}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="relative overflow-hidden rounded-xl border border-brand-border bg-white p-7"
          >
            <motion.div
              className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-brand-slate"
              animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Project Commitment</p>
            <h3 className="mt-3 text-2xl font-bold text-brand-navy">Execution You Can Trust</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Structured planning, quality-controlled production, and clear client communication from design approval to handover.
            </p>
          </motion.article>
        </motion.div>
      </motion.section>
    </>
  );
};

export default AboutPage;
