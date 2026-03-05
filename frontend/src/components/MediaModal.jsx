import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const isVideoUrl = (url = '') => url.includes('/video/upload/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(url);

const MediaModal = ({ mediaItem, onClose, onNext, onPrev, canNavigate }) => {
  useEffect(() => {
    if (!mediaItem) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (!canNavigate) return;
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mediaItem, onClose, onNext, onPrev, canNavigate]);

  return (
    <AnimatePresence>
      {mediaItem && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-slate-950"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:px-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{mediaItem.category}</p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">{mediaItem.projectTitle}</p>
                <p className="text-xs text-slate-400">
                  {mediaItem.index + 1} / {mediaItem.total}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="relative flex min-h-[62vh] items-center justify-center bg-black">
              {isVideoUrl(mediaItem.url) ? (
                <video controls className="max-h-[78vh] w-full" autoPlay>
                  <source src={mediaItem.url} />
                </video>
              ) : (
                <img src={mediaItem.url} alt={mediaItem.projectTitle} className="max-h-[78vh] w-full object-contain" loading="eager" />
              )}

              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-lg text-white transition hover:bg-black/65"
                    aria-label="Previous media"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-lg text-white transition hover:bg-black/65"
                    aria-label="Next media"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaModal;
