import { useEffect, useState } from 'react';
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
      {loading && <p className="text-sm text-slate-500">Loading enquiries...</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-brand-border text-brand-navy">
              <th className="py-3">Name</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Product</th>
              <th>Attachment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((item) => (
              <tr key={item._id} className="border-b border-brand-border/70 align-top">
                <td className="py-3 font-semibold text-brand-navy">{item.name}</td>
                <td>
                  {item.phone}
                  {item.email && (
                    <>
                      <br />
                      <span className="text-slate-500 text-xs">{item.email}</span>
                    </>
                  )}
                </td>
                <td className="max-w-sm whitespace-pre-wrap">{item.message || <span className="text-slate-400 italic">No message</span>}</td>
                <td>{item.productId?.title || '-'}</td>
                <td>
                  {item.attachment ? (
                    <a
                      href={item.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 border border-cyan-150 hover:bg-cyan-100 hover:text-cyan-800 transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View File
                    </a>
                  ) : (
                    <span className="text-slate-400 italic text-xs">No attachment</span>
                  )}
                </td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className="rounded border border-brand-border px-2 py-1 text-xs font-semibold bg-white"
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
