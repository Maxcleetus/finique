import { motion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import MediaModal from '../MediaModal';
import api from '../../services/api';
import { useInfiniteMarquee } from '../../utils/useInfiniteMarquee';

const fallbackImages = [
  'https://images.unsplash.com/photo-1600607687930-cebc5a882aed?w=1200',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
  'https://images.unsplash.com/photo-1600585153205-0aacf645f0fb?w=1200',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200',
];

const defaultTitles = [
  "uPVC Villa Windows",
  "uPVC Casement Windows",
  "uPVC Sliding Windows",
  "uPVC Tilt & Turn Windows",
  "uPVC Arch Windows",
  "uPVC Combination Windows",
  "uPVC Bay Windows",
  "uPVC Ventilators"
];

const GalleryCard = ({ item, idx, x, windowWidth, onClick, itemsLength }) => {
  const isMobile = windowWidth < 640;
  const cardWidth = isMobile ? 240 : 300;
  const gap = 24;
  const cardStart = idx * (cardWidth + gap);
  const cardHalfWidth = cardWidth / 2;

  // Track the center point of the card relative to the scrolling track
  const relativeX = useTransform(x, (latestX) => {
    return latestX + cardStart + cardHalfWidth;
  });

  const centerX = windowWidth / 2;

  // Vertical drop offset (curves down as it approaches the left/right edges)
  const y = useTransform(relativeX, (val) => {
    const dist = val - centerX;
    const maxDist = windowWidth / 2 || 600;
    const ratio = Math.min(1, Math.abs(dist) / maxDist);
    return ratio * ratio * 32; // Drop up to 32px at screen boundary
  });

  // Angular tilt (rotates inwards to simulate a cylindrical curve)
  const rotate = useTransform(relativeX, (val) => {
    const dist = val - centerX;
    const maxDist = windowWidth / 2 || 600;
    const ratio = dist / maxDist; // Range [-1, 1]
    return ratio * -5; // Tilt up to 5 degrees inwards
  });

  // Scale factor (slightly smaller towards the edges for a 3D depth effect)
  const scale = useTransform(relativeX, (val) => {
    const dist = val - centerX;
    const maxDist = windowWidth / 2 || 600;
    const ratio = Math.min(1, Math.abs(dist) / maxDist);
    return 1 - ratio * 0.08; // Downscale by up to 8%
  });

  const originalIndex = idx % itemsLength;
  const title = item.title || defaultTitles[originalIndex % defaultTitles.length];

  return (
    <motion.div
      style={{ y, rotate, scale }}
      onClick={() => onClick(originalIndex)}
      className="relative w-[240px] sm:w-[300px] h-[320px] sm:h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-lg shrink-0 bg-slate-100 transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={item.image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 pointer-events-none"
        loading="lazy"
      />
      {/* Bottom gradient overlay to make text highly readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end justify-center p-6 text-center">
        <span className="text-white font-gilroy font-extrabold text-base sm:text-lg tracking-wide group-hover:translate-y-[-4px] transition-transform duration-300">
          {title}
        </span>
      </div>
    </motion.div>
  );
};

const GallerySlider = ({ items }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!items || items.length === 0) return null;

  // We want to loop the items smoothly. To prevent gaps, we ensure at least 10 items for the loop.
  const minItemsNeeded = 10;
  const multiplier = Math.max(1, Math.ceil(minItemsNeeded / items.length));
  const baseItems = Array(multiplier).fill(items).flat();
  const doubledItems = [...baseItems, ...baseItems];

  const {
    containerRef,
    x,
    halfWidth,
    dragHandlers,
    hoverHandlers,
  } = useInfiniteMarquee({
    speed: 0.6, // slow and smooth scroll
    direction: 1, // leftward
    pauseOnHover: true,
    dependency: items.length,
  });

  return (
    <>
      <div
        ref={containerRef}
        className="w-full overflow-hidden py-10 cursor-grab active:cursor-grabbing select-none relative z-10"
        {...hoverHandlers}
      >
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -halfWidth, right: 0 }}
          dragElastic={0.15}
          {...dragHandlers}
          className="flex gap-6 min-w-max px-4"
        >
          {doubledItems.map((item, idx) => (
            <GalleryCard
              key={`${item.image}-${idx}`}
              item={item}
              idx={idx}
              x={x}
              windowWidth={windowWidth}
              onClick={setActiveMediaIndex}
              itemsLength={items.length}
            />
          ))}
        </motion.div>
      </div>

      {activeMediaIndex !== null && (
        <MediaModal
          mediaItem={{
            url: items[activeMediaIndex].image,
            category: 'Product Styles',
            projectTitle: items[activeMediaIndex].title || defaultTitles[activeMediaIndex % defaultTitles.length],
            index: activeMediaIndex,
            total: items.length
          }}
          canNavigate={true}
          onNext={() => setActiveMediaIndex((prev) => (prev + 1) % items.length)}
          onPrev={() => setActiveMediaIndex((prev) => (prev - 1 + items.length) % items.length)}
          onClose={() => setActiveMediaIndex(null)}
        />
      )}
    </>
  );
};

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data && data.length > 0) {
          setGalleryItems(data);
        } else {
          setGalleryItems(fallbackImages.map((src, i) => ({
            image: src,
            title: defaultTitles[i % defaultTitles.length]
          })));
        }
      } catch (error) {
        setGalleryItems(fallbackImages.map((src, i) => ({
          image: src,
          title: defaultTitles[i % defaultTitles.length]
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="relative bg-[#f5f2e9] pt-24 pb-28 overflow-hidden">
      {/* Top curved mask overlay */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none fill-white"
        preserveAspectRatio="none"
      >
        <path d="M0 120 C 360 20, 1080 20, 1440 120 L 1440 0 L 0 0 Z" />
      </svg>

      <div className="container-shell relative z-10 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-gilroy font-extrabold text-brand-navy tracking-tight">
            Gallery
          </h3>
        </div>
      </div>

      {!loading && <GallerySlider items={galleryItems} />}

      {/* Bottom curved mask overlay */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-auto z-20 pointer-events-none fill-white"
        preserveAspectRatio="none"
      >
        <path d="M0 0 C 360 100, 1080 100, 1440 0 L 1440 120 L 0 120 Z" />
      </svg>
    </section>
  );
};

export default GallerySection;
