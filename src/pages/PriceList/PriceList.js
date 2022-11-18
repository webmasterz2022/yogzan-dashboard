import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { getAllCategories } from '../../store/action'

export default function PriceList() {
  const dispatch = useDispatch()
  const { categories } = useSelector(s => s)
  const { categoryName, city } = useParams()
  const iframeRef = useRef()

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if(iframeRef.current) {
      console.log('content height', iframeRef.current.contentWindow.document.body.scrollHeight)
      iframeRef.current.style.height = `${iframeRef.current.contentWindow.document.body.scrollHeight}px`
    }
  }, [iframeRef])

  const currentCategory = categories.find(e => e.name?.toLowerCase() === categoryName.toLowerCase())
  const currentPriceList = currentCategory?.cities?.find(e => e.name?.toLowerCase() === city.toLowerCase())
  
  return (
    <div className={styles.root}>
      <h2>Daftar Harga</h2>
      <h3>{categoryName} - {city}</h3>
      <br/> 
      {currentPriceList?.file && (
        <iframe
          ref={iframeRef}
          width="100%"
          title={`${categoryName} - ${city}`}
          src={`${currentPriceList.file.replace('/view?usp=sharing', '/preview')}`}
        />
      )}
    </div>
  )
}
