import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo-dark.svg'
import blank from '../../assets/blank.png'
import keluarga from '../../assets/keluarga.jpeg'
import pernikahan from '../../assets/pernikahan.jpg'
import wisuda from '../../assets/wisuda.jpg'

import Button from '../../components/Button'
import CategoryCard from '../../components/CategoryCard'
import CardChooseUs from '../../components/CardChooseUs'
import CardTestimony from '../../components/CardTestimony'
import { getHomepageImages } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { bookingViaWA, shuffle } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { chooseUs, testimonials } from './dataMock'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { homepageImages } = useSelector(s => s)
  const [images, setImages] = useState([])

  useEffect(() => {
    dispatch(getHomepageImages())
  }, [])

  useEffect(() => {
    const shuffled = shuffle(homepageImages)
    if(images.length === 0) {
      setImages(shuffled.slice(0, 11))
    } 
  }, [homepageImages])

  const categories = [
    {
      image: wisuda,
      title: 'Wisuda',
      handleClick: () => navigate('/gallery?type=Wisuda')
    },{
      image: pernikahan,
      title: 'Pernikahan',
      handleClick: () => navigate('/gallery?type=Pernikahan')
    },{
      image: keluarga,
      title: 'Keluarga',
      handleClick: () => navigate('/gallery?type=Keluarga')
    }
  ]

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
          <img className={styles.satu} alt="im" src={images[0]? images[0].url : blank}/>
          <img className={styles.dua} alt="im" src={images[1]? images[1].url : blank}/>
          <img className={styles.tiga} alt="im" src={images[2]? images[2].url : blank}/>
          <img className={styles.empat} alt="im" src={images[3]? images[3].url : blank}/>
          <img className={styles.lima} alt="im" src={images[4]? images[4].url : blank}/>

          <img className={styles.enam} alt="im" src={images[5]? images[5].url : blank}/>
          <img className={styles.tujuh} alt="im" src={images[6]? images[6].url : blank}/>
          <Button variant="active-square" handleClick={bookingViaWA}>Pesan Sekarang</Button>
          <img className={styles.delapan} alt="im" src={images[7]? images[7].url : blank}/>
          <img className={styles.sembilan} alt="im" src={images[8]? images[8].url : blank}/>
          <img className={styles.sepuluh} alt="im" src={images[9]? images[9].url : blank}/>

          <img className={styles.sebelas} alt="im" src={images[10]? images[10].url : blank}/>
        </div>
        <div>
          <p>Momen</p>
          <div>
            {categories.map(category => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.contentWhyUs}>
        <h3>Percayakan Setiap Momen Anda kepada Kami</h3>
        <p>Momen kamu adalah momen kami juga. Karena itu kami berikan yang terbaik untuk mengenangnya.</p>
        <div>
          {chooseUs.map((why, idx) => (
            <CardChooseUs key={idx} {...why} />
          ))}
        </div>
      </div>
      <div className={styles.testimonials}>
        <h3>Ini Kata Mereka</h3>
        <p>Setiap dari mereka berharga, demikian juga dengan kamu!</p>
        <div>
          {testimonials.map((data) => (
            <CardTestimony
              key={data.username}
              image={data.image}
              desc={data.testimony}
              name={`@${data.username}`}
              link={data.link}
            />
            ))}
        </div>
        <div className={styles.overlayLeft}/>
        <div className={styles.overlayRight}/>
      </div>
    </section>
  )
}