import { useEffect, useState } from 'react';
import api from '../services/api';

const baseForm = {
  title: '',
  category: 'Residential',
  description: ''
};

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(baseForm);
  const [media, setMedia] = useState([]);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm(baseForm);
    setMedia([]);
    setEditingId(null);
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('title', form.title);
    payload.append('category', form.category);
    payload.append('description', form.description);
    Array.from(media).forEach((file) => payload.append('media', file));

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        setStatus('Project updated successfully.');
      } else {
        await api.post('/projects', payload);
        setStatus('Project added successfully.');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const removeMedia = async (id, url) => {
    try {
      await api.delete(`/projects/${id}/media`, { data: { url } });
      fetchProjects();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to remove media');
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Manage Projects</h1>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">{editingId ? 'Edit Project' : 'Add Project'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          />
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="rounded-md border border-brand-border px-3 py-2 text-sm"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <textarea
          rows="4"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
          className="w-full rounded-md border border-brand-border px-3 py-2 text-sm"
        />
        <input type="file" multiple onChange={(e) => setMedia(e.target.files)} className="text-sm" />
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Update Project' : 'Save Project'}
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
        {loading && <p className="text-sm text-slate-500">Loading projects...</p>}
        {projects.map((project) => (
          <article key={project._id} className="card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-brand-navy">{project.title}</p>
                <p className="text-xs text-slate-600">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(project)}
                  className="rounded border border-brand-border px-3 py-1 text-xs font-semibold text-brand-navy"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project._id)}
                  className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600">{project.description}</p>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {(project.media || []).map((url) => {
                const isVideo = url.includes('/video/upload/') || url.match(/\.(mp4|webm|mov)$/i);
                return (
                  <div key={url} className="rounded-md border border-brand-border p-2">
                    {isVideo ? (
                      <video controls className="h-24 w-full rounded bg-black object-cover">
                        <source src={url} />
                      </video>
                    ) : (
                      <img src={url} alt={project.title} className="h-24 w-full rounded object-cover" loading="lazy" />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(project._id, url)}
                      className="mt-2 w-full rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminProjectsPage;
