import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import styles from './styles.module.css'
import pinLocation from '../../assets/pin-location.svg'
import iconImage from '../../assets/icon-image.svg'
import arrowLight from '../../assets/arrow-light.svg'
import arrowDark from '../../assets/arrow-dark.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'
import xCircle from '../../assets/x-circle.svg'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getGalleryCategories, getPortfolioImages } from '../../store/action'
import Button from '../../components/Button'
import { routes } from '../../configs/routes'

export default function Gallery() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cities, portfolioImages, categories } = useSelector(v => v)
  // const categories = ['Semua', 'Wisuda', 'Pernikahan', 'Keluarga']
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedImage, setSelectedImage] = useState({ open: false })
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '')
  const type = searchParams.get('type')
  const currentCategory = categories.find(e => e.name === type)

  useEffect(() => {
    setSelectedCity(searchParams.get('city') || '')
    dispatch(getCities(type !== 'Semua' ? type : ''))
    type && dispatch(getPortfolioImages(type))
  }, [type])

  useEffect(() => {
    setSearchParams({ type, city: selectedCity.replace('Semua Lokasi', '') })
    dispatch(getPortfolioImages(type, selectedCity.replace('Semua Lokasi', '')))
  }, [selectedCity])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getGalleryCategories())
    if (!type) {
      setSearchParams({ ...Object.fromEntries(searchParams), type: 'Semua' })
    }
  }, [])

  const _previewImage = (image) => {
    const { name, url, description, city, category, vertical, index } = image
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
    const dataRow = { '0': [], '1': [], '2': [], '3': [] }
    while (column < 4) {
      dataRow[column] = images.slice(column * dataPerColumn, (column * dataPerColumn) + dataPerColumn)
      column++
    }
    const orientation = (isVertical) => isVertical ? 'vertical' : 'horizontal'
    return (
      <>
        {Object.keys(dataRow).map((_column, idx) => (
          <div key={idx}>
            {dataRow[_column].map((image, i) => (
              <div className={styles[orientation(image.vertical)]} key={i}>
                <div onClick={() => _previewImage(image)} style={{ backgroundImage: `url(${image.url})` }} />
              </div>
            ))}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className={styles.root}>
      <h3>{t('gallery.mainTitle')}</h3>
      <h5>{t('gallery.mainSubtitle')}</h5>
      <div className={styles.filters}>
        <div className={styles.groupButton}>
          <ButtonFilter
            handleClick={() => {
              setSearchParams({ type: 'Semua' })
            }}
            variant={type === 'Semua' ? 'active' : ''}
          >
            {type === 'Semua' ? (
              <div className={styles.activeButton}>
                <img className={styles.iconButton} src={check} alt="v" />
                {t('gallery.all')}
              </div>
            ) : (
              <>{t('gallery.all')}</>
            )}
          </ButtonFilter>
          {categories.map(({ name }) => (
            <ButtonFilter
              handleClick={() => setSearchParams({ type: name })}
              key={name}
              variant={type === name ? 'active' : ''}
            >
              {type === name ? (
                <div className={styles.activeButton}>
                  <img className={styles.iconButton} src={check} alt="v" />
                  {t(`gallery.category.${name}.label`) || name}
                </div>
              ) : (
                <>{t(`gallery.category.${name}.label`) || name}</>
              )}
            </ButtonFilter>
          ))}
        </div>
        <div>
          <SelectInput
            placeholder={t('gallery.selectLocation')}
            options={[t('gallery.allLocations'), ...cities]}
            onChange={setSelectedCity}
            value={selectedCity}
          />
        </div>
      </div>
      {type && type !== 'Semua' && t(`gallery.category.${type}.title`) && (
        <div className={styles.categoryDescription}>
          <div>
            <h3>{t(`gallery.category.${type}.title`)}</h3>
            <h5>{t(`gallery.category.${type}.text`)}</h5>
          </div>
          <Button variant={'active-square'} handleClick={() => navigate(routes.BOOK())}>
            {t('gallery.getPriceList')}
            <img src={arrowLight} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.galleries}>
        {portfolioImages.images.length > 0 && _renderGallery()}
      </div>
      <div className={styles.redirect}>
        {currentCategory?.redirectLink && (
          <Button
            handleClick={() => window.open(currentCategory.redirectLink, '_blank')}
          >
            {t('gallery.seeMore')}
            <img src={arrowDark} alt="" />
          </Button>
        )}
      </div>
      {selectedImage.open && (
        <Modal className={[styles.preview, styles[selectedImage.orientation]].join(' ')} open={selectedImage.open} onClose={() => setSelectedImage({ open: false })}>
          <img src={selectedImage.path} alt={'preview'} />
          <div>
            <h4>{selectedImage.name}</h4>
            <p>{selectedImage.description}</p>
            <div>
              {selectedImage.city && (
                <div>
                  <img src={pinLocation} alt='city ' />
                  <p>{selectedImage.city}</p>
                </div>
              )}
              <div>
                <img src={iconImage} alt='category ' />
                <p>{selectedImage.category}</p>
              </div>
            </div>
          </div>
          <div className={styles.modalNav}>
            {selectedImage.index - 1 >= 0 ? <img alt='back' src={arrowLeft} onClick={() => _previewImage(portfolioImages.images[selectedImage.index - 1])} /> : <img />}
            <img alt='close' src={xCircle} onClick={() => setSelectedImage({ open: false })} />
            {selectedImage.index + 1 < portfolioImages.images.length ? <img alt='next' src={arrowRight} onClick={() => _previewImage(portfolioImages.images[selectedImage.index + 1])} /> : <img />}
          </div>
        </Modal>
      )}
    </div>
  )
}
