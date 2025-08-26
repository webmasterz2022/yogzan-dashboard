import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import styles from './styles.module.css'
import logo from '../../assets/logo-dark.svg'
import blank from '../../assets/blank.png'
import keluarga from '../../assets/keluarga.jpeg'
import pernikahan from '../../assets/pernikahan.jpg'
import wisuda from '../../assets/wisuda.jpg'
import arrowLight from '../../assets/arrow-light.svg'

import Button from '../../components/Button'
import CategoryCard from '../../components/CategoryCard'
import CardChooseUs from '../../components/CardChooseUs'
import CardTestimony from '../../components/CardTestimony'
import { getAllCategories, getAllTestimonies, getHomepageCategories, getHomepageImages } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getDeviceType, getPrefixedPath, shuffle } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { chooseUs, testimonials } from './dataMock'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { routes } from '../../configs/routes'

export default function Home() {
  const testimonyRef = useRef()
  const overlayRightRef = useRef()
  const overlayLeftRef = useRef()
  const device = getDeviceType()
  const lengthTestimony = {
    desktop: 2.8,
    tablet: 2,
    mobile: 1
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { homepageImages, categories, testimonies } = useSelector(s => s)
  const [images, setImages] = useState([])

  const { t, i18n } = useTranslation(['home'])


  useEffect(() => {
    if (testimonies && testimonies.length > 0) {
      if (testimonyRef.current) {
        const parentHeight = testimonyRef.current.clientHeight
        if (overlayLeftRef.current && overlayRightRef.current) {
          overlayLeftRef.current.style.height = `${parentHeight}px`
          overlayRightRef.current.style.height = `${parentHeight}px`
        }
      }
    }
  }, [testimonies])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (homepageImages.length === 0) {
      dispatch(getHomepageImages())
    }
    dispatch(getHomepageCategories())
    dispatch(getAllTestimonies())
  }, [])

  useEffect(() => {
    if (homepageImages.length) {
      // const shuffled = shuffle?.(homepageImages) || homepageImages
      const shuffled = shuffle(homepageImages)
      if (images.length === 0) {
        setImages(shuffled.slice(0, 11))
      }
    }
  }, [homepageImages])

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <img src={logo} alt='yogzan' />
        <h3 className={styles.heading1}>{t('header.mainTitle', { ns: 'home' })}</h3>
        <h4 className={styles.heading2}>
          {t('header.subtitle', { ns: 'home' })}
        </h4>
      </div>
      <div className={styles.galleries}>
        <div className={styles.overlay} />
        <div>
          {images.length > 0 && (
            <>
              <div className={styles.satu}>
                <div style={{ backgroundImage: `url(${images[0] ? images[0].url : blank})` }} />
              </div>
              <div className={styles.dua}>
                <div style={{ backgroundImage: `url(${images[1] ? images[1].url : blank})` }} />
              </div>
              <div className={styles.tiga}>
                <div style={{ backgroundImage: `url(${images[2] ? images[2].url : blank})` }} />
              </div>
              <div className={styles.empat}>
                <div style={{ backgroundImage: `url(${images[3] ? images[3].url : blank})` }} />
              </div>
              <div className={styles.lima}>
                <div style={{ backgroundImage: `url(${images[4] ? images[4].url : blank})` }} />
              </div>

              <div className={styles.enam}>
                <div style={{ backgroundImage: `url(${images[5] ? images[5].url : blank})` }} />
              </div>
              <div className={styles.tujuh}>
                <div style={{ backgroundImage: `url(${images[6] ? images[6].url : blank})` }} />
              </div>
              <Button variant="active-square" handleClick={() => navigate(getPrefixedPath(routes.BOOK()))}>
                {t('getPriceList', { ns: 'home' })}
                <img src={arrowLight} alt="" />
              </Button>
              <div className={styles.delapan}>
                <div style={{ backgroundImage: `url(${images[7] ? images[7].url : blank})` }} />
              </div>
              <div className={styles.sembilan}>
                <div style={{ backgroundImage: `url(${images[8] ? images[8].url : blank})` }} />
              </div>
              <div className={styles.sepuluh}>
                <div style={{ backgroundImage: `url(${images[9] ? images[9].url : blank})` }} />
              </div>

              <div className={styles.sebelas}>
                <div alt="im" style={{ backgroundImage: `url(${images[10] ? images[10].url : blank})` }} />
              </div>
            </>
          )}
        </div>
        <div>
          <h3>{t('gallery.label', { ns: 'home' })}</h3>
          <p>{t('gallery.description', { ns: 'home', defaultValue: '' }) ? `"${t('gallery.description', { ns: 'home', defaultValue: '' })}"` : ''}</p>
          <div>
            {categories?.map(category => {
              return (
                <CategoryCard key={category.name} {...category} title={t(`category.${category.name}.label`, { ns: 'home', defaultValue: category.name })} handleClick={() => navigate(getPrefixedPath(`/gallery?type=${category.name}`))} />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentWhyUs}>
        <h3>{t('whyUs.title', { ns: 'home' })}</h3>
        <p>{t('whyUs.desc', { ns: 'home' })}</p>
        <div>
          {chooseUs?.map((why, idx) => (
            <CardChooseUs
              key={idx}
              {...why}
              title={t(`chooseUs.${idx}.title`, { ns: 'home' })}
              desc={t(`chooseUs.${idx}.desc`, { ns: 'home' })}
            />
          ))}
        </div>
      </div>
      <div className={styles.testimonials} ref={testimonyRef}>
        <h3>{t('testimonials.title', { ns: 'home' })}</h3>
        <p>{t('testimonials.desc', { ns: 'home' })}</p>
        <div>
          <Swiper
            pagination={{
              dynamicBullets: true,
              clickable: true
            }}
            modules={[Autoplay, Pagination]}
            spaceBetween={2}
            slidesPerView={lengthTestimony[device]}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            loop={true}
          >
            {testimonies?.map((data) => (
              <SwiperSlide
                key={data.username}
              >
                <CardTestimony
                  image={data.image}
                  desc={data.desc}
                  name={`@${data.name}`}
                  link={data.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {(testimonies && testimonies.length > 0) && <div className={styles.overlayLeft} ref={overlayLeftRef} />}
          {(testimonies && testimonies.length > 0) && <div className={styles.overlayRight} ref={overlayRightRef} />}
        </div>
      </div>
    </section>
  )
}
