import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLoader from '../components/AppLoader';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';
import { buildCanonicalUrl, siteConfig } from '../utils/siteSeo';

const ProductShowcaseRow = ({ product, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
      className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 group"
    >
      {/* Image */}
      <motion.div
        variants={isEven ? slideRight : slideLeft}
        className={`relative overflow-hidden h-72 lg:h-auto min-h-[320px] bg-slate-100 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=900'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Category badge */}
        <span className="absolute top-5 left-5 inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm">
          {product.category}
        </span>
        {/* Dark gradient on the image edge touching the text */}
        <div className={`absolute inset-y-0 w-16 from-white/0 via-slate-900/5 to-slate-900/0 hidden lg:block ${isEven ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'}`} />
      </motion.div>

      {/* Text Content */}
      <motion.div
        variants={isEven ? slideLeft : slideRight}
        className={`flex flex-col justify-center p-10 lg:p-14 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-600 mb-4">
          {product.category}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-tight mb-5 group-hover:text-violet-900 transition-colors">
          {product.title}
        </h2>
        <p className="text-slate-600 text-base leading-relaxed mb-8 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:bg-violet-950 transition-all duration-300"
          >
            Explore System
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <span className="text-xs text-slate-400 font-semibold">Premium Quality</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products', { params: { view: 'card' } });
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map((item) => item.category))], [products]);
  const filteredProducts = activeCategory === 'All' ? products : products.filter((item) => item.category === activeCategory);
  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteConfig.name} Products`,
    url: buildCanonicalUrl('/products'),
    description: 'Browse FINIQUE aluminium window and door systems for residential and commercial projects.'
  };

  return (
    <>
      <Seo
        title="VEKA uPVC Windows & Doors Kerala | Finique Windows"
        description="Browse Finique's VEKA uPVC window and door systems — engineered for Kerala's monsoon, heat, and coastal air. Soundproof, heat-resistant, zero-maintenance."
        schema={productsSchema}
        keywords="uPVC window systems Kerala, VEKA uPVC doors, soundproof windows Kochi, heat resistant uPVC windows, sliding uPVC doors, casement uPVC windows, tilt turn windows Kerala"
      />

      {/* ── Dark Hero Header ── */}
      <section className="relative bg-brand-navy overflow-hidden pb-20">
        {/* Violet radial accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.3)_0%,transparent_65%)] pointer-events-none" />
        {/* Top scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-transparent to-transparent pointer-events-none" />
        <motion.div
          className="container-shell py-20 lg:py-28 relative z-10"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={slideUp} className="max-w-3xl">
            <span className="inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200 mb-6">
              Our Range
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-5">
              The VEKA{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300">Advantage</span>
            </h1>
            <p className="text-slate-100 text-lg leading-relaxed">
              The Science of Silence &amp; Strength. We don't use ordinary plastic — we fabricate with <strong>VEKA uPVC</strong>, a multi-chambered, lead-free, German-engineered profile built for precision, thermal efficiency, and a lifetime of zero maintenance in Kerala's demanding climate.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Filter Pills – card lifted over hero ── */}
      <div className="relative -mt-10 z-40">
        <div className="container-shell">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg px-4 py-3">
            <motion.div
              className="flex gap-2 overflow-x-auto no-scrollbar"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-navy text-white shadow-md shadow-violet-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-brand-navy'
                }`}
              >
                {cat}
              </button>
            ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Product Showcase ── */}
      <section className="container-shell py-14 lg:py-20">
        {loading && <AppLoader label="Loading products..." className="py-24" />}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-8 text-center">
            <p className="text-sm text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-16 text-center">
            <p className="text-slate-500 font-semibold">No products found in this category.</p>
          </div>
        )}

        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product, index) => (
                <ProductShowcaseRow key={product._id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

export default ProductsPage;
