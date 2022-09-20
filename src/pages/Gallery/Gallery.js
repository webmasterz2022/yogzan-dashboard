import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import pinLocation from '../../assets/pin-location.svg'
import iconImage from '../../assets/icon-image.svg'
import arrowLight from '../../assets/arrow-light.svg'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import {useDispatch, useSelector} from 'react-redux'
import { getCities, getPortfolioImages } from '../../store/action'
import Button from '../../components/Button'
import { bookingViaWA } from '../../utils'

export default function Gallery() {
  const dispatch = useDispatch()
  const {cities, portfolioImages} = useSelector(v => v)
  const categories = ['Semua', 'Wisuda', 'Pernikahan', 'Keluarga']
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedImage, setSelectedImage] = useState({ open: false })
  const [selectedCity, setSelectedCity] = useState('')
  const type = searchParams.get('type')

  const descriptions = {
    Wisuda: {
      title: 'Selamat ya, kamu akhirnya lulus!',
      text: `Kelulusan telah menjadi bukti perjuangan kamu selama beberapa tahun terakhir. Rayakan bersama keluarga, sahabat dan rekan-rekan lainnya. Yogzan akan membantu untuk merekam setiap momen hari kelulusan kamu untuk selalu kamu kenang.`
    },
    Pernikahan: {
      title: 'Selamat dan bahagia untuk kamu dan pasangan! ',
      text: `Jadikan pengucapan janji suci kamu lebih spesial dengan dokumentasi terbaik yang bisa kamu dapatkan. Kenang cinta, tawa dan air mata bahagia dalam hari bahagia kamu. `
    },
    Keluarga: {
      title: 'Setiap cinta dimulai dari keluarga! ',
      text: `Abadikan setiap peristiwa bahagia di keluarga kamu, seperti menanti kehadiran si kecil, momen ulang tahun, liburan bersama, hingga foto anggota keluarga kamu. `
    }
  }

  useEffect(() => {
    setSelectedCity('')
    type && dispatch(getPortfolioImages(type))
  }, [type])

  useEffect(() => {
    dispatch(getPortfolioImages(type, selectedCity.replace('Semua Kota', '') ))
  }, [selectedCity])
  
  useEffect(() => {
    dispatch(getCities())
    if(!type){
      setSearchParams({ type: 'Semua' })
    }
  }, [])

  const _previewImage = (image, index) => {
    const {name, url, description, city, category, vertical} = image
    setSelectedImage({
      open: true, 
      path: url, 
      description, 
      city, 
      category, 
      name, 
      index, 
      orientation: vertical ? 'vertical' : 'horizontal'
    })
  }

  const _renderGallery = () => {
    const { images } = portfolioImages
    let column = 0
    const dataPerColumn = Math.ceil(images.length / 4)
    const dataRow = {'0': [], '1': [], '2': [], '3': []}
    while(column < 4) {
      dataRow[column] = images.slice(column*dataPerColumn, (column*dataPerColumn)+dataPerColumn)
      column++
    }
    return (
      <>
        {Object.keys(dataRow).map((_column, idx) => (
          <div key={idx}>
            {dataRow[_column].map((image, i) => (
              <img key={i} onClick={() => _previewImage(image)} src={image.url} alt="img" />
            ))}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className={styles.root}>
      <h3>Kenang Setiap Cerita dalam Hidup Kamu</h3>
      <h5>Dari wisuda, pernikahan hingga foto keluarga, abadikan momen berharga kamu bersama tim yang berpengalaman. </h5>
      <div className={styles.filters}>
        <div className={styles.groupButton}>
          {categories.map(category => (
            <ButtonFilter
              handleClick={() => setSearchParams({ type: category })}
              key={category}
              variant={type === category ? 'active' : ''}
            >
              {type === category ? (
                <div className={styles.activeButton}>
                  <img className={styles.iconButton} src={check} alt="v" />
                  {category}
                </div>
              ) : (
                <>{category}</>
              )}
            </ButtonFilter>
          ))}
        </div>
        <div>
          {(type === 'Semua' || type === 'Wisuda') && (
            <SelectInput 
              placeholder="Pilih Kota"
              options={['Semua Kota', ...cities]}
              onChange={setSelectedCity}
              value={selectedCity}
            />
          )}
        </div>
      </div>
      {type !== categories[0] && (
        <div className={styles.categoryDescription}>
          <div>
            <h3>{descriptions[type]?.title}</h3>
            <h5>{descriptions[type]?.text}</h5>
          </div>
          <Button variant={'active-square'} handleClick={bookingViaWA}>
            Pesan Sekarang
            <img src={arrowLight} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.galleries}>
        {portfolioImages.images.length > 0 && _renderGallery()}
      </div>
      {selectedImage.open && (
        <Modal className={[styles.preview, styles[selectedImage.orientation]].join(' ')} open={selectedImage.open} onClose={() => setSelectedImage({ open: false })}>
          <img src={selectedImage.path} alt={'preview'}/>
          <div>
            <h4>{selectedImage.name}</h4>
            <p>{selectedImage.description}</p>
            <div>
              {selectedImage.city && (
                <div>
                  <img src={pinLocation} alt='city '/>
                  <p>{selectedImage.city}</p>
                </div>
              )}
              <div>
                <img src={iconImage} alt='category '/>
                <p>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
