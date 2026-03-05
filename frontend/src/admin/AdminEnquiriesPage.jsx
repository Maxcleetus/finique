import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';
import api from '../services/api';

const statuses = ['new', 'contacted', 'closed'];

const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/enquiries');
      setEnquiries(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiries/${id}/status`, { status });
      fetchEnquiries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update enquiry');
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Enquiries</h1>
      {loading && <AppLoader label="Loading enquiries..." />}
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-brand-border text-brand-navy">
              <th className="py-3">Name</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((item) => (
              <tr key={item._id} className="border-b border-brand-border/70 align-top">
                <td className="py-3">{item.name}</td>
                <td>
                  {item.phone}
                  <br />
                  {item.email}
                </td>
                <td className="max-w-sm">{item.message}</td>
                <td>{item.productId?.title || '-'}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className="rounded border border-brand-border px-2 py-1"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminEnquiriesPage;
