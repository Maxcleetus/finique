import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AppLoader from '../components/AppLoader';
import ProductCard from '../components/ProductCard';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideUp, staggerContainer, viewport } from '../utils/motion';

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

  return (
    <motion.section
      className="container-shell py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <Seo title="Products" description="Browse FINIQUE product range for premium uPVC windows and doors." />
      <motion.h1 className="section-title" variants={slideUp}>
        Product Catalogue
      </motion.h1>
      <motion.p className="section-subtitle" variants={slideUp}>
        Category-based systems tailored for performance and design flexibility.
      </motion.p>

      <motion.div className="mt-6 flex flex-wrap gap-3" variants={slideUp}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold ${
              activeCategory === cat
                ? 'border-brand-navy bg-brand-navy text-white'
                : 'border-brand-border bg-white text-brand-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
        {loading && <AppLoader label="Loading products..." className="md:col-span-2 lg:col-span-3" />}
        {!loading && error && <p className="text-sm text-red-700">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && <p className="text-sm text-slate-500">No products found.</p>}
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProductsPage;
