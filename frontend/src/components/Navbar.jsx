import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = ({ onOpenEnquiry }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border-b border-slate-200/50'
          : 'bg-white/95 backdrop-blur border-b border-brand-border'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-shell flex h-18 items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/assets/logo.png" alt="FINIQUE" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" loading="eager" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ${
                  isActive ? 'text-brand-navy' : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-violet-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="ml-4 flex items-center gap-2">
            <Link
              to="/contact"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-brand-navy transition-all duration-200 hover:bg-slate-50 hover:border-brand-navy"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="group relative overflow-hidden rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <span className="relative z-10">Enquire Now</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-700 to-brand-navy transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>
        </nav>

        {/* Hamburger Icon – Animated */}
        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white shadow-sm md:hidden transition-colors hover:bg-slate-50"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="h-0.5 w-5 rounded-full bg-brand-navy origin-center"
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="h-0.5 w-5 rounded-full bg-brand-navy"
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="h-0.5 w-5 rounded-full bg-brand-navy origin-center"
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-slate-100 bg-white/95 backdrop-blur-xl md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container-shell flex flex-col gap-1 py-4 pb-6">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-navy"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                className="mt-3 pt-3 border-t border-slate-100"
              >
                <button
                  type="button"
                  onClick={() => { setOpen(false); onOpenEnquiry(); }}
                  className="w-full rounded-xl bg-brand-navy py-3 text-sm font-bold text-white shadow-lg shadow-violet-900/20 transition-all hover:bg-violet-950"
                >
                  Enquire Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
