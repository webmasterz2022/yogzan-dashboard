import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PriceListClient from './_PriceListClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string; city: string }>;
}): Promise<Metadata> {
  const { categoryName, city } = await params;
  return {
    title: `Harga ${categoryName} ${city} - Yogzan Fotosinema`,
    description: `Lihat daftar harga paket foto dan video ${categoryName?.toLowerCase()} di ${city}. Yogzan Fotosinema - layanan profesional dan terjangkau.`,
  };
}

export default async function PriceListPage({
  params,
}: {
  params: Promise<{ locale: string; categoryName: string; city: string }>;
}) {
  const { locale, categoryName, city } = await params;
  setRequestLocale(locale);
  return <PriceListClient categoryName={categoryName} city={city} />;
}
