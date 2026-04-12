import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';
import api from '../services/api';

const baseForm = {
  name: '',
  location: '',
  rating: 5,
  text: '',
  isPublished: true
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(baseForm);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/reviews/admin');
      setReviews(data);
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const resetForm = () => {
    setForm(baseForm);
    setEditingId(null);
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      location: item.location || '',
      rating: item.rating,
      text: item.text,
      isPublished: item.isPublished !== false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const payload = {
      name: form.name,
      location: form.location,
      rating: Number(form.rating),
      text: form.text,
      isPublished: form.isPublished
    };

    try {
      if (editingId) {
        await api.put(`/reviews/${editingId}`, payload);
        setStatus('Review updated successfully.');
      } else {
        await api.post('/reviews', payload);
        setStatus('Review added successfully.');
      }
      resetForm();
      fetchReviews();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <section className="space-y-6 lg:p-6 lg:pt-0">
      <h1 className="text-2xl font-bold text-brand-navy">Manage Reviews</h1>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">{editingId ? 'Edit Review' : 'Add Review'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Reviewer Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <input
            placeholder="Location (Optional)"
            value={form.location}
            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-brand-navy">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm((prev) => ({ ...prev, rating: e.target.value }))}
              required
              className="rounded-md border border-brand-border px-3 py-2 text-sm w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-brand-navy">Published</label>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
              className="rounded border-brand-border"
            />
          </div>
        </div>
        <textarea
          placeholder="Review Text"
          value={form.text}
          onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
          required
          rows="4"
          className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
        />
        
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Update Review' : 'Save Review'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-navy"
            >
              Cancel Edit
            </button>
          )}
        </div>
        {status && <p className="text-sm text-slate-600">{status}</p>}
      </form>

      <div className="space-y-4">
        {loading && <AppLoader label="Loading reviews..." />}
        {reviews.length === 0 && !loading && <p className="text-sm text-slate-500">No reviews found.</p>}
        {reviews.map((item) => (
          <article key={item._id} className="card space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  {item.name}
                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.rating} / 5 Stars
                  </span>
                  {!item.isPublished && (
                    <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Hidden
                    </span>
                  )}
                </h3>
                {item.location && <p className="text-xs uppercase tracking-wide text-slate-500 mt-1">{item.location}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded border border-brand-border px-3 py-1 text-xs font-semibold text-brand-navy hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600 italic">"{item.text}"</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminReviewsPage;
