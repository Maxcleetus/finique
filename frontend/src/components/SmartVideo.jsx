import { useEffect, useRef, useState } from 'react';

const FAILED_VIDEO_SOURCES = new Set();

const SmartVideo = ({
  src,
  className = '',
  videoClassName = '',
  autoPlayInView = false,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  playsInline = true,
  poster,
  fallbackImage,
  onReady,
  preload = 'none',
  fallbackSrc,
  showLoader = true
}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(!autoPlayInView);
  const [isReady, setIsReady] = useState(false);
  const [readyNotified, setReadyNotified] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const [fallbackQueue, setFallbackQueue] = useState([]);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const fallbackList = Array.isArray(fallbackSrc) ? fallbackSrc : fallbackSrc ? [fallbackSrc] : [];
    const candidates = [src, ...fallbackList].filter(Boolean);
    const dedupedCandidates = [...new Set(candidates)];
    const availableCandidates = dedupedCandidates.filter((candidate) => !FAILED_VIDEO_SOURCES.has(candidate));

    if (availableCandidates.length === 0) {
      setActiveSrc(src);
      setFallbackQueue([]);
      setHasFailed(true);
      setIsReady(true);
      return;
    }

    const [primarySrc, ...normalizedFallbacks] = availableCandidates;
    setActiveSrc(primarySrc);
    setFallbackQueue(normalizedFallbacks);
    setHasFailed(false);
    setIsReady(false);
    setReadyNotified(false);
  }, [src, fallbackSrc]);

  useEffect(() => {
    if (isReady) return undefined;
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [isReady, activeSrc]);

  useEffect(() => {
    if (!autoPlayInView || !videoRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [autoPlayInView]);

  useEffect(() => {
    if (!autoPlayInView || !videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [autoPlayInView, isInView]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.load();
    if (autoPlay || (autoPlayInView && isInView)) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeSrc, autoPlay, autoPlayInView]);

  const handleReady = () => {
    setIsReady(true);
    if (!readyNotified && onReady) {
      onReady();
      setReadyNotified(true);
    }
  };

  const handleError = () => {
    if (activeSrc) {
      FAILED_VIDEO_SOURCES.add(activeSrc);
    }

    if (fallbackQueue.length > 0) {
      const [nextSrc, ...remaining] = fallbackQueue;
      setFallbackQueue(remaining);
      setIsReady(false);
      setActiveSrc(nextSrc);
      return;
    }
    setHasFailed(true);
    handleReady();
  };

  return (
    <div className={`relative ${className}`}>
      {showLoader && !isReady && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/30">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/85 border-t-transparent" />
        </div>
      )}
      {hasFailed && fallbackImage ? (
        <img src={fallbackImage} alt="Media preview" className={`bg-black ${videoClassName}`} loading="lazy" />
      ) : (
        <video
          ref={videoRef}
          className={`bg-black ${videoClassName}`}
          src={activeSrc}
          autoPlay={autoPlay || autoPlayInView}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          onLoadedMetadata={handleReady}
          onLoadedData={handleReady}
          onCanPlay={handleReady}
          onCanPlayThrough={handleReady}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default SmartVideo;
