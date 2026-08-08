import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomeClient from './_HomeClient';

export const metadata: Metadata = {
  title: 'Yogzan - Jasa Foto & Video Profesional di 7 Kota Indonesia',
  description:
    'Abadikan momen berharga dengan layanan foto dan video profesional. Wedding, prewedding, wisuda, event. Tersedia di Jogja, Jakarta, Surabaya, Bandung, Malang, Semarang, dan Bali.',
  alternates: {
    canonical: 'https://www.yogzan.com/',
    languages: { en: 'https://www.yogzan.com/en' },
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
