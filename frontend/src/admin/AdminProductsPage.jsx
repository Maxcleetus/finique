import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';
import api from '../services/api';

const baseForm = {
  title: '',
  category: '',
  description: ''
};

const defaultSpecifications = [
  { key: 'Profile', value: 'uPVC' },
  { key: 'Warranty', value: '10 Years' }
];

const normalizeSpecifications = (specifications = {}) => {
  const entries = Object.entries(specifications);
  if (!entries.length) return defaultSpecifications;
  return entries.map(([key, value]) => ({ key, value: String(value ?? '') }));
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(baseForm);
  const [specifications, setSpecifications] = useState(defaultSpecifications);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm(baseForm);
    setSpecifications(defaultSpecifications);
    setImages([]);
    setVideo(null);
    setEditingId(null);
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description
    });
    setSpecifications(normalizeSpecifications(item.specifications || {}));
  };

  const updateSpecification = (index, field, value) => {
    setSpecifications((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addSpecificationRow = () => {
    setSpecifications((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeSpecificationRow = (index) => {
    setSpecifications((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const specificationPayload = specifications.reduce((acc, item) => {
      const key = item.key.trim();
      const value = item.value.trim();
      if (key) acc[key] = value;
      return acc;
    }, {});

    const payload = new FormData();
    payload.append('title', form.title);
    payload.append('category', form.category);
    payload.append('description', form.description);
    payload.append('specifications', JSON.stringify(specificationPayload));
    Array.from(images).forEach((file) => payload.append('images', file));
    if (video) payload.append('video', video);

    try {
      if (editingId) {
        const { data } = await api.put(`/products/${editingId}`, payload);
        const warningText = data?.warnings?.length ? ` Warnings: ${data.warnings.join(' | ')}` : '';
        setStatus(`Product updated successfully.${warningText}`);
      } else {
        const { data } = await api.post('/products', payload);
        const warningText = data?.warnings?.length ? ` Warnings: ${data.warnings.join(' | ')}` : '';
        setStatus(`Product added successfully.${warningText}`);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const removeMedia = async (id, url) => {
    try {
      await api.delete(`/products/${id}/media`, { data: { url } });
      fetchProducts();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to remove media');
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Manage Products</h1>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">{editingId ? 'Edit Product' : 'Add Product'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            required
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          required
          rows="4"
          className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
        />
        <div className="space-y-3 rounded-md border border-brand-border p-3">
          <p className="text-sm font-semibold text-brand-navy">Technical Specifications</p>
          {specifications.map((item, index) => (
            <div key={`${index}-${item.key}`} className="grid gap-2 md:grid-cols-[1fr,1fr,auto]">
              <input
                placeholder="Field (e.g. Profile)"
                value={item.key}
                onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              />
              <input
                placeholder="Value (e.g. uPVC)"
                value={item.value}
                onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                className="rounded-md border border-brand-border px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeSpecificationRow(index)}
                className="rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecificationRow}
            className="rounded-md border border-brand-border px-3 py-2 text-xs font-semibold text-brand-navy"
          >
            Add Specification
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} className="text-sm" />
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] || null)} className="text-sm" />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Update Product' : 'Save Product'}
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
        {loading && <AppLoader label="Loading products..." />}
        {products.map((item) => (
          <article key={item._id} className="card space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-brand-navy">{item.title}</h3>
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded border border-brand-border px-3 py-1 text-xs font-semibold text-brand-navy"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            {item.images?.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {item.images.map((url) => (
                  <div key={url} className="rounded-md border border-brand-border p-2">
                    <img src={url} alt={item.title} className="h-24 w-full rounded object-cover" loading="lazy" />
                    <button
                      type="button"
                      onClick={() => removeMedia(item._id, url)}
                      className="mt-2 w-full rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {item.videoUrl && (
              <div className="max-w-md rounded-md border border-brand-border p-2">
                <video controls className="h-40 w-full rounded bg-black object-cover">
                  <source src={item.videoUrl} />
                </video>
                <button
                  type="button"
                  onClick={() => removeMedia(item._id, item.videoUrl)}
                  className="mt-2 w-full rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700"
                >
                  Remove Video
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminProductsPage;
