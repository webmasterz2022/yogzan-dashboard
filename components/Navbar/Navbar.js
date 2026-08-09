'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './styles.module.css';
import logoDark from '../../public/assets/logo-dark.svg';
import homeLight from '../../public/assets/home-light.svg';
import homePrimary from '../../public/assets/home-primary.svg';
import portfolioLight from '../../public/assets/portfolio-light.svg';
import portfolioPrimary from '../../public/assets/portfolio-primary.svg';
import hiringLight from '../../public/assets/hiring-light.svg';
import hiringPrimary from '../../public/assets/hiring-primary.svg';
import bookingPrimary from '../../public/assets/booking-primary.svg';
import bookingLight from '../../public/assets/booking-light.svg';
import chevron from '../../public/assets/chevron.svg';
import Button from '../Button';
import { useRouter, usePathname } from '../../i18n/navigation';
import { usePathname as useNextPathname } from 'next/navigation';
import { routes } from '../../configs/routes';
import { getDeviceType } from '../../utils';
import ReactGA from 'react-ga4';
import { Select } from 'antd';
import Image from 'next/image';

const TOPBAR_BG = 'linear-gradient(7.14deg, #FFF5F1 -1%, #FFFFFF -7.58%, #FCE6DD 100.1%)';
const TOPBAR_SHADOW = '0px 4px 12px -4px rgba(138, 132, 130, 0.15)';

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const fullPathname = useNextPathname();
  const logoRef = useRef();
  const rootRef = useRef();
  const topBarRef = useRef();
  const device = getDeviceType();

  const sanitizedPath = pathname;
  const isHome = sanitizedPath === routes.HOMEPAGE();

  const menus = [
    {
      title: t('home'),
      icon: routes.HOMEPAGE() === sanitizedPath ? homeLight : homePrimary,
      handleClick: () => router.push(routes.HOMEPAGE()),
      variant: routes.HOMEPAGE() === sanitizedPath ? 'active-rounded' : 'negative',
    },
    {
      title: t('gallery'),
      icon: routes.GALLERY() === sanitizedPath ? portfolioLight : portfolioPrimary,
      handleClick: () => router.push(routes.GALLERY()),
      variant: routes.GALLERY() === sanitizedPath ? 'active-rounded' : 'negative',
    },
    {
      title: t('career'),
      icon: routes.CAREER() === sanitizedPath ? hiringLight : hiringPrimary,
      handleClick: () => router.push(routes.CAREER()),
      variant: routes.CAREER() === sanitizedPath ? 'active-rounded' : 'negative',
    },
    {
      title: t('getPriceList'),
      icon: routes.BOOK() === sanitizedPath ? bookingLight : bookingPrimary,
      handleClick: () => {
        ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', t('getPriceList'));
        router.push(routes.BOOK());
      },
      variant:
        routes.BOOK() === sanitizedPath ? 'active-rounded' : 'highlight-rounded',
    },
  ];

  // Desktop: hide logo/shadow on home, reveal on scroll
  useEffect(() => {
    if (!logoRef.current || !rootRef.current) return;
    if (device === 'desktop' && sanitizedPath === routes.HOMEPAGE()) {
      logoRef.current.style.opacity = 0;
      window.onscroll = () => {
        if (device === 'desktop' && sanitizedPath === routes.HOMEPAGE()) {
          const scrolled =
            document.body.scrollTop > 120 ||
            document.documentElement.scrollTop > 120;
          logoRef.current.style.opacity = scrolled ? 'unset' : 0;
          rootRef.current.style.boxShadow = scrolled
            ? '0px 11px 12px -4px rgba(138, 132, 130, 0.21)'
            : 'unset';
        }
      };
    } else {
      logoRef.current.style.opacity = 'unset';
      window.onscroll = () => {};
    }
  }, [sanitizedPath]);

  // Mobile home: add topBar bg/shadow when user scrolls past hero
  useEffect(() => {
    if (device === 'desktop' || !isHome || !topBarRef.current) return;
    const handleMobileScroll = () => {
      const scrolled = window.scrollY > 60;
      if (topBarRef.current) {
        topBarRef.current.style.background = scrolled ? TOPBAR_BG : 'transparent';
        topBarRef.current.style.boxShadow = scrolled ? TOPBAR_SHADOW : 'none';
        topBarRef.current.style.borderRadius = scrolled ? '0 0 16px 16px' : '0';
      }
    };
    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleMobileScroll);
  }, [isHome, device]);

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={rootRef} className={styles.root} style={isHome ? { boxShadow: 'none' } : undefined}>
      {/* Mobile-only top bar: logo (hidden on home) + language selector */}
      <div ref={topBarRef} className={`${styles.topBar} ${isHome ? styles.topBarHome : ''}`}>
        {!isHome && <img src={logoDark.src} alt="yogzan" onClick={() => router.push('/')} />}
        <Select
          className={styles.languageSwitchTop}
          suffixIcon={<img src={chevron.src} alt="chevron" />}
          value={locale}
          onChange={switchLocale}
          getPopupContainer={trigger => trigger.parentElement}
          options={[
            { value: 'id', label: <span>🇮🇩 ID</span> },
            { value: 'en', label: <span>🇺🇸 EN</span> },
          ]}
        />
      </div>

      {/* Desktop logo (hidden on mobile) */}
      <img ref={logoRef} src={logoDark.src} alt="yogzan" style={isHome ? { opacity: 0 } : undefined} onClick={() => router.push('/')} />

      {/* Menu buttons + desktop language selector */}
      <div className={styles.menuBar}>
        {menus.map((menu, idx) => (
          <Button key={idx} icon={menu.icon.src} variant={menu.variant} handleClick={menu.handleClick}>
            {menu.title}
          </Button>
        ))}
        <Select
          className={styles.languageSwitch}
          suffixIcon={<img src={chevron.src} alt="chevron" />}
          value={locale}
          onChange={switchLocale}
          getPopupContainer={trigger => trigger.parentElement}
          options={[
            { value: 'id', label: <span>🇮🇩 ID</span> },
            { value: 'en', label: <span>🇺🇸 EN</span> },
          ]}
        />
      </div>
    </div>
  );
}
