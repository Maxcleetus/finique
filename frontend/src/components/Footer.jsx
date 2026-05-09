import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const LOCATION_URL =
  'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' }
];

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-white border-t border-slate-100 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 items-start">
          
          {/* Brand Info - Compact */}
          <motion.div variants={slideUp} className="lg:col-span-4 max-w-sm">
            <img src="/assets/logo.png" alt="FINIQUE" className="h-8 w-auto mb-4" loading="lazy" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              German-engineered VEKA uPVC systems tailored for Kerala’s climate. Uncompromising quality, zero maintenance.
            </p>
          </motion.div>

          {/* Links Grid - Optimized */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            <motion.div variants={slideUp}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-xs text-slate-550 hover:text-brand-navy transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            <motion.div variants={slideUp}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-4">Visit Us</h4>
              <p className="text-xs text-slate-550 leading-relaxed mb-3">FINIQUE Manufacturing<br/>Kerala, India</p>
              <a
                href={LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-navy hover:text-brand-navy transition-colors"
              >
                MAP VIEW
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            <motion.div variants={slideUp} className="col-span-2 sm:col-span-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-4">Support</h4>
              <div className="flex flex-col gap-2.5">
                <a href="tel:+919876543210" className="text-xs text-slate-550 hover:text-brand-navy transition-colors">+91 98765 43210</a>
                <a href="mailto:hello@finique.com" className="text-xs text-slate-550 hover:text-brand-navy transition-colors">hello@finique.com</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} FINIQUE. Built for Kerala.</p>
          <div className="flex gap-4">
            <span>VEKA Certified</span>
            <span className="text-slate-200">|</span>
            <span>German Engineering</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
