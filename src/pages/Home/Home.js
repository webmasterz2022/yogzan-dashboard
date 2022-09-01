import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo-dark.svg'
import sampleVertical from '../../assets/sample-vertical.png'
import sampleHorizontal from '../../assets/sample-horizontal.png'
import Button from '../../components/Button'

export default function Home() {
  const galleryRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      galleryRef.current.scrollTo(0, window.screen.height/6)
    }, 100)
  }, [])

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <img src={logo} alt='yogzan' />
        <h4 className={styles.heading}>
          Get expert photographers and amazing photos, 
          starting from just IDR 1,460,000 in 500+ cities worldwide
        </h4>
      </div>
      <div className={styles.galleries}>
        <div className={styles.overlay} />
        <div ref={galleryRef}>
          <img className={styles.satu} alt="im" src={sampleVertical}/>
          <img className={styles.dua} alt="im" src={sampleVertical}/>
          <div className={styles.empty} />
          <img className={styles.tiga} alt="im" src={sampleHorizontal}/>
          <img className={styles.empat} alt="im" src={sampleVertical}/>
          <img className={styles.lima} alt="im" src={sampleVertical}/>

          <img className={styles.enam} alt="im" src={sampleVertical}/>
          <img className={styles.tujuh} alt="im" src={sampleHorizontal}/>
          <Button variant="active-square">Book Now</Button>
          <img className={styles.delapan} alt="im" src={sampleVertical}/>
          <img className={styles.sembilan} alt="im" src={sampleVertical}/>
          <img className={styles.sepuluh} alt="im" src={sampleHorizontal}/>

          <img className={styles.sebelas} alt="im" src={sampleHorizontal}/>
          <img className={styles.duabelas} alt="im" src={sampleVertical}/>
        </div>
        <div>
          
        </div>
      </div>
    </section>
  )
}
