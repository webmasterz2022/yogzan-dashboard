import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomeClient from './_HomeClient';

const BASE_URL = 'https://www.yogzan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: 'Yogzan - Jasa Foto & Video Profesional di 7 Kota Indonesia',
    description:
      'Abadikan momen berharga dengan layanan foto dan video profesional. Wedding, prewedding, wisuda, event. Tersedia di Jogja, Jakarta, Surabaya, Bandung, Malang, Semarang, dan Bali.',
    alternates: {
      canonical: isEn ? `${BASE_URL}/en` : `${BASE_URL}/`,
      languages: {
        id: `${BASE_URL}/`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/`,
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
