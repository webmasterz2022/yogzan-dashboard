import React from 'react'
import Button from '../Button'
import styles from './styles.module.css'
import logo from '../../assets/logo-light.svg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'
import portfolioLight from '../../assets/portfolio-light.svg'
import hiringLight from '../../assets/hiring-light.svg'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../configs/routes'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <section className={styles.root}>
      <div className={styles.booking}>
        <div>
          <h3>What they say?</h3>
          <p>Get inspired with some of the best ideas for your holiday photo shoot</p>
        </div>
        <Button variant="active-square">Book now!</Button>
      </div>
      <div className={styles.details}>
        <div>
          <div>
            <img className={styles.logo} src={logo} alt="Yogzan" />
            <div>
              <img className={styles.socmed} src={facebook} alt="FB" />
              <img className={styles.socmed} src={instagram} alt="IG" />
              <img className={styles.socmed} src={whatsapp} alt="WA" />
            </div>
          </div>
          <div>
            <Button icon={portfolioLight} variant="active-rounded" handleClick={() => navigate(routes.GALLERY())}>Portfolio</Button>
            <Button icon={hiringLight} variant="active-rounded" handleClick={() => {}}>Hiring</Button>
            <Button icon={portfolioLight} variant="active-rounded" handleClick={() => navigate(routes.GALLERY())}>Portfolio</Button>
          </div>
          <div>
            <p>Hubungi Kami</p>
            <p>info@yogzan.com</p>
            <p>(+62)822-888-4737</p>
            <p>Yogzan Tower, <br/> 
              Jalan Prof. Dr. Soepomo No 139, Tebet, Jakarta Selatan, Indonesia - 12810 
            </p>
          </div>
        </div>
        <div>
          <div className={styles.line} />
          <p>Copyright Yogzan 2022. All Rights Reserved</p>
        </div>
      </div>
    </section>
  )
}
