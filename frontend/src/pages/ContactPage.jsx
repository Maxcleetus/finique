import { motion } from 'framer-motion';
import EnquiryForm from '../components/EnquiryForm';
import Seo from '../components/Seo';
import { slideUp, staggerContainer, viewport } from '../utils/motion';
import { buildCanonicalUrl, siteConfig } from '../utils/siteSeo';

const LOCATION_URL =
  'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D';
const LOCATION_EMBED_URL = 'https://maps.google.com/maps?q=10.2978812,76.147169&z=17&output=embed';

const ContactPage = () => {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    url: buildCanonicalUrl('/contact'),
    description: 'Contact FINIQUE for aluminium window and door consultations, pricing, and project enquiries.'
  };

  return (
    <>
      <Seo
        title="Contact"
        description="Contact FINIQUE for aluminium window and door consultations, pricing, and project enquiries."
        schema={contactSchema}
        keywords="contact FINIQUE, aluminium windows enquiry, aluminium doors quote, window manufacturer contact Kerala"
      />

      <motion.section
        className="container-shell py-20 lg:py-32 flex flex-col gap-20"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="grid gap-16 lg:grid-cols-5">
          
          {/* Left Column: Headers & Info */}
          <motion.div variants={slideUp} className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
                Get in<br className="hidden sm:block" /> touch with us.
              </h1>
              <p className="text-slate-600 text-lg mb-12 max-w-md">
                Our technical and sales team is ready to assist you with specifications, project planning, and premium aluminium enclosure systems.
              </p>

              <div className="space-y-10">
                {/* Office */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Corporate Office</h3>
                  <p className="text-brand-navy font-semibold text-lg leading-snug">FINIQUE Manufacturing Pvt. Ltd.</p>
                  <p className="text-slate-500 mb-2">Kerala, India</p>
                  <a href={LOCATION_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors inline-block">
                    Get Directions &rarr;
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Phone</h3>
                  <a href="tel:+919876543210" className="text-brand-navy font-semibold text-lg hover:text-violet-600 transition-colors">
                    +91 98765 43210
                  </a>
                  <p className="text-slate-500 text-sm mt-1">Mon - Sat, 9am - 6pm</p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Email</h3>
                  <a href="mailto:hello@finique.com" className="text-brand-navy font-semibold text-lg hover:text-violet-600 transition-colors">
                    hello@finique.com
                  </a>
                  <p className="text-slate-500 text-sm mt-1">For general & technical enquiries</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div variants={slideUp} className="lg:col-span-3">
             <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-8 sm:p-12">
                <div className="mb-8">
                   <h2 className="text-2xl font-bold text-brand-navy mb-2">Send an Enquiry</h2>
                   <p className="text-sm text-slate-500">Please fill out the form below and we will respond within 24 hours.</p>
                </div>
                <EnquiryForm />
             </div>
          </motion.div>
        </div>

        {/* Full Width Clean Map Strip */}
        <motion.div variants={slideUp} className="w-full">
           <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
             <iframe
               title="FINIQUE Location"
               src={LOCATION_EMBED_URL}
               className="w-full h-[400px] grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100 mix-blend-multiply"
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               style={{ border: 0 }}
             />
           </div>
        </motion.div>

      </motion.section>
    </>
  );
};

export default ContactPage;
