import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AppLoader from '../components/AppLoader';
import SmartVideo from '../components/SmartVideo';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

const isVideoUrl = (url = '') => url.includes('/video/upload/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(url);
const toPlayableVideoUrl = (url = '') => url;

const GalleryPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/projects');
        const projects = Array.isArray(data) ? data : [];
        const items = [];

        projects.forEach((project) => {
          const mediaList = Array.isArray(project.media) ? project.media : [];
          mediaList.forEach((rawUrl) => {
            if (typeof rawUrl !== 'string' || !rawUrl.trim()) return;
            if (!isVideoUrl(rawUrl)) return;

            items.push({
              id: `${project._id}-${rawUrl}`,
              url: toPlayableVideoUrl(rawUrl),
              fallbackUrl: rawUrl,
              title: project.title || 'Project',
              category: project.category || 'General'
            });
          });
        });

        setVideos(items);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <motion.section
      className="container-shell relative py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <Seo title="Video Gallery" description="FINIQUE project video gallery." />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white sm:px-10"
        variants={slideUp}
      >
        <div className="pointer-events-none absolute -right-20 -top-16 z-0 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 z-0 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold sm:text-4xl">Video Gallery</h1>
          <p className="mt-2 text-sm text-slate-200 sm:text-base">All project reels in one place.</p>
        </div>
      </motion.div>

      {!loading && !error && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Total videos: {videos.length}</p>
      )}

      {loading && <AppLoader label="Loading videos..." className="mt-6" />}
      {!loading && error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && videos.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-5 text-sm text-slate-300">
          No videos found. Upload videos in admin projects and refresh this page.
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <motion.div className="relative z-20 mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" variants={slideUp}>
              {videos.map((item) => (
                <article key={item.id} className="group relative z-20 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-panel">
                  <div className="relative h-[360px] overflow-hidden bg-black">
                    <SmartVideo
                      src={item.url}
                      fallbackSrc={item.fallbackUrl}
                      controls
                      muted={false}
                      playsInline
                      showLoader={false}
                      className="h-full w-full"
                      videoClassName="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Video
                    </span>
                  </div>
              <div className="p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{item.category}</p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-100">{item.title}</p>
              </div>
            </article>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default GalleryPage;
