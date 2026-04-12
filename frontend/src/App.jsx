import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLoader from './components/AppLoader';
import WebsitePreloader from './components/WebsitePreloader';
import PublicLayout from './layouts/PublicLayout';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));


const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const MIN_PRELOADER_MS = 2000;

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const preloaderStart = Date.now();
    let hasCompleted = false;
    let hideTimer = null;

    const completePreloader = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      const elapsed = Date.now() - preloaderStart;
      const remaining = Math.max(0, MIN_PRELOADER_MS - elapsed);
      hideTimer = setTimeout(() => {
        setShowPreloader(false);
        window.__finiquePreloaderCompleteAt = Date.now();
        window.dispatchEvent(new CustomEvent('finique:preloader-complete'));
      }, remaining);
    };

    if (document.readyState === 'complete') {
      completePreloader();
    } else {
      window.addEventListener('load', completePreloader, { once: true });
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      window.removeEventListener('load', completePreloader);
    };
  }, []);

  return (
    <>
      <WebsitePreloader isVisible={showPreloader} />
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
