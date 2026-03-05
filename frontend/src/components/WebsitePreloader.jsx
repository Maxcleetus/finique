import { AnimatePresence, motion } from 'framer-motion';

const WebsitePreloader = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-gradient-to-br from-brand-navy via-[#1f334f] to-[#0f233f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
            <motion.img
              src="/assets/logo.png"
              alt="FINIQUE"
              className="h-16 w-auto"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.p
              className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Premium Windows & Doors
            </motion.p>

            <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsitePreloader;
