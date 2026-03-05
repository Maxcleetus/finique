import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../components/AppLoader';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import api from '../services/api';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-brand-slate px-4">
      <Seo title="Admin Login" />
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-brand-border bg-white p-6 shadow-panel">
        <h1 className="text-xl font-bold text-brand-navy">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-600">Secure access for FINIQUE administrators.</p>

        <div className="mt-5 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-90"
          >
            {loading ? <AppLoader label="Signing in..." inline className="[&>span:last-child]:text-white [&>span:first-child]:border-white/80" /> : 'Sign In'}
          </button>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default AdminLoginPage;
