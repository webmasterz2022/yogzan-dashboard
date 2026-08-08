'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from '../Button';
import styles from './styles.module.css';
import logo from '../../public/assets/logo-light.svg';
import facebook from '../../public/assets/facebook.svg';
import instagram from '../../public/assets/instagram.svg';
import whatsapp from '../../public/assets/whatsapp.svg';
import youtube from '../../public/assets/youtube.svg';
import tiktok from '../../public/assets/tiktok.svg';
import hiringLight from '../../public/assets/hiring-light.svg';
import bookingLight from '../../public/assets/booking-light.svg';
import arrowLight from '../../public/assets/arrow-light.svg';
import { bookingViaWA, domNum, intlNum } from '../../utils';
import { usePathname, useRouter } from '../../i18n/navigation';
import { routes } from '../../configs/routes';
import ReactGA from 'react-ga4';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const clickPesanSekarang = () => {
    ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', t('getPriceList'));
    router.push(routes.BOOK());
  };

  const redirectFooter = () => {
    if (pathname.includes('/price-list')) {
      locale === 'id' ? bookingViaWA(domNum) : bookingViaWA(intlNum);
    } else {
      router.push(routes.BOOK());
    }
  };

  const handleClickWA = () => {
    locale === 'id' ? bookingViaWA(domNum) : bookingViaWA(intlNum);
  };

  const hideCTA = [routes.BOOK(), routes.CAREER(), routes.FIXBOOK()].includes(pathname);

  return (
    <section className={styles.root}>
      {!hideCTA && (
        <div className={styles.booking}>
          <div>
            <h3>{t('ctaTitle')}</h3>
            <p>{t('ctaDesc')}</p>
          </div>
          <Button variant="active-square" handleClick={redirectFooter}>
            {t('getPriceList')}
            <img src={arrowLight.src} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.details}>
        <div>
          <div>
            <img className={styles.logo} src={logo.src} alt="Yogzan" />
            <div>
              <img onClick={() => window.open('https://www.facebook.com/yogzanfotosinema', '_blank')} className={styles.socmed} src={facebook.src} alt="FB" />
              <img onClick={() => window.open('https://www.instagram.com/yogzan.graduation/', '_blank')} className={styles.socmed} src={instagram.src} alt="IG" />
              <img onClick={handleClickWA} className={styles.socmed} src={whatsapp.src} alt="WA" />
              <img onClick={() => window.open('https://www.youtube.com/channel/UCVcqZinwF4hVDXkMPSNybtg', '_blank')} className={styles.socmed} src={youtube.src} alt="YT" />
              <img onClick={() => window.open('https://www.tiktok.com/@yogzan.graduation', '_blank')} className={styles.socmed} src={tiktok.src} alt="TT" />
            </div>
          </div>
          <div>
            <Button icon={bookingLight.src} variant="active-rounded" handleClick={clickPesanSekarang}>{t('getPriceList')}</Button>
            <Button icon={hiringLight.src} variant="active-rounded" handleClick={() => router.push(routes.CAREER())}>{t('career')}</Button>
          </div>
          <div>
            <p>{t('contactUs')}</p>
            <p className={styles.email} onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=asktoyogzan@gmail.com', '_blank')}>{t('email')}</p>
            <p>{t('phone_1')}</p>
          </div>
        </div>
        <div>
          <div className={styles.line} />
          <p>{t('copyright')}</p>
        </div>
      </div>
    </section>
  );
}
