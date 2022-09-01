import React from 'react'
import styles from './styles.module.css'
import logoDark from '../../assets/logo-dark.svg'
import homeLight from '../../assets/home-light.svg'
import homePrimary from '../../assets/home-primary.svg'
import portfolioLight from '../../assets/portfolio-light.svg'
import portfolioPrimary from '../../assets/portfolio-primary.svg'
import Button from '../Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'

export default function Navbar() {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const menus = [
    {
      title: 'Home',
      icon: routes.HOMEPAGE() === pathname ? homeLight : homePrimary,
      handleClick: () => navigate(routes.HOMEPAGE()),
      variant: routes.HOMEPAGE() === pathname ? 'active-rounded' : 'negative',
    },{
      title: 'Portfolio',
      icon: routes.GALLERY() === pathname ? portfolioLight : portfolioPrimary,
      handleClick: () => navigate(routes.GALLERY()),
      variant: routes.GALLERY() === pathname ? 'active-rounded' : 'negative',
    }
  ]

  return (
    <div className={styles.root}>
      <img src={logoDark} alt="yogzan"/>
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
      </div>
    </div>
  )
}
