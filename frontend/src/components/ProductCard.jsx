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
      className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=900'}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {/* Category pill overlay */}
        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm">
            {product.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <Link
            to={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-navy shadow-lg transition-transform duration-300 translate-y-4 group-hover:translate-y-0"
          >
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-violet-800 transition-colors">{product.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <Link
            to={`/products/${product.slug}`}
            className="text-sm font-bold text-brand-navy inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
          >
            Explore
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="h-1.5 w-1.5 rounded-full bg-violet-200" />
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
