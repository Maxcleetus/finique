import { motion } from 'framer-motion';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const LOCATION_URL =
  'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D';

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-brand-border bg-brand-slate"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <motion.div variants={slideUp}>
          <img src="/assets/logo.png" alt="FINIQUE" className="h-10" loading="lazy" />
          <p className="mt-3 text-sm text-slate-600">
            Premium uPVC windows and doors engineered for performance, longevity, and modern architecture.
          </p>
        </motion.div>
        <motion.div variants={slideUp}>
          <h4 className="text-sm font-bold text-brand-navy">Office</h4>
          <p className="mt-3 text-sm text-slate-600">FINIQUE Manufacturing Pvt. Ltd.</p>
          <a
            href={LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-navy underline underline-offset-2 hover:opacity-80"
          >
            Finique Windows, Kerala (View on Google Maps)
          </a>
        </motion.div>
        <motion.div variants={slideUp}>
          <h4 className="text-sm font-bold text-brand-navy">Contact</h4>
          <p className="mt-3 text-sm text-slate-600">+91 98765 43210</p>
          <p className="text-sm text-slate-600">hello@finique.com</p>
        </motion.div>
      </div>
      <motion.div className="border-t border-brand-border py-4 text-center text-xs text-slate-500" variants={slideUp}>
        {new Date().getFullYear()} FINIQUE. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
