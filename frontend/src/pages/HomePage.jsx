import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AppLoader from '../components/AppLoader';
import MediaModal from '../components/MediaModal';
import ProductCard from '../components/ProductCard';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';

const faqData = [
  {
    question: "Are your doors and windows customizable?",
    answer: "Yes, our doors and windows are highly customizable. We understand that every customer has unique preferences and requirements for their doors and windows, which is why we offer a wide range of customization options."
  },
  {
    question: "Do your products come with a warranty?",
    answer: "Yes, our products are backed by a comprehensive warranty that covers both profiles and hardware."
  },
  {
    question: "What materials do you utilize in the construction of doors and windows?",
    answer: "We provide premium UPVC frames, and offer a selection of glass options including tinted, frosted, reflective, and clear glasses to meet your specific design and functionality preferences."
  },
  {
    question: "Do you provide professional installation services on doors and windows?",
    answer: "Yes, Our team of experienced installers is skilled in the proper installation techniques to ensure a precise fit and optimal performance of our products, providing a hassle-free experience for customers."
  },
  {
    question: "Can your team offer expert guidance in selecting the most suitable doors and windows for a specific project?",
    answer: "Our team is highly knowledgeable and experienced in the selection of doors and windows for various projects. They can provide expert guidance based on your specific needs, helping you choose the most suitable options in terms of materials, designs, and features to achieve the desired aesthetics and functionality for your project."
  }
];

const featureData = [
  {
    title: "Enjoy an unparalleled after sales experience",
    description: "Our dedicated team is here to assist you with any post-installation needs, ensuring your complete satisfaction with our products and services.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Personalized expert advice",
    description: "Guiding you towards the perfect window solutions for your dream space.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Experience a diverse array of products at our center",
    description: "We understand that every space is unique, and your doors and windows should reflect your personal taste and architectural style.",
    icon: (
      <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-violet-50/50 border-violet-200 shadow-md' : 'bg-white border-slate-200/60 shadow-sm hover:border-slate-300'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left focus:outline-none p-5 sm:p-6 group"
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          <span className={`text-xs sm:text-sm font-bold font-serif italic ${isOpen ? 'text-violet-600' : 'text-slate-400'}`}>0{index + 1}</span>
          <h5 className={`flex-1 text-base sm:text-lg font-bold transition-colors ${isOpen ? 'text-violet-900' : 'text-brand-navy group-hover:text-violet-700'}`}>{faq.question}</h5>
        </div>
        <div className={`ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600'}`}>
          <svg className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-0 ml-7 sm:ml-10">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const galleryImages = [
  'https://images.unsplash.com/photo-1600607687930-cebc5a882aed?w=1200',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
  'https://images.unsplash.com/photo-1600585153205-0aacf645f0fb?w=1200',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200',
];

const galleryItems = galleryImages.map((src, i) => ({ src, originalIndex: i }));

const GallerySlider = () => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);

  const MarqueeRow = ({ items, direction = -1 }) => {
    return (
      <div className="flex overflow-hidden group py-2">
        <motion.div
          className="flex gap-4 min-w-max pr-4"
          animate={{ x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {/* Duplicate the items to create a seamless infinite scroll effect */}
          {[...items, ...items].map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveMediaIndex(item.originalIndex)}
              className="cursor-pointer w-[260px] sm:w-[350px] lg:w-[450px] h-[180px] sm:h-[250px] lg:h-[320px] shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 relative group/img"
            >
              <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-300 group-hover/img:bg-brand-navy/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-3xl space-y-2">
        <MarqueeRow items={galleryItems.slice(0, 4)} direction={-1} />
        <MarqueeRow items={galleryItems.slice(4, 8)} direction={1} />
      </div>
      
      {activeMediaIndex !== null && (
        <MediaModal
          mediaItem={{
            url: galleryImages[activeMediaIndex],
            category: 'Project Gallery',
            projectTitle: `Featured Project 0${activeMediaIndex + 1}`,
            index: activeMediaIndex,
            total: galleryImages.length
          }}
          canNavigate={true}
          onNext={() => setActiveMediaIndex((prev) => (prev + 1) % galleryImages.length)}
          onPrev={() => setActiveMediaIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          onClose={() => setActiveMediaIndex(null)}
        />
      )}
    </>
  );
};

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const featuredSliderRef = useRef(null);
  
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });

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
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const { data } = await api.get('/reviews');
        setReviews(data.slice(0, 6)); // Display latest 6 reviews
      } catch {
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    
    fetchFeatured();
    fetchReviews();
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

  return (
    <>
      <Seo title="Home" description="Modern Aluminium Door & Window Systems" />

      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-brand-navy">
        {/* Background Image with Slow Zoom */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center sm:object-right"
          />
        </motion.div>
        
        {/* Architectural Dot Matrix Overlay */}
        <div 
          className="absolute inset-0 z-[2] opacity-[0.25] mix-blend-overlay" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }} 
        />
        
        {/* Cinematic Vignette & Gradients (Deep Shade) */}
        <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t sm:bg-gradient-to-r from-brand-navy/95 sm:from-brand-navy via-brand-navy/85 sm:via-brand-navy/85 to-brand-navy/50 sm:to-black/20" />
        
        {/* Foreground Content */}
        <div className="absolute inset-0 z-40 flex items-center">
          <div className="container-shell w-full relative">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-4xl px-4 sm:px-8 py-10"
            >
              {/* Pill Tag */}
              <motion.div variants={slideUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-100 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  Premium Finique Windows
                </span>
              </motion.div>
              
              {/* Main Headline */}
              <motion.h1 variants={slideUp} className="mt-6 text-5xl font-extrabold leading-[1.08] text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
                Modern Doors &
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-100 to-white">
                  Window Systems.
                </span>
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p variants={slideUp} className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Engineered for uncompromising strength. Designed for unparalleled elegance. Transform your spaces with state-of-the-art opening solutions.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div variants={slideUp} className="mt-8 flex flex-wrap gap-4 items-center">
                 <Link to="/contact" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                   Contact Us
                   <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </Link>
                 <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white">
                   <svg className="w-4 h-4 text-violet-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   Visit Experience Centre
                 </Link>
              </motion.div>
            </motion.div>

            {/* Floating Glassmorphic Badge / Awards */}
            <motion.div 
               variants={slideLeft}
               initial="hidden"
               animate="show"
               className="hidden lg:flex absolute bottom-4 right-4 items-center gap-6 rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full mix-blend-screen filter blur-[40px] opacity-40 animate-pulse" />
               <div className="flex flex-col relative z-10">
                  <span className="text-3xl font-extrabold text-white">10+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Years Warranty</span>
               </div>
               <div className="w-px h-12 bg-white/10 relative z-10" />
               <div className="flex flex-col relative z-10">
                  <span className="text-3xl font-extrabold text-white">#1</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Premium Choice</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Intro / Crafting Dream Spaces Section */}
      <motion.section
        className="container-shell py-16 lg:py-24"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideRight} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200" 
              alt="Crafting Dream Spaces" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 border-[8px] border-white/10 mix-blend-overlay"></div>
          </motion.div>
          <motion.div variants={slideLeft} className="px-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">Modern Aluminium Systems</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6">Crafting Dream Spaces.</h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              At FINIQUE, our premium multi-brand experience centre for doors and windows, we have installed a wide range of ultra-modern aluminium and uPVC door and window systems. Check out how smooth they are to operate. We shall explain how easy they are to maintain. These customisable doors and windows are very secure. 
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Speak to our in-store experts for more details. Visit our store, change your lifestyle forever!
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/90">
              Discover Our Story
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Our Product Range Section */}
      <motion.section
        className="container-shell pb-16 lg:pb-32"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6" variants={slideUp}>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-4">
              Explore Collection
            </span>
            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight" variants={slideUp}>
              Our Product Range
            </motion.h2>
            <motion.p className="mt-4 text-base leading-relaxed text-slate-600" variants={slideUp}>
              Discover our premium aluminium door and window systems engineered for performance, elegance, and modern architectural design.
            </motion.p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollFeatured('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand-navy hover:bg-brand-navy hover:text-white"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollFeatured('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-navy bg-brand-navy text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-violet-950"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div className="mt-12 relative" variants={staggerContainer}>
          {featuredLoading && <AppLoader label="Loading product range..." className="md:col-span-2 lg:col-span-3" />}
          {!featuredLoading && (
            <div className="relative">
              {/* Fade gradient for smooth scroll cutoff on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div
                ref={featuredSliderRef}
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 scroll-smooth no-scrollbar"
              >
                {featured.map((product) => (
                  <div key={product._id} className="w-[85%] shrink-0 snap-start sm:w-[350px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* 4. Gallery Section */}
      <motion.section
        className="bg-brand-slate py-16 lg:py-24"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="container-shell">
          <motion.div className="text-center max-w-3xl mx-auto mb-12" variants={slideUp}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 mb-2">Our Work</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">Project Gallery</h3>
          </motion.div>
          <motion.div variants={slideUp}>
            <GallerySlider />
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Features / Elevated Experiences Section */}
      <motion.section
        className="bg-white py-16 lg:py-24 border-y border-slate-200"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="container-shell">
          <motion.div className="text-center max-w-3xl mx-auto mb-14" variants={slideUp}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 mb-2">Elevated Experiences</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-4">Unparalleled Experience</h3>
            <p className="text-slate-600">
              We pride ourselves on offering an unparalleled experience, where the fusion of exceptional craftsmanship, top-tier materials, and customized solutions results in premium doors and windows that transcend the ordinary. Enhancing the beauty and functionality of any space has never been more seamless. Whether you're renovating, building a new home, or upgrading your commercial property, our services are thoughtfully tailored to cater to your distinctive requirements. Step into an elevated realm of aesthetics, security, and energy efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featureData.map((feature, idx) => (
              <motion.div key={idx} variants={slideUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-slate rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Review Section */}
      <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden relative border-y border-slate-200">
        {/* Professional Elegant Shade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(237,233,254,0.6)_0%,transparent_80%)] pointer-events-none" />

        <div className="container-shell relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16" 
            initial="hidden" whileInView="show" viewport={viewport} variants={slideUp}
          >
            <span className="inline-block rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 mb-6 border border-violet-200 shadow-sm">
              Client Testimonials
            </span>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight">What Our Customers Say</h3>
          </motion.div>
        </div>

        {reviewsLoading ? (
          <AppLoader label="Loading reviews..." />
        ) : reviews.length === 0 ? (
          <p className="text-center text-slate-500 relative z-10">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="relative w-full flex overflow-hidden py-6">
             {/* Gradient Fade Edges for Marquee Seamless Integration */}
             <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
             <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

             {(() => {
               // A single review card is roughly 400px wide. 
               // To safely overflow ultra-wide monitors (e.g., 2560px) without creating a massively unsafe DOM width 
               // (>30,000px causes browsers/GPUs to cull the element into blank space), we calculate duplicates precisely.
               const minItemsNeeded = 12; // Yields ~5000px total minimum width
               const multiplier = Math.max(2, Math.ceil(minItemsNeeded / reviews.length));
               
               // The multiplier MUST be an even number because our animation shifts by -50%. 
               // An even multiplier ensures the halfway point neatly splits whole arrays.
               const evenMultiplier = multiplier % 2 === 0 ? multiplier : multiplier + 1;
               
               const safeReviews = Array(evenMultiplier).fill(reviews).flat();
               
               // Keep the scrolling speed constant regardless of total reviews
               const scrollDuration = safeReviews.length * 4; 

               return (
                 <motion.div 
                   className="flex gap-6 min-w-max pr-6"
                   animate={{ x: ["0%", "-50%"] }}
                   transition={{ ease: "linear", duration: scrollDuration, repeat: Infinity }}
                 >
                   {safeReviews.map((review, idx) => (
                     <div 
                       key={`${review._id}-${idx}`} 
                       className="w-[300px] sm:w-[420px] relative rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]"
                     >
                       {/* Minimal watermark quotation */}
                       <div className="absolute top-4 right-6 text-8xl font-serif text-slate-100/60 leading-none pointer-events-none">"</div>
                       
                       <div className="flex text-yellow-500 mb-6">
                         {[...Array(5)].map((_, i) => (
                           <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                         ))}
                       </div>
                       
                       <p className="text-slate-600 text-sm sm:text-base leading-relaxed min-h-[80px] italic font-medium relative z-10">"{review.text}"</p>
                       
                       <div className="mt-8 flex items-center gap-4 relative z-10">
                         <div className="h-10 w-10 shrink-0 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-4 ring-violet-50">
                           {review.name.charAt(0).toUpperCase()}
                         </div>
                         <div>
                           <p className="font-bold text-brand-navy text-sm">{review.name}</p>
                           {review.location && <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">{review.location}</p>}
                         </div>
                       </div>
                     </div>
                   ))}
                 </motion.div>
               );
             })()}
          </div>
        )}
      </section>

      {/* 7. FAQ Section */}
      <motion.section
        className="container-shell py-20 lg:py-32 relative"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-violet-100/50 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 relative z-10 items-start">
          <motion.div variants={slideRight} className="lg:sticky lg:top-32">
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 mb-6">
              Questions & Answers
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-6">Frequently Asked Questions</h3>
            <p className="text-slate-600 mb-8 text-base lg:text-lg">
              Have questions about our premium door and window systems? Find answers to commonly asked questions here.
            </p>
            
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Still need help?</h4>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">Our dedicated support team is ready to assist you with any custom architectural inquiries.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-navy shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-violet-700">
                    Contact Support
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={slideLeft} className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;
