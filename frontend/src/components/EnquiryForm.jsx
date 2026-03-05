import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { slideUp, viewport } from '../utils/motion';

const EnquiryForm = ({ productId, title = 'Send an Enquiry', className = 'card space-y-4', onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    try {
      await api.post('/enquiries', { ...formData, productId });
      setFeedback('Thank you. Our team will contact you shortly.');
      setFormData({ name: '', phone: '', email: '', message: '' });
      if (onSubmitted) onSubmitted();
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={slideUp}
    >
      <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-navy focus:outline-none"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-navy focus:outline-none"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-navy focus:outline-none"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        placeholder="Project requirements"
        required
        className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-navy focus:outline-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
      >
        {submitting ? 'Submitting...' : 'Submit Enquiry'}
      </button>
      {feedback && <p className="text-sm text-slate-600">{feedback}</p>}
    </motion.form>
  );
};

export default EnquiryForm;
