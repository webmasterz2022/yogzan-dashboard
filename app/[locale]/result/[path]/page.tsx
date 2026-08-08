import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ResultClient from './_ResultClient';

export const metadata: Metadata = {
  title: 'Result - Yogzan Fotosinema',
  robots: { index: false, follow: false },
};

export default async function ResultPage({ params }: { params: Promise<{ locale: string; path: string }> }) {
  const { locale, path } = await params;
  setRequestLocale(locale);
  return <ResultClient path={path} />;
}
