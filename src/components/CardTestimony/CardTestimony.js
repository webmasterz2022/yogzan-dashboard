import React from 'react'
import styles from './styles.module.css'

export default function CardTestimony(props) {
  const { image, desc, name } = props
  return (
    <div className={styles.root}>
      <img src={image} alt=""/>
      <div>
        <p>"{desc}"</p>
        <p>@{name}</p>
      </div>
    </div>
  )
}
