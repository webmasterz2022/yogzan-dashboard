import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../Button'
import styles from './styles.module.css'
import logo from '../../assets/logo-light.svg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'
import youtube from '../../assets/youtube.svg'
import tiktok from '../../assets/tiktok.svg'
import hiringLight from '../../assets/hiring-light.svg'
import bookingLight from '../../assets/booking-light.svg'
import arrowLight from '../../assets/arrow-light.svg'
import { bookingViaWA } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'
import ReactGA from 'react-ga4'

export default function Footer() {
  const { t } = useTranslation(['footer'])
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const clickPesanSekarang = () => {
    ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', t('getPriceList', { ns: 'footer' }))
    navigate(routes.BOOK())
  }

  const redirectFooter = () => {
    if (pathname.includes('/price-list')) {
      bookingViaWA()
    } else {
      navigate(routes.BOOK())
    }
  }

  return (
    <section className={styles.root}>
      {![routes.BOOK(), routes.CAREER(), routes.FIXBOOK()].includes(pathname) && (
        <div className={styles.booking}>
          <div>
            <h3>{t('ctaTitle', { ns: 'footer' })}</h3>
            <p>{t('ctaDesc', { ns: 'footer' })}</p>
          </div>
          <Button variant="active-square" handleClick={redirectFooter}>
            {t('getPriceList', { ns: 'footer' })}
            <img src={arrowLight} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.details}>
        <div>
          <div>
            <img className={styles.logo} src={logo} alt="Yogzan" />
            <div>
              <img onClick={() => window.open('https://www.facebook.com/yogzanfotosinema', '_blank')} className={styles.socmed} src={facebook} alt="FB" />
              <img onClick={() => window.open('https://www.instagram.com/yogzan.graduation/', '_blank')} className={styles.socmed} src={instagram} alt="IG" />
              <img onClick={bookingViaWA} className={styles.socmed} src={whatsapp} alt="WA" />
              <img onClick={() => window.open('https://www.youtube.com/channel/UCVcqZinwF4hVDXkMPSNybtg', '_blank')} className={styles.socmed} src={youtube} alt="YT" />
              <img onClick={() => window.open('https://www.tiktok.com/@yogzan.graduation', '_blank')} className={styles.socmed} src={tiktok} alt="TT" />
            </div>
          </div>
          <div>
            <Button icon={bookingLight} variant="active-rounded" handleClick={clickPesanSekarang}>{t('getPriceList', { ns: 'footer' })}</Button>
            <Button icon={hiringLight} variant="active-rounded" handleClick={() => navigate(routes.CAREER())}>{t('career', { ns: 'footer' })}</Button>
          </div>
          <div>
            <p>{t('contactUs', { ns: 'footer' })}</p>
            <p className={styles.email} onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=asktoyogzan@gmail.com', '_blank')}>{t('email', { ns: 'footer' })}</p>
            <p>{t('phone', { ns: 'footer' })}</p>
          </div>
        </div>
        <div>
          <div className={styles.line} />
          <p>{t('copyright', { ns: 'footer' })}</p>
        </div>
      </div>
    </section>
  )
}
