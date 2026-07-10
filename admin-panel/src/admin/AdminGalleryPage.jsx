import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminGalleryPage = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/gallery');
      setItems(data);
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatus('Please select an image file first.');
      return;
    }

    setStatus('');
    setUploading(true);

    const payload = new FormData();
    payload.append('title', title);
    payload.append('image', imageFile);

    try {
      await api.post('/gallery', payload);
      setStatus('Image uploaded to gallery successfully.');
      setTitle('');
      setImageFile(null);
      setFileInputKey((prev) => prev + 1);
      fetchGallery();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image from the gallery?')) {
      return;
    }

    try {
      await api.delete(`/gallery/${id}`);
      setStatus('Image deleted from gallery.');
      fetchGallery();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete gallery item');
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Manage Project Gallery</h1>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Upload New Gallery Image</h2>
        
        <div className="grid gap-4 md:grid-cols-2 items-end">
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-brand-navy">Image Title (Optional)</span>
            <input
              type="text"
              placeholder="e.g. Modern Sliding Window"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-brand-navy">Select Image</span>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </label>
        </div>

        {imagePreview && (
          <div className="max-w-xs rounded-md border border-brand-border p-2">
            <img src={imagePreview} alt="Preview" className="h-44 w-full rounded object-cover" loading="lazy" />
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={uploading}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {status && <p className="text-sm text-slate-600">{status}</p>}
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Gallery Images ({items.length})</h2>
        {loading && <p className="text-sm text-slate-500">Loading gallery items...</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-slate-400">No images in the gallery yet. Upload one above!</p>
        )}

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="card p-2 flex flex-col justify-between group relative overflow-hidden">
              <div className="h-40 w-full overflow-hidden rounded bg-slate-100 mb-2">
                <img src={item.image} alt={item.title || 'Gallery item'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="space-y-1 min-h-[40px]">
                <p className="text-xs font-semibold text-brand-navy truncate">{item.title || 'Untitled Image'}</p>
                <p className="text-[10px] text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                className="mt-2 w-full rounded border border-red-300 bg-white px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminGalleryPage;
