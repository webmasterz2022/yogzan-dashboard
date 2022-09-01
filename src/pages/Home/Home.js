import React from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo-dark.svg'

export default function Home() {
  return (
    <section className={styles.root}>
      <img src={logo} alt='yogzan' />
      <h4 className={styles.heading}>
        Get expert photographers and amazing photos, 
        starting from just IDR 1,460,000 in 500+ cities worldwide
      </h4>
    </section>
  )
}
