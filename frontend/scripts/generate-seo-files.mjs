import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://finiqqauewindows.com').replace(/\/+$/, '');
const publicDir = path.resolve(process.cwd(), 'public');

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${new URL(route.path, `${siteUrl}/`).toString()}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const manifest = {
  name: 'FINIQUE',
  short_name: 'FINIQUE',
  description: 'Premium aluminium windows and doors for residential and commercial projects.',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#101f36',
  icons: [
    {
      src: '/favicon.ico',
      sizes: '660x661',
      type: 'image/png'
    }
  ]
};

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated SEO files for ${siteUrl}`);
