import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FixBookClient from './_FixBookClient';

export const metadata: Metadata = {
  title: 'Booking Foto & Video - Yogzan Fotosinema',
  description: 'Pesan sesi foto dan video profesional dengan Yogzan. Pilih paket wisuda, wedding, prewedding, keluarga, atau event di kota terdekat.',
  robots: { index: false, follow: false },
};

export default async function FixBookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FixBookClient />;
}
