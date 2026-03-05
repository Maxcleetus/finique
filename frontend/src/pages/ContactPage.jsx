import { motion } from 'framer-motion';
import EnquiryForm from '../components/EnquiryForm';
import Seo from '../components/Seo';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';

const LOCATION_URL =
  'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D';
const LOCATION_EMBED_URL = 'https://maps.google.com/maps?q=10.2978812,76.147169&z=17&output=embed';

const ContactPage = () => {
  return (
    <motion.section
      className="container-shell py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <Seo title="Contact" description="Contact FINIQUE for product consultations and project enquiries." />
      <motion.h1 className="section-title" variants={slideUp}>
        Contact FINIQUE
      </motion.h1>
      <motion.p className="section-subtitle" variants={slideUp}>
        Connect with our technical and sales team for your upcoming project.
      </motion.p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <motion.div className="card space-y-4 text-sm text-slate-700" variants={slideRight}>
          <p>
            <span className="font-semibold text-brand-navy">Address:</span>{' '}
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-navy underline underline-offset-2 hover:opacity-80"
            >
              View on Google Maps
            </a>
          </p>
          <p>
            <span className="font-semibold text-brand-navy">Phone:</span> +91 98765 43210
          </p>
          <p>
            <span className="font-semibold text-brand-navy">Email:</span> hello@finique.com
          </p>

          <iframe
            title="FINIQUE Location"
            src={LOCATION_EMBED_URL}
            className="h-72 w-full rounded-lg border border-brand-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div variants={slideLeft}>
          <EnquiryForm />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
