import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' }
];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: '-100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const mobileListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    transition: {
      duration: 0.12,
      ease: 'easeOut',
    },
  },
};

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

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-brand-navy"
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

        {/* Hamburger Icon */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-navy/30 hover:text-brand-navy hover:bg-slate-50 focus:outline-none md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex min-h-screen flex-col overflow-y-auto bg-slate-50 px-5 py-5 text-slate-900 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
                <img src="/assets/logo.png" alt="FINIQUE" className="h-10 w-auto" />
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-navy/30 hover:bg-slate-50 hover:text-brand-navy focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-3 py-10"
              variants={mobileListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <motion.div key={item.to} variants={mobileItemVariants}>
                    <Link
                      to={item.to}
                      className={`block rounded-lg px-6 py-3 text-center text-2xl font-light transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-navy/10 text-brand-navy font-semibold'
                          : 'text-slate-800 hover:bg-slate-100 hover:text-brand-navy'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                className="mt-5 w-full max-w-xs border-t border-slate-200 pt-5"
                variants={mobileItemVariants}
              >
                <button
                  type="button"
                  onClick={() => { setOpen(false); onOpenEnquiry(); }}
                  className="w-full rounded-xl bg-brand-navy py-3 text-center text-sm font-bold text-white shadow-lg shadow-violet-900/20 transition-all hover:bg-violet-950"
                >
                  Enquire Now
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
