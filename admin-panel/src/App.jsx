import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboardPage from './admin/AdminDashboardPage';
import AdminEnquiriesPage from './admin/AdminEnquiriesPage';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminProductsPage from './admin/AdminProductsPage';
import AdminProjectsPage from './admin/AdminProjectsPage';
import AdminReviewsPage from './admin/AdminReviewsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
