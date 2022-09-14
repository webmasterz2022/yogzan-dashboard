import React from 'react'
import styles from './styles.module.css'
import arrowDark from '../../assets/arrow-dark.svg'

export default function CategoryCard(props) {
  const { image, title, handleClick } = props
  return (
    <div className={styles.root} onClick={handleClick}>
      <img src={image} alt="img"/>
      <div>
        <p>{title}</p>
        <img src={arrowDark} alt="..."/>
      </div>
    </div>
  )
}
