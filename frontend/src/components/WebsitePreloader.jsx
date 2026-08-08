import { useEffect, useState } from 'react';

const WebsitePreloader = ({ isVisible }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const imageUrls = [0, 1, 2, 3, 4, 5, 6].map(idx => `/assets/logo_letter_${idx}.png`);
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        // Add a tiny delay to ensure smooth transition
        setTimeout(() => {
          setImagesLoaded(true);
        }, 50);
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
  }, [isVisible]);

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
