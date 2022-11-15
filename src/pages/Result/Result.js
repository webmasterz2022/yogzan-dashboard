import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { getStoredPhotos } from '../../store/action'
import styles from './styles.module.css'

export default function Result() {
  const [isEmpty, setIsEmpty] = useState(false)
  const [link, setLink] = useState('')
  const { path } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getLink = (path) => {
    if(path.includes('http')) {
      return path
    } else {
      return `http://${path}`
    }
  } 

  useEffect(() => {
    dispatch(getStoredPhotos(path, (path) => {
      if(path) {
        setLink(path)
        setIsEmpty(false)
        setTimeout(() => {
          window.location.href = getLink(path)
        }, 1000)
      } else {
        setIsEmpty(true)
      }
    }))    
  }, [path])
  return (
    <div className={styles.root}>
      <h3>{isEmpty ? 'sorry, you have no photos' : 'checking your photos...'}</h3>
      {link && <Button onClick={() => window.location.href = getLink(link)}>click here if you are not redirected</Button>}
    </div>
  )
}
