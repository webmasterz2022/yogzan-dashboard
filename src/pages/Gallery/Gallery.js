import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import sampleVertical from '../../assets/sample-vertical.png'
import sampleHorizontal from '../../assets/sample-horizontal.png'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'

export default function Gallery() {

  const categories = ['All', 'Graduation', 'Marriage', 'Family & Event']
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedImage, setSelectedImage] = useState({ open: false })
  const type = searchParams.get('type')

  useEffect(() => {
    if(!type){
      setSearchParams({ type: 'All' })
    }
  }, [])

  const _previewImage = (path, index) => {
    setSelectedImage({open: true, path, description: 'dummy', city: 'dummy', category: 'dummy', name: 'dummy', index})
  }

  return (
    <div className={styles.root}>
      <h3>Portfolio</h3>
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
          <SelectInput 
            placeholder="Pilih Kota"
          />
        </div>
      </div>
      <div className={styles.galleries}>
        <div>
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
        </div>
        <div>
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
        </div>
        <div>
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
        </div>
        <div>
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
          <img onClick={() => _previewImage(sampleVertical)} src={sampleVertical} alt="img1" />
          <img onClick={() => _previewImage(sampleHorizontal)} src={sampleHorizontal} alt="img" />
        </div>
      </div>
      {selectedImage.open && (
        <Modal className={styles.preview} open={selectedImage.open} onClose={() => setSelectedImage({ open: false })}>
          <img src={selectedImage.path}/>
          <div>
            <h4>{selectedImage.name}</h4>
            <p>{selectedImage.description}</p>
            <div>
              <div>
                <img />
                <p>{selectedImage.city}</p>
              </div>
              <div>
                <img />
                <p>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
