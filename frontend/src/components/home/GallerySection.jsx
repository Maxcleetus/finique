import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MediaModal from '../MediaModal';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';
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

const GallerySlider = ({ images }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);

  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half).map((src, i) => ({ src, originalIndex: i }));
  const row2 = images.slice(half).map((src, i) => ({ src, originalIndex: i + half }));

  const MarqueeRow = ({ items, direction = 1 }) => {
    if (!items || items.length === 0) return null;
    const minItemsNeededForHalf = 10; 
    const halfMultiplier = Math.max(1, Math.ceil(minItemsNeededForHalf / items.length));
    const safeHalf = Array(halfMultiplier).fill(items).flat();
    const renderItems = [...safeHalf, ...safeHalf]; 
    
    const {
      containerRef,
      x,
      halfWidth,
      dragHandlers,
      hoverHandlers,
    } = useInfiniteMarquee({
      speed: 0.6, // slow and smooth scroll
      direction: direction,
      pauseOnHover: true,
      dependency: items.length,
    });

    return (
      <div 
        ref={containerRef}
        className="w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none"
        {...hoverHandlers}
      >
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -halfWidth, right: 0 }}
          dragElastic={0.15}
          {...dragHandlers}
          className="flex gap-4 min-w-max pr-4"
        >
          {renderItems.map((item, i) => (
            <div 
              key={`${item.originalIndex}-${i}`} 
              onClick={() => setActiveMediaIndex(item.originalIndex)}
              className="cursor-pointer w-[260px] sm:w-[350px] lg:w-[450px] h-[180px] sm:h-[250px] lg:h-[320px] shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 relative group/img"
            >
              <img 
                src={item.src} 
                alt={`Project Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 pointer-events-none" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-300 group-hover/img:bg-brand-navy/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-3xl space-y-2">
        <MarqueeRow items={row1} direction={1} />
        {row2.length > 0 && <MarqueeRow items={row2} direction={-1} />}
      </div>
      
      {activeMediaIndex !== null && (
        <MediaModal
          mediaItem={{
            url: images[activeMediaIndex],
            category: 'Project Gallery',
            projectTitle: `Featured Project 0${activeMediaIndex + 1}`,
            index: activeMediaIndex,
            total: images.length
          }}
          canNavigate={true}
          onNext={() => setActiveMediaIndex((prev) => (prev + 1) % images.length)}
          onPrev={() => setActiveMediaIndex((prev) => (prev - 1 + images.length) % images.length)}
          onClose={() => setActiveMediaIndex(null)}
        />
      )}
    </>
  );
};

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data && data.length > 0) {
          setGalleryImages(data.map((item) => item.image));
        } else {
          setGalleryImages(fallbackImages);
        }
      } catch (error) {
        setGalleryImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <motion.section
      className=" py-16 lg:py-24"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="container-shell">
        <motion.div className="text-center max-w-3xl mx-auto mb-12" variants={slideUp}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy mb-2">Our Work</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">Project Gallery</h3>
        </motion.div>
        <motion.div variants={slideUp}>
          {!loading && <GallerySlider images={galleryImages} />}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GallerySection;
