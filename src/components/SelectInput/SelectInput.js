import React from 'react'
import styles from './styles.module.css'

export default function SelectInput(props) {
  const {placeholder, options, value} = props
  return (
    <select value={value} className={styles.root}>
      <option>{placeholder}</option>
      {options?.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}
