import { useEffect, useState } from 'react';

const WebsitePreloader = ({ isVisible, onComplete }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const imageUrls = [0, 1, 2, 3, 4, 5, 6].map(idx => `/assets/logo_letter_${idx}.png`);
    let loadedCount = 0;
    let timer = null;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        // Add a tiny delay to ensure smooth transition
        setTimeout(() => {
          setImagesLoaded(true);
        }, 50);

        // Wave animation finishes at 2.32s (0.72s stagger + 1.6s duration)
        // Wait 2.32s + 2.0s static pause = 4.32 seconds (4320ms)
        timer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 4320);
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

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white">
      {imagesLoaded ? (
        <div className="flex items-center justify-center h-14 mb-2 gap-0">
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
            <img
              key={idx}
              src={`/assets/logo_letter_${idx}.png`}
              alt=""
              className="preloader-letter h-14 w-auto object-contain animate-once"
              style={{ animationDelay: `${idx * 0.12}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="h-14 mb-2" />
      )}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-slate-100" />
    </div>
  );
};

export default WebsitePreloader;
