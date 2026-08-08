import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MediaModal from '../MediaModal';
import { slideUp, staggerContainer, viewport } from '../../utils/motion';
import api from '../../services/api';
import AccordionGallery from '../AccordionGallery';

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

const fallbackTitles = [
  'Premium Sliding Doors',
  'Villa Casement Windows',
  'Arch Frame Windows',
  'Luxury Glass Balconies',
  'Modern uPVC Doors',
  'Custom Arch Designs',
  'Bi-Fold Patio Doors',
  'Double Glazed Windows'
];

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data && data.length > 0) {
          setGalleryItems(data);
        } else {
          setGalleryItems(fallbackImages.map((img, i) => ({ image: img, title: fallbackTitles[i] || '' })));
        }
      } catch (error) {
        setGalleryItems(fallbackImages.map((img, i) => ({ image: img, title: fallbackTitles[i] || '' })));
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const displayItems = galleryItems.slice(0, 5);
  const displayImages = displayItems.map((item) => item.image);
  const accordionItems = displayItems.map((item, index) => {
    const title = item.title || fallbackTitles[index] || `Finique Work 0${index + 1}`;
    return {
      image: item.image,
      label: title,
      alt: title
    };
  });

  return (
    <motion.section
      className="py-16 lg:py-24"
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
          {!loading && (
            <AccordionGallery
              items={accordionItems}
              defaultIndex={2}
              expandRatio={0.68}
              trigger="hover"
              onZoomClick={(index) => setActiveMediaIndex(index)}
              height={480}
              accentColor="#000745"
            />
          )}
        </motion.div>
      </div>

      {activeMediaIndex !== null && (
        <MediaModal
          mediaItem={{
            url: displayImages[activeMediaIndex],
            category: 'Project Gallery',
            projectTitle: displayItems[activeMediaIndex]?.title || fallbackTitles[activeMediaIndex] || `Project 0${activeMediaIndex + 1}`,
            index: activeMediaIndex,
            total: displayImages.length
          }}
          canNavigate={true}
          onNext={() => setActiveMediaIndex((prev) => (prev + 1) % displayImages.length)}
          onPrev={() => setActiveMediaIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
          onClose={() => setActiveMediaIndex(null)}
        />
      )}
    </motion.section>
  );
};

export default GallerySection;
