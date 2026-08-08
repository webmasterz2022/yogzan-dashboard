import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BookClient from './_BookClient';

export const metadata: Metadata = {
  title: 'Pesan Sekarang - Yogzan Fotosinema',
  description: 'Dapatkan daftar harga dan pesan layanan foto & video profesional Yogzan. Tersedia untuk wedding, wisuda, keluarga, dan event lainnya.',
  robots: { index: false, follow: false },
};

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookClient />;
}
