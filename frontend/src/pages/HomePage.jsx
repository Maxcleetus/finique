import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import api from '../services/api';
import { siteConfig, buildCanonicalUrl, toAbsoluteUrl } from '../utils/siteSeo';

// Component Imports
import HeroSection from '../components/home/HeroSection';
import FounderSection from '../components/home/FounderSection';
import SocialConnectSection from '../components/home/SocialConnectSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import GallerySection from '../components/home/GallerySection';
import ReviewsSection from '../components/home/ReviewsSection';
import FaqSection from '../components/home/FaqSection';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const { data } = await api.get('/products', { params: { view: 'card' } });
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setProductsLoading(false);
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

    fetchProducts();
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
      <SocialConnectSection />
      <ReviewsSection reviews={reviews} loading={reviewsLoading} />
      <GallerySection />
      <FeaturedProducts featured={products} loading={productsLoading} />
      <FaqSection />
    </main>
  );
};

export default HomePage;
