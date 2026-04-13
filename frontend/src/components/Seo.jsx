import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  buildCanonicalUrl,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
  siteConfig,
  toAbsoluteUrl
} from '../utils/siteSeo';

const Seo = ({
  title,
  description,
  image,
  type = 'website',
  keywords,
  canonical,
  schema,
  noIndex = false
}) => {
  const location = useLocation();
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.defaultTitle}`;
  const pageDescription = description || siteConfig.defaultDescription;
  const canonicalUrl = canonical || buildCanonicalUrl(location.pathname);
  const imageUrl = toAbsoluteUrl(image || siteConfig.defaultImage);
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow';
  const schemaMarkup = [
    buildWebSiteSchema(),
    buildOrganizationSchema(),
    buildLocalBusinessSchema(),
    ...(Array.isArray(schema) ? schema : schema ? [schema] : [])
  ];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content="#101f36" />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {schemaMarkup.map((item, index) => (
        <script key={`${item['@type'] || 'schema'}-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
