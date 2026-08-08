import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WebsitePreloader = ({ onComplete }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const imageUrls = [0, 1, 2, 3, 4, 5, 6].map(idx => `/assets/logo_letter_${idx}.png`);
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad; // Avoid hanging if an asset fails to load
      }
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    let animTimer = null;
    let completeTimer = null;

    // Wait 150ms after mounting/rendering the images to let the browser layout and paint them fully
    animTimer = setTimeout(() => {
      setAnimate(true);

      // Wave animation finishes at 2.32s (0.72s stagger + 1.6s duration)
      // Wait 2.32s + 2.0s static pause = 4.32 seconds (4320ms)
      completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 4320);
    }, 150);

    return () => {
      if (animTimer) clearTimeout(animTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [imagesLoaded, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white"
    >
      {imagesLoaded ? (
        <div className="flex items-center justify-center h-14 mb-2 gap-0">
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
            <img
              key={idx}
              src={`/assets/logo_letter_${idx}.png`}
              alt=""
              className={`preloader-letter h-14 w-auto object-contain ${animate ? 'animating' : ''}`}
              style={{ animationDelay: `${idx * 0.12}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="h-14 mb-2" />
      )}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-slate-100" />
    </motion.div>
  );
};

export default WebsitePreloader;
