import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideUp, viewport } from '../utils/motion';

const ProductCard = ({ product }) => {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={slideUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-panel"
    >
      <img
        src={product.images?.[0] || 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=900'}
        alt={product.title}
        className="h-56 w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy">{product.category}</p>
        <h3 className="mt-2 text-lg font-bold text-brand-ink">{product.title}</h3>
        <p className="mt-2 h-10 overflow-hidden text-sm text-slate-600">{product.description}</p>
        <Link to={`/products/${product.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-navy">
          View details
        </Link>
      </div>
    </motion.article>
  );
};

export default ProductCard;
