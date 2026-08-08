import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import GalleryClient from './_GalleryClient';

export const metadata: Metadata = {
  title: 'Galeri Foto & Video - Yogzan Fotosinema',
  description:
    'Lihat portofolio foto dan video Yogzan: wisuda, wedding, prewedding, keluarga, dan event di berbagai kota Indonesia.',
  alternates: {
    canonical: 'https://www.yogzan.com/gallery',
    languages: { en: 'https://www.yogzan.com/en/gallery' },
  },
};

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Suspense fallback={null}><GalleryClient /></Suspense>;
}
