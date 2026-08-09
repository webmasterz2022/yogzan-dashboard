import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CareerClient from './_CareerClient';

const BASE_URL = 'https://www.yogzan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: 'Karir - Bergabung dengan Tim Yogzan Fotosinema',
    description:
      'Bergabunglah dengan tim fotografer dan videografer profesional Yogzan. Lihat lowongan karir dan kirim lamaran sekarang.',
    alternates: {
      canonical: isEn ? `${BASE_URL}/en/career` : `${BASE_URL}/career`,
      languages: {
        id: `${BASE_URL}/career`,
        en: `${BASE_URL}/en/career`,
        'x-default': `${BASE_URL}/career`,
      },
    },
  };
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CareerClient />;
}
