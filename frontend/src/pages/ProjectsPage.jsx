import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AppLoader from '../components/AppLoader';
import MediaModal from '../components/MediaModal';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const filters = ['All', 'Residential', 'Commercial'];

const isVideoUrl = (url = '') => url.includes('/video/upload/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(url);

const toPrettyDate = (value) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const query = activeFilter === 'All' ? '' : `?category=${activeFilter}`;
        const { data } = await api.get(`/projects${query}`);
        setProjects(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeFilter]);

  const totalMedia = useMemo(
    () => projects.reduce((count, project) => count + (project.media?.length || 0), 0),
    [projects]
  );

  const featuredProject = useMemo(
    () => projects.find((project) => (project.media || []).length > 0) || null,
    [projects]
  );

  const openMedia = (project, url, index) => {
    setSelectedMedia({
      projectId: project._id,
      projectTitle: project.title,
      category: project.category,
      mediaList: project.media || [],
      index,
      total: (project.media || []).length,
      url
    });
  };

  const closeModal = () => setSelectedMedia(null);

  const stepModal = (direction) => {
    if (!selectedMedia || !selectedMedia.total) return;

    const nextIndex = (selectedMedia.index + direction + selectedMedia.total) % selectedMedia.total;
    const nextUrl = selectedMedia.mediaList[nextIndex];
    setSelectedMedia((prev) => ({ ...prev, index: nextIndex, url: nextUrl }));
  };

  return (
    <motion.section
      className="container-shell py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <Seo title="Projects" description="FINIQUE project gallery featuring residential and commercial installations." />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-brand-border bg-gradient-to-br from-brand-navy via-[#243858] to-[#0f172a] px-6 py-10 text-white sm:px-10"
        variants={slideUp}
      >
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Portfolio</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Projects In Motion</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-200 sm:text-base">
            A curated visual archive of FINIQUE installations across residential and commercial spaces.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-300">Projects</p>
              <p className="mt-1 text-2xl font-bold text-white">{projects.length}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-300">Media Files</p>
              <p className="mt-1 text-2xl font-bold text-white">{totalMedia}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-300">Latest Update</p>
              <p className="mt-1 text-sm font-semibold text-white">{toPrettyDate(featuredProject?.updatedAt) || 'Pending'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-6 flex flex-wrap gap-2" variants={slideUp}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              activeFilter === filter
                ? 'border-brand-navy bg-brand-navy text-white'
                : 'border-brand-border bg-white text-brand-navy hover:border-brand-navy/60'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <div className="mt-8 space-y-8">
        {loading && <AppLoader label="Loading projects..." />}
        {!loading && error && <p className="text-sm text-red-700">{error}</p>}
        {!loading && !error && projects.length === 0 && <p className="text-sm text-slate-500">No projects found.</p>}

        {!loading &&
          !error &&
          projects.map((project) => {
            const media = project.media || [];
            const [heroMedia, ...galleryMedia] = media;

            return (
              <motion.article
                key={project._id}
                className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-panel"
                variants={slideUp}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-brand-border px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{project.category}</p>
                    <h2 className="mt-1 text-xl font-bold text-brand-ink">{project.title}</h2>
                    {project.description && <p className="mt-2 max-w-3xl text-sm text-slate-600">{project.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{media.length} media files</p>
                    <p className="mt-2 text-xs text-slate-500">Updated {toPrettyDate(project.updatedAt) || 'recently'}</p>
                  </div>
                </div>

                <div className="grid gap-3 p-3 lg:grid-cols-[1.35fr_1fr]">
                  <button
                    type="button"
                    disabled={!heroMedia}
                    onClick={() => heroMedia && openMedia(project, heroMedia, 0)}
                    className="group relative block min-h-[260px] overflow-hidden rounded-xl bg-slate-100 text-left sm:min-h-[360px]"
                  >
                    {heroMedia ? (
                      <>
                        {isVideoUrl(heroMedia) ? (
                          <video className="h-full w-full object-cover" muted playsInline>
                            <source src={heroMedia} />
                          </video>
                        ) : (
                          <img
                            src={heroMedia}
                            alt={project.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        <p className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                          Featured
                        </p>
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">No media uploaded yet.</div>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                    {galleryMedia.slice(0, 8).map((url, index) => {
                      const mediaIndex = index + 1;
                      const isVideo = isVideoUrl(url);

                      return (
                        <button
                          key={`${project._id}-${url}`}
                          type="button"
                          onClick={() => openMedia(project, url, mediaIndex)}
                          className="group relative overflow-hidden rounded-lg border border-brand-border"
                        >
                          {isVideo ? (
                            <video className="h-28 w-full bg-black object-cover sm:h-32" muted playsInline>
                              <source src={url} />
                            </video>
                          ) : (
                            <img src={url} alt={project.title} className="h-28 w-full object-cover sm:h-32" loading="lazy" />
                          )}
                          <div className="pointer-events-none absolute inset-0 border border-white/0 transition group-hover:border-white/60" />
                          {isVideo && (
                            <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              Video
                            </span>
                          )}
                        </button>
                      );
                    })}

                    {galleryMedia.length > 8 && (
                      <button
                        type="button"
                        onClick={() => openMedia(project, galleryMedia[8], 9)}
                        className="flex h-28 items-center justify-center rounded-lg border border-brand-border bg-slate-50 text-xs font-semibold uppercase tracking-wide text-brand-navy sm:h-32"
                      >
                        +{galleryMedia.length - 8} More
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
      </div>

      <MediaModal
        mediaItem={selectedMedia}
        onClose={closeModal}
        onNext={() => stepModal(1)}
        onPrev={() => stepModal(-1)}
        canNavigate={(selectedMedia?.total || 0) > 1}
      />
    </motion.section>
  );
};

export default ProjectsPage;
