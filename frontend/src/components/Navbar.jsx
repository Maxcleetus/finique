import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { slideUp } from '../utils/motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = ({ onOpenEnquiry }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur"
      initial="hidden"
      animate="show"
      variants={slideUp}
    >
      <div className="container-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="FINIQUE" className="h-10 w-auto" loading="eager" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-brand-navy' : 'text-slate-700 hover:text-brand-navy'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Enquire Now
          </button>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-brand-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-brand-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-brand-navy" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-brand-border bg-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="container-shell flex flex-col gap-3 py-4">
              {navLinks.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenEnquiry();
                }}
                className="mt-1 rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
