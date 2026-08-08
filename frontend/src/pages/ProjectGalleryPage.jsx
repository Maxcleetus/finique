import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLoader from '../components/AppLoader';
import MediaModal from '../components/MediaModal';
import Masonry from '../components/Masonry';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const heightPresets = [500, 700, 600, 800, 550, 750, 650];

const ProjectGalleryPage = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/gallery/${id}`);
        setGalleryItem(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [id]);

  // Combine cover and sub-gallery photos for the masonry
  const masonryItems = galleryItem
    ? [
        {
          id: 'cover',
          img: galleryItem.image,
          url: galleryItem.image,
          height: 800 // Make the primary project cover taller & prominent
        },
        ...(galleryItem.galleryImages || []).map((imgUrl, idx) => ({
          id: `sub-${idx}`,
          img: imgUrl,
          url: imgUrl,
          height: heightPresets[idx % heightPresets.length]
        }))
      ]
    : [];

  return (
    <motion.section
      className="container-shell py-14 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Seo 
        title={galleryItem?.title ? `${galleryItem.title} - Gallery` : 'Project Gallery'} 
        description="View high-resolution installation photos of this premium uPVC project." 
      />

      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-cyan-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {loading && (
        <div className="py-20 flex justify-center">
          <AppLoader label="Loading project gallery..." />
        </div>
      )}

      {!loading && error && (
        <div className="py-20 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
          <Link to="/" className="mt-4 inline-block text-sm text-brand-navy underline">Go back home</Link>
        </div>
      )}

      {!loading && !error && galleryItem && (
        <div className="space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">Project Gallery</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
              {galleryItem.title || 'Untitled Installation'}
            </h1>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore the detail, engineering, and craftsmanship of this finished installation. Click any photo below to inspect in high-resolution detail.
            </p>
          </div>

          <div className="w-full relative min-h-[500px]">
            {masonryItems.length > 0 ? (
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.7}
                stagger={0.04}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                blurToFocus={true}
                colorShiftOnHover={false}
                onItemClick={(item, index) => {
                  setSelectedPhotoIndex(index);
                }}
              />
            ) : (
              <p className="text-slate-400 text-sm">No images in this project gallery.</p>
            )}
          </div>
        </div>
      )}

      {selectedPhotoIndex !== null && masonryItems[selectedPhotoIndex] && (
        <MediaModal
          mediaItem={{
            url: masonryItems[selectedPhotoIndex].img,
            category: 'Project Gallery',
            projectTitle: galleryItem?.title || 'Project Gallery',
            index: selectedPhotoIndex,
            total: masonryItems.length
          }}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={() => setSelectedPhotoIndex((prev) => (prev + 1) % masonryItems.length)}
          onPrev={() => setSelectedPhotoIndex((prev) => (prev - 1 + masonryItems.length) % masonryItems.length)}
          canNavigate={masonryItems.length > 1}
        />
      )}
    </motion.section>
  );
};

export default ProjectGalleryPage;
