import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import EnquiryForm from './EnquiryForm';

const EnquiryPopup = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-full max-w-xl rounded-2xl border border-brand-border bg-white p-4 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Quick Contact</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <EnquiryForm title="Enquire Now" className="space-y-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryPopup;
