import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'
import logoDark from '../../assets/logo-dark.svg'
import homeLight from '../../assets/home-light.svg'
import homePrimary from '../../assets/home-primary.svg'
import portfolioLight from '../../assets/portfolio-light.svg'
import portfolioPrimary from '../../assets/portfolio-primary.svg'
import hiringLight from '../../assets/hiring-light.svg'
import hiringPrimary from '../../assets/hiring-primary.svg'
import bookingPrimary from '../../assets/booking-primary.svg'
import bookingLight from '../../assets/booking-light.svg'
import appsIcon from '../../assets/apps.svg'
import Button from '../Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'
import { getDeviceType } from '../../utils'
import ReactGA from 'react-ga4'
import { Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import chevron from '../../assets/chevron.svg'


export default function Navbar() {
  const { t, i18n } = useTranslation(['navbar'])
  const device = getDeviceType()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const logoRef = useRef()
  const rootRef = useRef()

  const getPrefixedPath = (path) => {
    if (window.location.pathname.startsWith('/en')) {
      return '/en' + (path.startsWith('/') ? path : '/' + path);
    }
    return path;
  };

  const sanitizedPath = pathname.startsWith('/en') ? pathname.replace('/en', '') : pathname;
  console.log('sanitizedPath', sanitizedPath);
  const menus = [
    {
      title: t('home', { ns: 'navbar' }),
      icon: routes.HOMEPAGE() === sanitizedPath ? homeLight : homePrimary,
      handleClick: () => navigate(getPrefixedPath(routes.HOMEPAGE())),
      variant: routes.HOMEPAGE() === sanitizedPath ? 'active-rounded' : 'negative',
    }, {
      title: t('gallery', { ns: 'navbar' }),
      icon: routes.GALLERY() === sanitizedPath ? portfolioLight : portfolioPrimary,
      handleClick: () => navigate(getPrefixedPath(routes.GALLERY())),
      variant: routes.GALLERY() === sanitizedPath ? 'active-rounded' : 'negative',
    }, {
      title: t('career', { ns: 'navbar' }),
      icon: routes.CAREER() === sanitizedPath ? hiringLight : hiringPrimary,
      handleClick: () => navigate(getPrefixedPath(routes.CAREER())),
      variant: routes.CAREER() === sanitizedPath ? 'active-rounded' : 'negative',
    }, {
      title: t('getPriceList', { ns: 'navbar' }),
      icon: routes.BOOK() === sanitizedPath ? bookingLight : bookingPrimary,
      handleClick: () => {
        ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', t('getPriceList', { ns: 'navbar' }))
        navigate(getPrefixedPath(routes.BOOK()))
      },
      variant: routes.BOOK() === sanitizedPath ? 'active-rounded' : 'highlight-rounded',
    }
  ]

  useEffect(() => {
    if (device === 'desktop' && sanitizedPath === routes.HOMEPAGE()) {
      logoRef.current.style.opacity = 0
      window.onscroll = () => {
        if (device === 'desktop' && sanitizedPath === routes.HOMEPAGE()) {
          if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
            logoRef.current.style.opacity = 'unset'
            rootRef.current.style.boxShadow = '0px 11px 12px -4px rgba(138, 132, 130, 0.21)';
          } else {
            logoRef.current.style.opacity = 0
            rootRef.current.style.boxShadow = 'unset';
          }
        }
      }
    } else {
      logoRef.current.style.opacity = 'unset'
      window.onscroll = () => { }
    }
  }, [sanitizedPath])

  return (
    <div ref={rootRef} className={styles.root}>
      <img ref={logoRef} src={logoDark} alt="yogzan" onClick={() => navigate('/')} />
      <div className={styles.menuBar}>
        {menus.map((menu, idx) => (
          <Button
            key={idx}
            icon={menu.icon}
            variant={menu.variant}
            handleClick={menu.handleClick}
          >
            {menu.title}
          </Button>
        ))}
        <Select
          className={styles.languageSwitch}
          suffixIcon={<img src={chevron} alt="chevron" />}
          value={i18n.language}
          onChange={(newLang) => {
            i18n.changeLanguage(newLang);
            if (window.location.pathname.startsWith('/en') && newLang === 'id') {
              window.location.pathname = window.location.pathname.replace('/en', '') || '/';
            } else if (!window.location.pathname.startsWith('/en') && newLang === 'en') {
              window.location.pathname = '/en' + window.location.pathname;
            }
          }}
          options={[
            { value: 'id', label: <span>🇮🇩 ID</span> },
            { value: 'en', label: <span>🇺🇸 EN</span> }
          ]}
        />
      </div>
    </div>
  )
}
