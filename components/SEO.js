import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Yogzan Fotosinema';
const DEFAULT_TITLE = 'Yogzan - Jasa Foto & Video Profesional di 7 Kota Indonesia';
const DEFAULT_DESC = 'Abadikan momen berharga dengan layanan foto dan video profesional. Wedding, prewedding, wisuda, event. Tersedia di Jogja, Jakarta, Surabaya, Bandung, Malang, Semarang, dan Bali.';
const BASE_URL = 'https://www.yogzan.com';

export default function SEO({ title, description, path, noindex }) {
  const pageTitle = title || DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const canonical = path ? `${BASE_URL}${path}` : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
