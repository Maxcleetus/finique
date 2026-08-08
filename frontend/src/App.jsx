import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLoader from './components/AppLoader';
import ScrollToTop from './components/ScrollToTop';
import WebsitePreloader from './components/WebsitePreloader';
import PublicLayout from './layouts/PublicLayout';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import Lenis from 'lenis';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectGalleryPage = lazy(() => import('./pages/ProjectGalleryPage'));


const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE !== 'false';

const MainWebsite = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    window.__finiquePreloaderCompleteAt = Date.now();
    window.dispatchEvent(new CustomEvent('finique:preloader-complete'));
  };

  useEffect(() => {
    if (showPreloader) return;

    const lenis = new Lenis({
      duration: 0.9, // faster response time (less floaty)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // lower multiplier for controlled scrolling distance
      touchMultiplier: 1.5,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, [showPreloader]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence>
        {showPreloader && (
          <WebsitePreloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-brand-slate py-14">
            <AppLoader label="Loading..." />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout>
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/products"
            element={
              <PublicLayout>
                <ProductsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <PublicLayout>
                <ProductDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicLayout>
                <ProjectsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery/:id"
            element={
              <PublicLayout>
                <ProjectGalleryPage />
              </PublicLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (MAINTENANCE_MODE ? <UnderDevelopmentPage /> : <MainWebsite />);

export default App;
