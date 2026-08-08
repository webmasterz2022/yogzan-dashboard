import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CareerClient from './_CareerClient';

export const metadata: Metadata = {
  title: 'Karir - Bergabung dengan Tim Yogzan Fotosinema',
  description:
    'Bergabunglah dengan tim fotografer dan videografer profesional Yogzan. Lihat lowongan karir dan kirim lamaran sekarang.',
  alternates: {
    canonical: 'https://www.yogzan.com/career',
    languages: { en: 'https://www.yogzan.com/en/career' },
  },
};

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CareerClient />;
}
