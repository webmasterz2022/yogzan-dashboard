import React from 'react'
import Button from '../Button'
import styles from './styles.module.css'
import logo from '../../assets/logo-light.svg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'
import youtube from '../../assets/youtube.svg'
import hiringLight from '../../assets/hiring-light.svg'
import bookingLight from '../../assets/booking-light.svg'
import { bookingViaWA } from '../../utils'

export default function Footer() {
  return (
    <section className={styles.root}>
      <div className={styles.booking}>
        <div>
          <p>Setiap momen punya cerita, dari cinta, perjuangan hingga air mata kebahagiaan. Abadikan setiap cerita berhargamu dengan layanan foto terbaik bersama Yogzan. </p>
        </div>
        <Button variant="active-square" handleClick={bookingViaWA}>Pesan Sekarang</Button>
      </div>
      <div className={styles.details}>
        <div>
          <div>
            <img className={styles.logo} src={logo} alt="Yogzan" />
            <div>
              <img className={styles.socmed} src={facebook} alt="FB" />
              <img className={styles.socmed} src={instagram} alt="IG" />
              <img className={styles.socmed} src={whatsapp} alt="WA" />
              <img className={styles.socmed} src={youtube} alt="YT" />
            </div>
          </div>
          <div>
            <Button icon={bookingLight} variant="active-rounded" handleClick={bookingViaWA}>Pesan Sekarang</Button>
            <Button icon={hiringLight} variant="active-rounded" handleClick={() => {}}>Karir</Button>
          </div>
          <div>
            <p>Hubungi Kami</p>
            <p>asktoyogzan@gmail.com</p>
            <p>(+62) 815-7474-3528</p>
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
