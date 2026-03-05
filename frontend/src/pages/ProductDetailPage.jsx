import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLoader from '../components/AppLoader';
import EnquiryForm from '../components/EnquiryForm';
import Seo from '../components/Seo';
import api from '../services/api';
import { slideLeft, slideRight, slideUp, staggerContainer, viewport } from '../utils/motion';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-shell py-14">
        <AppLoader label="Loading product..." />
      </div>
    );
  }
  if (error || !product) {
    return <div className="container-shell py-14 text-sm text-red-700">{error || 'Product not found'}</div>;
  }

  return (
    <motion.section
      className="container-shell py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <Seo title={product.title} description={product.description} />
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-6" variants={slideRight}>
          <motion.img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=900'}
            alt={product.title}
            className="h-96 w-full rounded-xl object-cover"
            loading="eager"
            variants={slideUp}
          />
          {product.images?.length > 1 && (
            <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3" variants={staggerContainer}>
              {product.images.slice(1).map((img) => (
                <motion.img
                  key={img}
                  src={img}
                  alt={product.title}
                  className="h-32 w-full rounded-lg object-cover"
                  loading="lazy"
                  variants={slideUp}
                />
              ))}
            </motion.div>
          )}
          {product.videoUrl && (
            <motion.video controls preload="metadata" className="h-80 w-full rounded-xl bg-black object-cover" variants={slideUp}>
              <source src={product.videoUrl} />
            </motion.video>
          )}
          <motion.article className="card" variants={slideUp}>
            <h1 className="text-2xl font-bold text-brand-navy">{product.title}</h1>
            <p className="mt-3 text-sm text-slate-600">{product.description}</p>
          </motion.article>
          <motion.article className="card" variants={slideUp}>
            <h2 className="text-lg font-bold text-brand-navy">Technical Specifications</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {Object.keys(product.specifications || {}).length ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="rounded-md border border-brand-border p-3">
                    <p className="font-semibold text-brand-navy">{key}</p>
                    <p className="mt-1">{String(value)}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">Specifications will be shared upon enquiry.</p>
              )}
            </div>
          </motion.article>
        </motion.div>

        <motion.div variants={slideLeft}>
          <EnquiryForm productId={product._id} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductDetailPage;
