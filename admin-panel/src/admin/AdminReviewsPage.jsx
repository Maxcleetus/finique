import { useEffect, useState } from 'react';
import api from '../services/api';

const baseForm = {
  name: '',
  location: '',
  designation: '',
  rating: 5,
  text: '',
  imageUrl: '',
  isPublished: true
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(baseForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reorderMode, setReorderMode] = useState(false);
  const [orderedReviews, setOrderedReviews] = useState([]);

  const startReorder = () => {
    setOrderedReviews([...reviews]);
    setReorderMode(true);
  };

  const moveReview = (index, direction) => {
    const newOrder = [...orderedReviews];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setOrderedReviews(newOrder);
  };

  const saveOrder = async () => {
    try {
      const order = orderedReviews.map((r) => r._id);
      await api.put('/reviews/reorder', { order });
      setStatus('Review order updated successfully.');
      setReorderMode(false);
      fetchReviews();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to update order');
    }
  };

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

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const resetForm = () => {
    setForm(baseForm);
    setImageFile(null);
    setFileInputKey((prev) => prev + 1);
    setEditingId(null);
  };

  const startEdit = (review) => {
    setEditingId(review._id);
    setForm({
      name: review.name || '',
      location: review.location || '',
      designation: review.designation || '',
      rating: Number(review.rating) || 5,
      text: review.text || '',
      imageUrl: review.imageUrl || '',
      isPublished: review.isPublished !== false
    });
    setImageFile(null);
    setFileInputKey((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const payload = new FormData();
    payload.append('name', form.name);
    payload.append('location', form.location);
    payload.append('designation', form.designation);
    payload.append('rating', String(form.rating));
    payload.append('text', form.text);
    payload.append('isPublished', String(form.isPublished));
    if (imageFile) payload.append('image', imageFile);

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
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const removeImage = async (id) => {
    try {
      await api.delete(`/reviews/${id}/image`);
      if (editingId === id) {
        setForm((prev) => ({ ...prev, imageUrl: '' }));
      }
      fetchReviews();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to remove review image');
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Manage Reviews</h1>
        {!reorderMode && reviews.length > 1 && (
          <button
            onClick={startReorder}
            className="rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-all"
          >
            Arrange Order
          </button>
        )}
      </div>

      {reorderMode ? (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-navy">Arrange Review Order</h2>
            <div className="flex gap-2">
              <button
                onClick={saveOrder}
                className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90 transition-all"
              >
                Save Order
              </button>
              <button
                onClick={() => setReorderMode(false)}
                className="rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500">Use the Up and Down arrows to arrange how reviews appear on the website.</p>
          <div className="divide-y divide-brand-border border border-brand-border rounded-md overflow-hidden">
            {orderedReviews.map((review, index) => (
              <div key={review._id} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  {review.imageUrl && (
                    <img src={review.imageUrl} alt={review.name} className="h-10 w-10 rounded object-cover border border-brand-border" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{review.name}</p>
                    <p className="text-xs text-slate-500">
                      {[review.designation, review.location].filter(Boolean).join(' | ') || 'No details set'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={index === 0}
                    onClick={() => moveReview(index, -1)}
                    className="p-2 border border-brand-border rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    disabled={index === orderedReviews.length - 1}
                    onClick={() => moveReview(index, 1)}
                    className="p-2 border border-brand-border rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Move Down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="card space-y-4">
            <h2 className="text-lg font-bold text-brand-navy">{editingId ? 'Edit Review' : 'Add Review'}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                placeholder="Client name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              />
              <input
                placeholder="Designation (e.g. Home Owner, Project Manager)"
                value={form.designation}
                onChange={(e) => setForm((prev) => ({ ...prev, designation: e.target.value }))}
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              />
              <input
                placeholder="Location (e.g. Thrissur, Kochi)"
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-[180px,1fr]">
              <select
                value={form.rating}
                onChange={(e) => setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
              <label className="flex items-center gap-2 rounded-md border border-brand-border px-3 py-2 text-sm text-brand-navy">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
                />
                Show on website
              </label>
            </div>
            <textarea
              rows="4"
              value={form.text}
              onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
              placeholder="Review quote"
              required
              className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
            />
            <div className="grid gap-4 md:grid-cols-[1fr,180px]">
              <label className="block rounded-md border border-brand-border px-3 py-3 text-sm">
                <span className="mb-2 block font-semibold text-brand-navy">Client background image</span>
                <input
                  key={fileInputKey}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm"
                />
                {editingId && form.imageUrl && !imageFile && (
                  <span className="mt-2 block text-xs text-slate-500">Upload a new image to replace the current one.</span>
                )}
              </label>
              {(imagePreview || form.imageUrl) && (
                <img
                  src={imagePreview || form.imageUrl}
                  alt="Review background preview"
                  className="h-28 w-full rounded-md border border-brand-border object-cover"
                  loading="lazy"
                />
              )}
            </div>
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
            {loading && <p className="text-sm text-slate-500">Loading reviews...</p>}
            {reviews.map((review) => (
              <article key={review._id} className="card space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-bold text-brand-navy">{review.name}</p>
                    {review.designation && <p className="text-xs font-semibold text-slate-600 mb-0.5">{review.designation}</p>}
                    <p className="text-xs uppercase tracking-wide text-slate-500">{review.location || 'Location not set'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        review.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {review.isPublished ? 'Published' : 'Hidden'}
                    </span>
                    <button
                      type="button"
                      onClick={() => startEdit(review)}
                      className="rounded border border-brand-border px-3 py-1 text-xs font-semibold text-brand-navy"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(review._id)}
                      className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`${review._id}-star-${index + 1}`} className={index < review.rating ? '' : 'text-slate-200'}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-600">{review.text}</p>
                {review.imageUrl && (
                  <div className="max-w-xs rounded-md border border-brand-border p-2">
                    <img src={review.imageUrl} alt={review.name} className="h-28 w-full rounded object-cover" loading="lazy" />
                    <button
                      type="button"
                      onClick={() => removeImage(review._id)}
                      className="mt-2 w-full rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AdminReviewsPage;
