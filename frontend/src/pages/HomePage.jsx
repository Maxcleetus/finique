import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import AppLoader from '../components/AppLoader';
import ProductCard from '../components/ProductCard';
import Seo from '../components/Seo';
import SmartVideo from '../components/SmartVideo';
import api from '../services/api';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';

const isVideoUrl = (url = '') => url.includes('/video/upload/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(url);
const toPlayableVideoUrl = (url = '') => url;
const getVideoSourceCandidates = (url = '') => {
  const candidates = [url];
  if (url.includes('/video/upload/')) {
    candidates.push(url.replace('/video/upload/', '/video/upload/f_mp4/'));
    candidates.push(url.replace('/video/upload/', '/video/upload/f_mp4,vc_auto/'));
  }
  if (/\.mov(\?.*)?$/i.test(url)) {
    candidates.push(url.replace(/\.mov(\?.*)?$/i, '.mp4$1'));
  }
  return [...new Set(candidates.filter(Boolean))];
};
const toVideoPosterUrl = (url = '') => {
  if (!url.includes('/video/upload/')) return '';
  return url
    .replace('/video/upload/', '/video/upload/so_0,c_fill,ar_9:16,g_auto,q_auto,f_jpg/')
    .replace(/\.(mp4|mov|webm|mkv|avi)(\?.*)?$/i, '.jpg$2');
};
const toVideoKey = (url = '') => {
  const normalized = String(url).trim().toLowerCase().replace(/\?.*$/, '').replace(/#.*$/, '');
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
};
const toCanonicalVideoIdentity = (url = '') => {
  const clean = toVideoKey(url);
  if (!clean) return '';
  const cloudinaryMatch = clean.match(/\/video\/upload\/(?:(?!v\d+\/)[^/]+\/)*(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
  if (cloudinaryMatch?.[1]) return cloudinaryMatch[1];
  return clean.replace(/\.[a-z0-9]+$/i, '');
};
const toVideoFileSignature = (url = '') => {
  const clean = toVideoKey(url);
  if (!clean) return '';
  const parts = clean.split('/').filter(Boolean);
  const tail = parts.slice(-2).join('/');
  return tail.replace(/\.[a-z0-9]+$/i, '');
};
const HERO_FALLBACK_VIDEO = 'https://res.cloudinary.com/duzg93hdg/video/upload/v1772566872/finique/projects/vacvxv8qcinogkm3gs8o.mov';
const DEFAULT_REEL_URLS = [
  'https://res.cloudinary.com/duzg93hdg/video/upload/v1772566872/finique/projects/vacvxv8qcinogkm3gs8o.mov',
  'https://res.cloudinary.com/duzg93hdg/video/upload/v1772567009/finique/projects/wjvqo26bcrjhhofeqp93.mov',
  'https://res.cloudinary.com/duzg93hdg/video/upload/v1772567026/finique/projects/ukrhojsaxit0mlc52rmh.mov'
];

const buildFallbackReels = () =>
  DEFAULT_REEL_URLS.map((url, index) => ({
    id: `fallback-${index}-${url}`,
    url,
    fallbackUrls: getVideoSourceCandidates(url).slice(1),
    poster: toVideoPosterUrl(url),
    isVideo: true,
    title: `Project Reel ${index + 1}`,
    category: 'Residential'
  }));

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [reelItems, setReelItems] = useState(buildFallbackReels());
  const [reelsLoading, setReelsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showAllDesktopReels, setShowAllDesktopReels] = useState(false);
  const featuredSliderRef = useRef(null);
  const reviewSliderRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });
  const [heroVideo, setHeroVideo] = useState({
    url: toPlayableVideoUrl(HERO_FALLBACK_VIDEO),
    fallbackUrls: getVideoSourceCandidates(HERO_FALLBACK_VIDEO).slice(1)
  });
  const teamSectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14
      }
    }
  };
  const teamMembers = [
    {
      firstName: 'aarav',
      lastName: 'shah',
      role: 'Director - Operations',
      note: 'Leads production planning and quality benchmarks across all manufacturing lines.',
      avatar: 'https://i.pravatar.cc/160?img=12'
    },
    {
      firstName: 'riya',
      lastName: 'mehta',
      role: 'Head - Design & Projects',
      note: 'Drives system selection, design coordination, and project-level execution quality.',
      avatar: 'https://i.pravatar.cc/160?img=32'
    },
    {
      firstName: 'kunal',
      lastName: 'patel',
      role: 'Client Relations Lead',
      note: 'Manages customer communication, timelines, and smooth delivery handovers.',
      avatar: 'https://i.pravatar.cc/160?img=15'
    },
    {
      firstName: 'mira',
      lastName: 'desai',
      role: 'Interior Strategy Lead',
      note: 'Shapes material direction and interior detailing for premium project outcomes.',
      avatar: 'https://i.pravatar.cc/160?img=47'
    }
  ];
  const getMemberInitials = (member) => `${member.firstName?.[0] || ''}${member.lastName?.[0] || ''}`.toUpperCase();

  useEffect(() => {
    const fetchFeatured = async () => {
      setFeaturedLoading(true);
      try {
        const { data } = await api.get('/products/featured', { params: { view: 'card' } });
        setFeatured(data);
      } catch {
        setFeatured([]);
      } finally {
        setFeaturedLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const syncViewport = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const fetchReels = async () => {
      setReelsLoading(true);
      try {
        const { data } = await api.get('/projects', { params: { view: 'reels' }, timeout: 6000 });
        const allItems = (data || [])
          .flatMap((project) =>
            (project.media || []).map((url) => ({
              id: `${project._id}-${url}`,
              url: toPlayableVideoUrl(url),
              fallbackUrls: getVideoSourceCandidates(url).slice(1),
              poster: toVideoPosterUrl(url),
              isVideo: isVideoUrl(url),
              title: project.title,
              category: project.category
            }))
          )
          .filter((item) => item.isVideo);
        const seen = new Set();
        const seenPoster = new Set();
        const seenFileSignature = new Set();
        const items = allItems.filter((item) => {
          const key = toCanonicalVideoIdentity(item.url || item.id);
          const posterKey = toVideoKey(item.poster || '');
          const fileSignature = toVideoFileSignature(item.url || '');
          if (!key || seen.has(key)) return false;
          if (posterKey && seenPoster.has(posterKey)) return false;
          if (fileSignature && seenFileSignature.has(fileSignature)) return false;
          seen.add(key);
          if (posterKey) seenPoster.add(posterKey);
          if (fileSignature) seenFileSignature.add(fileSignature);
          return true;
        });
        const safeItems = items.length > 0 ? items : buildFallbackReels();
        setReelItems(safeItems);
        if (safeItems.length > 0) {
          const heroCandidate = safeItems[5] || safeItems[4] || safeItems[3] || safeItems[2] || safeItems[1] || safeItems[0];
          setHeroVideo({
            url: heroCandidate.url,
            fallbackUrls: heroCandidate.fallbackUrls
          });
        }
      } catch {
        const fallbackItems = buildFallbackReels();
        setReelItems(fallbackItems);
        setHeroVideo({
          url: fallbackItems[0].url,
          fallbackUrls: fallbackItems[0].fallbackUrls
        });
      } finally {
        setReelsLoading(false);
      }
    };

    fetchReels();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const { data } = await api.get('/reviews');
        setReviews(data || []);
      } catch {
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const desktopReelItems = useMemo(
    () => (showAllDesktopReels ? reelItems : reelItems.slice(0, 8)),
    [reelItems, showAllDesktopReels]
  );

  const scrollFeatured = (direction = 'right') => {
    const slider = featuredSliderRef.current;
    if (!slider) return;

    const step = Math.max(320, Math.floor(slider.clientWidth * 0.8));
    const delta = direction === 'right' ? step : -step;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (direction === 'right' && slider.scrollLeft >= maxScrollLeft - 4) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction === 'left' && slider.scrollLeft <= 4) {
      slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    slider.scrollBy({ left: delta, behavior: 'smooth' });
  };

  useEffect(() => {
    if (featuredLoading || featured.length <= 1) return undefined;
    const interval = setInterval(() => {
      scrollFeatured('right');
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredLoading, featured.length]);

  const scrollReviews = (direction = 'right') => {
    const slider = reviewSliderRef.current;
    if (!slider) return;

    const step = Math.max(320, Math.floor(slider.clientWidth * 0.9));
    const delta = direction === 'right' ? step : -step;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (direction === 'right' && slider.scrollLeft >= maxScrollLeft - 4) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction === 'left' && slider.scrollLeft <= 4) {
      slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    slider.scrollBy({ left: delta, behavior: 'smooth' });
  };

  useEffect(() => {
    if (reviews.length <= 1) return undefined;
    const interval = setInterval(() => {
      scrollReviews('right');
    }, 4300);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      <Seo title="Home" description="Premium uPVC windows and doors designed for modern architecture." />

      <motion.section className="relative h-[75vh] min-h-[520px] overflow-hidden" initial="hidden" animate="show" variants={slideUp}>
        <SmartVideo
          src={heroVideo.url}
          fallbackSrc={heroVideo.fallbackUrls}
          autoPlay
          muted
          loop
          playsInline
          showLoader={false}
          preload="metadata"
          poster={toVideoPosterUrl(heroVideo.url) || 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1200'}
          fallbackImage={toVideoPosterUrl(heroVideo.url)}
          className="absolute inset-0 z-0"
          videoClassName="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-navy/95 via-brand-navy/78 to-brand-navy/60" />
        <div className="absolute inset-0 z-40 flex items-center">
          <div className="container-shell">
            <motion.div
              variants={slideUp}
              className="max-w-4xl px-5 py-6 sm:px-8 sm:py-8"
            >
              <p className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100 backdrop-blur-sm">
                FINIQUE
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
                Premium uPVC Windows
                <span className="block text-sky-200">& Doors</span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-100 sm:text-base">
                Built for performance. Installed with precision.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95 sm:text-xs">
                <span className="rounded-full border border-white/35 bg-black/25 px-3 py-1">Noise Control</span>
                <span className="rounded-full border border-white/35 bg-black/25 px-3 py-1">Thermal Comfort</span>
                <span className="rounded-full border border-white/35 bg-black/25 px-3 py-1">Weather Resistant</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy">
                  Explore Products
                </Link>
                <Link to="/contact" className="rounded-md border border-white/80 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white">
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="container-shell mt-4 pb-16"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div className="flex flex-wrap items-end justify-between gap-4" variants={slideUp}>
          <div>
            <h2 className="section-title">Video Reels</h2>
            <p className="section-subtitle">Quick video stories from recent installations.</p>
          </div>
        </motion.div>

        {reelsLoading && reelItems.length === 0 ? (
          <AppLoader label="Loading reels..." className="mt-6" />
        ) : reelItems.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No project videos available yet.</p>
        ) : (
          <>
            {!isDesktop ? (
              <motion.div className="mt-8 overflow-x-auto pb-2 no-scrollbar" variants={slideUp}>
                <div className="flex min-w-max gap-4">
                  {reelItems.map((item) => (
                    <article
                      key={`mobile-${item.id}`}
                      className="group w-[220px] overflow-hidden rounded-2xl border border-brand-border bg-white shadow-panel"
                    >
                      <div className="relative h-[360px] overflow-hidden bg-black">
                        <SmartVideo
                          src={item.url}
                          fallbackSrc={item.fallbackUrls}
                          autoPlayInView
                          muted
                          loop
                          playsInline
                          controls
                          preload="none"
                          poster={item.poster}
                          fallbackImage={item.poster}
                          className="h-full w-full"
                          videoClassName="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                          Video
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{item.category}</p>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-brand-ink">{item.title}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div className="mt-8" variants={slideUp}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {desktopReelItems.map((item) => (
                    <article
                      key={`desktop-${item.id}`}
                      className="group overflow-hidden rounded-2xl border border-brand-border bg-white shadow-panel"
                    >
                      <div className="relative h-[360px] overflow-hidden bg-black">
                        <SmartVideo
                          src={item.url}
                          fallbackSrc={item.fallbackUrls}
                          autoPlayInView
                          muted
                          loop
                          playsInline
                          controls
                          preload="none"
                          poster={item.poster}
                          fallbackImage={item.poster}
                          className="h-full w-full"
                          videoClassName="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                          Video
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{item.category}</p>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-brand-ink">{item.title}</p>
                      </div>
                    </article>
                  ))}
                </div>
                {reelItems.length > 8 && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllDesktopReels((prev) => !prev)}
                      className="rounded-md border border-brand-navy bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {showAllDesktopReels ? 'Show Less Videos' : 'View More Videos'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </motion.section>

      <motion.section
        className="container-shell pb-16"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={teamSectionVariants}
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <motion.div variants={slideRight} className="relative min-h-[380px] overflow-hidden lg:min-h-[560px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400"
                alt="FINIQUE team"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/15 via-brand-navy/40 to-brand-navy/85" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-100/90">Leadership Team</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Know Our Team</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-100/95">
                  Experienced professionals focused on engineering quality, project execution, and client satisfaction.
                </p>
              </div>
            </motion.div>

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <motion.div variants={slideUp}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">People of FINIQUE</p>
                <h3 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">Built By Specialists</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
                  Cross-functional experts delivering premium window and door systems with reliable timelines and precision.
                </p>
              </motion.div>

              <motion.div variants={teamSectionVariants} className="mt-8 grid gap-4">
                {teamMembers.map((member, index) => (
                  <motion.article
                    key={`${member.firstName}-${member.lastName}`}
                    variants={slideLeft}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
                  >
                    <div className="flex items-start gap-4">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-slate-200"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold tracking-[0.08em] text-white">
                          {getMemberInitials(member)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Member {String(index + 1).padStart(2, '0')}
                        </p>
                        <h4 className="mt-1 text-xl font-semibold capitalize leading-tight text-brand-navy">
                          {member.firstName} {member.lastName}
                        </h4>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">{member.role}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{member.note}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="container-shell py-16"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div className="flex items-end justify-between gap-4" variants={slideUp}>
          <div>
            <motion.h2 className="section-title" variants={slideUp}>
              Featured Product Systems
            </motion.h2>
            <motion.p className="section-subtitle" variants={slideUp}>
              Engineered product lines for premium residential and commercial requirements.
            </motion.p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollFeatured('left')}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-brand-navy hover:text-brand-navy"
              aria-label="Previous featured products"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => scrollFeatured('right')}
              className="rounded-full border border-brand-navy bg-brand-navy px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
              aria-label="Next featured products"
            >
              Next
            </button>
          </div>
        </motion.div>

        <motion.div className="mt-8" variants={staggerContainer}>
          {featuredLoading && <AppLoader label="Loading featured products..." className="md:col-span-2 lg:col-span-3" />}
          {!featuredLoading && (
            <div
              ref={featuredSliderRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
            >
              {featured.map((product) => (
                <div key={product._id} className="w-[85%] shrink-0 snap-start sm:w-[340px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        className="container-shell pb-16"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div className="flex items-end justify-between gap-4" variants={slideUp}>
          <div>
            <h2 className="section-title">Client Reviews</h2>
            <p className="section-subtitle">Trusted feedback from homeowners and project partners.</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollReviews('left')}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-brand-navy hover:text-brand-navy"
              aria-label="Previous reviews"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => scrollReviews('right')}
              className="rounded-full border border-brand-navy bg-brand-navy px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
              aria-label="Next reviews"
            >
              Next
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={reviewSliderRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
          variants={staggerContainer}
        >
          {reviewsLoading && <AppLoader label="Loading reviews..." className="w-full" />}
          {!reviewsLoading && reviews.length === 0 && (
            <p className="text-sm text-slate-500">No client reviews available yet.</p>
          )}
          {!reviewsLoading &&
            reviews.map((review) => (
              <motion.article
                key={review._id}
                variants={slideUp}
                className="w-[88%] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:w-[360px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">{review.name}</p>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                      {review.location || 'Client'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={`${review._id}-star-${index + 1}`}
                      className={index < Number(review.rating || 0) ? 'text-amber-400' : 'text-slate-200'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
              </motion.article>
            ))}
        </motion.div>
      </motion.section>
    </>
  );
};

export default HomePage;
