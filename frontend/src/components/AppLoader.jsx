import { motion } from 'framer-motion';

const AppLoader = ({ label = 'Loading...', className = '', inline = false }) => {
  if (inline) {
    return (
      <div className={`inline-flex items-center justify-center gap-2 ${className}`}>
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-navy/70 border-t-transparent" />
        <span className="text-sm font-medium text-slate-500">{label}</span>
      </div>
    );
  }

  return (
    <div className={`flex min-h-[200px] flex-col items-center justify-center gap-6 ${className}`}>
      {/* Animated concentric rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ring */}
        <motion.span
          className="absolute h-16 w-16 rounded-full border border-violet-200"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mid pulsing ring */}
        <motion.span
          className="absolute h-12 w-12 rounded-full border border-violet-300"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* Inner spinner */}
        <div className="relative h-10 w-10">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-brand-navy/10"
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-t-brand-navy border-r-brand-navy border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-2 w-2 rounded-full bg-violet-600"
              animate={{ scale: [1, 0.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      {/* Label with subtle fade animation */}
      <motion.p
        className="text-sm font-semibold text-slate-500 tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.p>
    </div>
  );
};

export default AppLoader;
