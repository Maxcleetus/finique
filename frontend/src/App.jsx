import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLoader from './components/AppLoader';
import PublicLayout from './layouts/PublicLayout';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

const App = () => {
  return (
    <Suspense
      fallback={
        <PublicLayout>
          <div className="container-shell py-14">
            <AppLoader label="Loading page..." />
          </div>
        </PublicLayout>
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
  );
};

export default App;
