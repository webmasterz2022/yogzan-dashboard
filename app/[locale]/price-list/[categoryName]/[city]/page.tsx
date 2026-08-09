import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PriceListClient from './_PriceListClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string; city: string; locale: string }>;
}): Promise<Metadata> {
  const { categoryName, city, locale } = await params;
  const isEn = locale === 'en';
  const path = `/price-list/${encodeURIComponent(categoryName)}/${encodeURIComponent(city)}`;
  return {
    title: `Harga ${categoryName} ${city} - Yogzan Fotosinema`,
    description: `Lihat daftar harga paket foto dan video ${categoryName?.toLowerCase()} di ${city}. Yogzan Fotosinema - layanan profesional dan terjangkau.`,
    alternates: {
      canonical: isEn ? `https://www.yogzan.com/en${path}` : `https://www.yogzan.com${path}`,
      languages: {
        id: `https://www.yogzan.com${path}`,
        en: `https://www.yogzan.com/en${path}`,
        'x-default': `https://www.yogzan.com${path}`,
      },
    },
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
