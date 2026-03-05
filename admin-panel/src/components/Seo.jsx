import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description }) => (
  <Helmet>
    <title>{title ? `${title} | FINIQUE` : 'FINIQUE | Premium uPVC Windows & Doors'}</title>
    <meta
      name="description"
      content={description || 'FINIQUE is a premium uPVC windows and doors manufacturer for residential and commercial projects.'}
    />
  </Helmet>
);

export default Seo;
