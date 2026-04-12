import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const LOCATION_URL =
  'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact Us' }
];

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-white border-t border-slate-200 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      {/* Subtle top gradient instead of full dark bg */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-200 via-brand-navy/10 to-violet-200 opacity-50" />

      <div className="container-shell pt-16 pb-10">

        {/* Top grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-14">

          {/* Brand column */}
          <motion.div variants={slideUp} className="sm:col-span-2 lg:col-span-1">
            {/* Standard logo for white bg */}
            <img src="/assets/logo.png" alt="FINIQUE" className="h-10 w-auto mb-5" loading="lazy" />
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Premium aluminium windows and doors engineered for performance, longevity, and modern architecture.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={slideUp}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-brand-navy transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Office */}
          <motion.div variants={slideUp}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy mb-5">Our Office</h4>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">FINIQUE Manufacturing Pvt. Ltd.</p>
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-violet-700 hover:text-violet-800 transition-colors duration-200 group font-medium"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="group-hover:underline underline-offset-2">Kerala, India</span>
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div variants={slideUp}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy mb-5">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-navy transition-colors group">
                <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </a>
              <a href="mailto:hello@finique.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-navy transition-colors group">
                <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@finique.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} FINIQUE. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Premium Aluminium Door & Window Systems
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
