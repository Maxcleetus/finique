import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      }
    };
    fetchStats();
  }, []);

  if (!stats && !error) return <div className="text-sm text-slate-600">Loading dashboard...</div>;
  if (error) return <div className="text-sm text-red-700">{error}</div>;

  const cards = [
    { label: 'Total Products', value: stats.totalProducts },
    { label: 'Total Projects', value: stats.totalProjects },
    { label: 'Total Enquiries', value: stats.totalEnquiries },
    { label: 'New Enquiries', value: stats.newEnquiries }
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-navy">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="card">
            <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-brand-navy">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
