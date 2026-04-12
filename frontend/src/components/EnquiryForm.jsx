import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const EnquiryForm = ({ productId, title = null, className = '', onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await api.post('/enquiries', { ...formData, productId });
      setFeedback({ type: 'success', message: 'Message sent. We will be in touch shortly.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
      if (onSubmitted) onSubmitted();
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setSubmitting(false);
      // Automatically clear success/error messages after 5 seconds
      setTimeout(() => setFeedback({ type: '', message: '' }), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      {title && <h3 className="text-xl font-bold text-brand-navy mb-6">{title}</h3>}
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="w-full">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="w-full">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 90000 00000"
              required
              className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="john@company.com"
            required
            className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="w-full">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Project Requirements</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your architectural enclosure needs..."
            required
            className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-brand-navy px-6 py-4 text-sm font-bold text-white transition-all hover:bg-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70 flex justify-center items-center mt-2"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Submit Enquiry'
          )}
        </button>

        <AnimatePresence>
          {feedback.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg mt-4 text-sm font-semibold flex items-center gap-2 ${
                feedback.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default EnquiryForm;
