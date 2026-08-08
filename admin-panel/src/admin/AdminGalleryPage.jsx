import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminGalleryPage = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Editing state
  const [editingItem, setEditingItem] = useState(null);
  const [retainedGalleryImages, setRetainedGalleryImages] = useState([]);

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

  useEffect(() => {
    if (galleryFiles.length === 0) {
      setGalleryPreviews([]);
      return undefined;
    }

    const previewUrls = galleryFiles.map(file => URL.createObjectURL(file));
    setGalleryPreviews(previewUrls);

    return () => previewUrls.forEach(url => URL.revokeObjectURL(url));
  }, [galleryFiles]);

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveSelectedGalleryFile = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setImageFile(null);
    setGalleryFiles([]);
    setRetainedGalleryImages(item.galleryImages || []);
    setStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setTitle('');
    setImageFile(null);
    setGalleryFiles([]);
    setRetainedGalleryImages([]);
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem && !imageFile) {
      setStatus('Please select a main cover image file first.');
      return;
    }

    setStatus('');
    setUploading(true);

    const payload = new FormData();
    payload.append('title', title);
    if (imageFile) {
      payload.append('image', imageFile);
    }
    galleryFiles.forEach((file) => {
      payload.append('galleryImages', file);
    });

    if (editingItem) {
      payload.append('existingGalleryImages', JSON.stringify(retainedGalleryImages));
    }

    try {
      if (editingItem) {
        await api.put(`/gallery/${editingItem._id}`, payload);
        setStatus('Project updated successfully.');
      } else {
        await api.post('/gallery', payload);
        setStatus('Project uploaded to gallery successfully.');
      }
      setTitle('');
      setImageFile(null);
      setGalleryFiles([]);
      setRetainedGalleryImages([]);
      setEditingItem(null);
      setFileInputKey((prev) => prev + 1);
      fetchGallery();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Operation failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project and all its sub-images?')) {
      return;
    }

    try {
      await api.delete(`/gallery/${id}`);
      setStatus('Project deleted from gallery.');
      if (editingItem && editingItem._id === id) {
        handleCancelEdit();
      }
      fetchGallery();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete gallery item');
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Manage Project Gallery</h1>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">
          {editingItem ? 'Edit Project Gallery' : 'Create New Project Gallery'}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3 items-end">
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-brand-navy">Project Title</span>
            <input
              type="text"
              placeholder="e.g. Modern Sliding Window"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-brand-navy">
              {editingItem ? 'Change Cover Photo (Optional)' : 'Main Cover Photo'}
            </span>
            <input
              key={`main-${fileInputKey}`}
              type="file"
              accept="image/*"
              required={!editingItem}
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-brand-navy">
              {editingItem ? 'Add More Gallery Photos (Optional)' : 'Gallery Sub-Photos (Select Multiple)'}
            </span>
            <input
              key={`gallery-${fileInputKey}`}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryFilesChange}
              className="w-full text-sm"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(imagePreview || (editingItem && editingItem.image)) && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-navy">
                {imagePreview ? 'New Cover Preview' : 'Current Cover Image'}
              </span>
              <div className="max-w-xs rounded-md border border-brand-border p-2 bg-white">
                <img src={imagePreview || editingItem.image} alt="Preview" className="h-44 w-full rounded object-cover" loading="lazy" />
              </div>
            </div>
          )}

          {editingItem && retainedGalleryImages.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-navy">Current Sub-Photos ({retainedGalleryImages.length})</span>
              <div className="flex flex-wrap gap-2 rounded-md border border-brand-border p-2 bg-white max-h-48 overflow-y-auto">
                {retainedGalleryImages.map((url, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded bg-slate-100 border border-slate-200">
                    <img src={url} alt={`Current sub ${idx}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setRetainedGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 rounded-full bg-red-500 text-white p-0.5 hover:bg-red-600 transition-colors shadow"
                      title="Delete sub-photo"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {galleryPreviews.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-navy">
                {editingItem ? 'New Sub-Photos Previews' : 'Sub-Photos Previews'} ({galleryPreviews.length})
              </span>
              <div className="flex flex-wrap gap-2 rounded-md border border-brand-border p-2 bg-white max-h-48 overflow-y-auto">
                {galleryPreviews.map((url, idx) => (
                  <div key={idx} className="relative h-20 w-20 overflow-hidden rounded bg-slate-100 border border-slate-200">
                    <img src={url} alt={`Sub preview ${idx}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedGalleryFile(idx)}
                      className="absolute top-1 right-1 rounded-full bg-red-500 text-white p-0.5 hover:bg-red-600 transition-colors shadow"
                      title="Remove image"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={uploading}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {uploading ? 'Saving...' : (editingItem ? 'Save Changes' : 'Create Project')}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-md border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status && <p className="text-sm text-slate-600">{status}</p>}
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Projects ({items.length})</h2>
        {loading && <p className="text-sm text-slate-500">Loading projects...</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-slate-400">No projects in the gallery yet. Upload one above!</p>
        )}

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="card p-2 flex flex-col justify-between group relative overflow-hidden bg-white">
              <div>
                <div className="h-40 w-full overflow-hidden rounded bg-slate-100 mb-2 relative">
                  <img src={item.image} alt={item.title || 'Gallery item'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  {item.galleryImages && item.galleryImages.length > 0 && (
                    <span className="absolute top-2 right-2 rounded bg-brand-navy/90 backdrop-blur px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      {item.galleryImages.length} Sub-Photos
                    </span>
                  )}
                </div>
                <div className="space-y-1 mb-2">
                  <p className="text-xs font-semibold text-brand-navy truncate">{item.title || 'Untitled Project'}</p>
                  <p className="text-[10px] text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                {item.galleryImages && item.galleryImages.length > 0 && (
                  <div className="flex gap-1 overflow-x-auto py-1 mb-2 scrollbar-none max-w-full">
                    {item.galleryImages.map((subImg, idx) => (
                      <img
                        key={idx}
                        src={subImg}
                        alt=""
                        className="h-8 w-8 rounded object-cover flex-shrink-0 border border-slate-100"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleEditClick(item)}
                  className="w-1/2 rounded border border-brand-border bg-white px-2 py-1 text-xs font-semibold text-brand-navy hover:bg-slate-50 transition-colors"
                >
                  Edit Project
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="w-1/2 rounded border border-red-300 bg-white px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
                >
                  Delete Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminGalleryPage;
