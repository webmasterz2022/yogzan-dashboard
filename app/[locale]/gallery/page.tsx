import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import GalleryClient from './_GalleryClient';

const BASE_URL = 'https://www.yogzan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: 'Galeri Foto & Video - Yogzan Fotosinema',
    description:
      'Lihat portofolio foto dan video Yogzan: wisuda, wedding, prewedding, keluarga, dan event di berbagai kota Indonesia.',
    alternates: {
      canonical: isEn ? `${BASE_URL}/en/gallery` : `${BASE_URL}/gallery`,
      languages: {
        id: `${BASE_URL}/gallery`,
        en: `${BASE_URL}/en/gallery`,
        'x-default': `${BASE_URL}/gallery`,
      },
    },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Suspense fallback={null}><GalleryClient /></Suspense>;
}
