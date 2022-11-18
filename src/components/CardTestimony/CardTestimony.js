import React from 'react'
import styles from './styles.module.css'
import miniIg from '../../assets/mini-instagram.svg'

export default function CardTestimony(props) {
  const { image, desc, name, link } = props
  return (
    <div className={styles.root}>
      <div>
        {image && <img src={image} alt=""/>}
        {desc && <p>"{desc}"</p>}
      </div>
      <div>
        <img src={miniIg} alt={'ig'}/>
        <a href={link} target="_blank" rel="noreferrer">{name}</a>
      </div>
    </div>
  )
}
