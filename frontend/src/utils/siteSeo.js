export const siteConfig = {
  name: 'FINIQUE',
  legalName: 'FINIQUE Manufacturing Pvt. Ltd.',
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://finiquewindows.com').replace(/\/+$/, ''),
  defaultTitle: 'Premium Aluminium Windows & Doors',
  defaultDescription:
    'FINIQUE designs and manufactures premium aluminium windows and doors for residential and commercial projects across India.',
  defaultImage: '/assets/logo.png',
  phone: '+91 98765 43210',
  email: 'hello@finique.com',
  addressLocality: 'Kerala',
  addressCountry: 'IN',
  mapUrl:
    'https://www.google.com/maps/place/Finique+Windows/@10.2978812,76.147169,17z/data=!3m1!4b1!4m6!3m5!1s0x3b081f6faaa697cf:0xdb2288bf3b2975aa!8m2!3d10.2978812!4d76.147169!16s%2Fg%2F11zjxtr94k?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D',
  geo: {
    latitude: 10.2978812,
    longitude: 76.147169
  },
  sameAs: []
};

export const getSiteOrigin = () => {
  if (siteConfig.siteUrl) return siteConfig.siteUrl;
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return '';
};

export const toAbsoluteUrl = (value = '/') => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;

  const origin = getSiteOrigin();
  if (!origin) return value;

  return new URL(value.startsWith('/') ? value : `/${value}`, origin).toString();
};

export const buildCanonicalUrl = (pathname = '/') => {
  const origin = getSiteOrigin();
  if (!origin) return '';

  return new URL(pathname || '/', `${origin}/`).toString();
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  url: siteConfig.siteUrl,
  logo: toAbsoluteUrl(siteConfig.defaultImage),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  sameAs: siteConfig.sameAs
});

export const buildLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: siteConfig.legalName,
  image: toAbsoluteUrl(siteConfig.defaultImage),
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.addressLocality,
    addressCountry: siteConfig.addressCountry
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude
  },
  areaServed: 'India',
  hasMap: siteConfig.mapUrl
});

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.defaultDescription
});
