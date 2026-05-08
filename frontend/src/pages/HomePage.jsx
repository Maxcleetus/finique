import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';
import Seo from '../components/Seo';
import api from '../services/api';
import { siteConfig, buildCanonicalUrl, toAbsoluteUrl } from '../utils/siteSeo';

// Component Imports
import HeroSection from '../components/home/HeroSection';
import FounderSection from '../components/home/FounderSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import GallerySection from '../components/home/GallerySection';
import PillarsSection from '../components/home/PillarsSection';
import WhyKeralaSection from '../components/home/WhyKeralaSection';
import ProcessSection from '../components/home/ProcessSection';
import ReviewsSection from '../components/home/ReviewsSection';
import FaqSection from '../components/home/FaqSection';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setFeaturedLoading(true);
      try {
        const { data } = await api.get('/products/featured', { params: { view: 'card' } });
        setFeatured(data);
      } catch {
        setFeatured([]);
      } finally {
        setFeaturedLoading(false);
      }
    };
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const { data } = await api.get('/reviews');
        setReviews(data.slice(0, 6)); 
      } catch {
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    
    fetchFeatured();
    fetchReviews();
  }, []);

  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${siteConfig.name} Home`,
      url: buildCanonicalUrl('/'),
      description: siteConfig.defaultDescription
    }
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <Seo
        title="Best uPVC Windows Kerala | VEKA Certified | Finique Windows"
        description="Finique Windows brings German-engineered VEKA uPVC systems to Kerala. Beat the monsoon, block the heat, and silence the street. Zero maintenance. 50+ year lifespan."
        image={toAbsoluteUrl('/assets/logo.png')}
        schema={homeSchema}
        keywords="uPVC windows Kerala, VEKA uPVC Kerala, soundproof windows Kochi, heat resistant windows Kerala, uPVC vs aluminium windows, best windows for Kerala climate, FINIQUE"
      />

      <HeroSection />
      <FounderSection />
      <FeaturedProducts featured={featured} loading={featuredLoading} />
      <GallerySection />
      <PillarsSection />
      <WhyKeralaSection />
      <ProcessSection />
      <ReviewsSection reviews={reviews} loading={reviewsLoading} />
      <FaqSection />
    </main>
  );
};

export default HomePage;
