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
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFeedback({ type: 'error', message: 'File size must be under 10MB' });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('phone', formData.phone);
    if (formData.email) submissionData.append('email', formData.email);
    if (formData.message) submissionData.append('message', formData.message);
    if (productId) submissionData.append('productId', productId);
    if (file) submissionData.append('attachment', file);

    try {
      await api.post('/enquiries', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFeedback({ type: 'success', message: 'Message sent. We will be in touch shortly.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
      setFile(null);
      if (onSubmitted) onSubmitted();
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setSubmitting(false);
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
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Email Address <span className="text-slate-400 font-normal normal-case">(Optional)</span>
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="john@company.com"
            className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="w-full">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Project Requirements <span className="text-slate-400 font-normal normal-case">(Optional)</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            placeholder="Tell us about your architectural enclosure needs..."
            className="w-full bg-white rounded-lg border border-slate-200 px-4 py-3.5 text-sm text-brand-navy focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all placeholder:text-slate-300 resize-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Upload joinery details or site photos <span className="text-slate-400 font-normal normal-case">(Optional)</span>
          </label>
          <div className="relative border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50 hover:bg-slate-100/50 transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-md border border-slate-200 text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-brand-navy block truncate max-w-[200px]">
                  {file ? file.name : 'Select photo or PDF'}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Max size 10MB'}
                </span>
              </div>
            </div>
            
            {file ? (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            ) : (
              <label className="cursor-pointer bg-white border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold text-brand-navy shadow-sm hover:bg-slate-50 transition active:scale-95">
                Browse
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
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
