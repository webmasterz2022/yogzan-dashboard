import React, { useEffect, useState, useRef } from 'react'
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
import { getDeviceType, shuffle } from '../../utils'
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
        <h3 className={styles.heading1}>Setiap Momen Punya Cerita Berharga</h3>
        <h4 className={styles.heading2}>
          Abadikan semuanya dengan cara paling indah bersama layanan foto & video profesional dari Yogzan.
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
              <Button variant="active-square" handleClick={() => navigate(routes.BOOK())}>
                Pesan Sekarang
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
          <p>Momen</p>
          <div>
            {categories?.map(category => {
              return (
                <CategoryCard key={category.name} {...category} title={category.name} handleClick={() => navigate(`/gallery?type=${category.name}`)} />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentWhyUs}>
        <h3>Percayakan Setiap Momen Anda kepada Kami</h3>
        <p>Momen kamu adalah momen kami juga. Karena itu kami berikan yang terbaik untuk mengenangnya.</p>
        <div>
          {chooseUs?.map((why, idx) => (
            <CardChooseUs key={idx} {...why} />
          ))}
        </div>
      </div>
      <div className={styles.testimonials} ref={testimonyRef}>
        <h3>Ini Kata Mereka</h3>
        <p>Setiap dari mereka berharga, demikian juga dengan kamu!</p>
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
        </div>
        {(testimonies && testimonies.length > 0) && <div className={styles.overlayLeft} ref={overlayLeftRef} />}
        {(testimonies && testimonies.length > 0) && <div className={styles.overlayRight} ref={overlayRightRef} />}
      </div>
    </section>
  )
}
