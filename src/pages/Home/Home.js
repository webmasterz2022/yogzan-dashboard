import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo-dark.svg'
import sampleVertical from '../../assets/sample-vertical.png'
import sampleHorizontal from '../../assets/sample-horizontal.png'
import write from '../../assets/writebook.svg'
import world from '../../assets/worldconnect.svg'
import schedule from '../../assets/scheduled.svg'
import Button from '../../components/Button'
import CategoryCard from '../../components/CategoryCard'
import CardChooseUs from '../../components/CardChooseUs'
import CardTestimony from '../../components/CardTestimony'
// import { getHomepageImages } from '../../store/action'
import { useSelector } from 'react-redux'
import { shuffle } from '../../utils'

export default function Home() {
  // const dispatch = useDispatch()
  const { homepageImages } = useSelector(s => s)
  const [images, setImages] = useState([])

  useEffect(() => {
    // dispatch(getHomepageImages())
  }, [])

  useEffect(() => {
    let timer;
    const shuffled = shuffle(homepageImages)
    if(images.length === 0) {
      setImages(shuffled.slice(0, 11))
    } 
    timer = setInterval(() => {
      setImages(shuffled.slice(0, 11))
    }, 10000)
    return () => {
      clearInterval(timer)
    }
  }, [homepageImages])

  const categories = [
    {
      image: sampleHorizontal,
      title: 'Graduation',
      handleClick: () => {}
    },{
      image: sampleVertical,
      title: 'Marriage',
      handleClick: () => {}
    },{
      image: sampleHorizontal,
      title: 'Family & Event',
      handleClick: () => {}
    }
  ]

  const chooseUs = [
    {
      image: write,
      title: 'Hassle-Free Booking',
      desc: 'Get inspired with some of the best ideas for your holiday photo shoot'
    },{
      image: world,
      title: 'Hassle-Free Booking',
      desc: 'Get inspired with some of the best ideas for your holiday photo shoot'
    },{
      image: schedule,
      title: 'Hassle-Free Booking',
      desc: 'Get inspired with some of the best ideas for your holiday photo shoot'
    }
  ]

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <img src={logo} alt='yogzan' />
        <h4 className={styles.heading}>
          Get expert photographers and amazing photos, 
          starting from just IDR 1,460,000 in 500+ cities worldwide
        </h4>
      </div>
      <div className={styles.galleries}>
        <div className={styles.overlay} />
        <div>
          <img className={styles.satu} alt="im" src={images[0]}/>
          <img className={styles.dua} alt="im" src={images[1]}/>
          <img className={styles.tiga} alt="im" src={images[2]}/>
          <img className={styles.empat} alt="im" src={images[3]}/>
          <img className={styles.lima} alt="im" src={images[4]}/>

          <img className={styles.enam} alt="im" src={images[5]}/>
          <img className={styles.tujuh} alt="im" src={images[6]}/>
          <Button variant="active-square">Book Now</Button>
          <img className={styles.delapan} alt="im" src={images[7]}/>
          <img className={styles.sembilan} alt="im" src={images[8]}/>
          <img className={styles.sepuluh} alt="im" src={images[9]}/>

          <img className={styles.sebelas} alt="im" src={images[10]}/>
        </div>
        <div>
          <p>Category</p>
          <div>
            {categories.map(category => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.contentWhyUs}>
        <h3>Why choose us?</h3>
        <p>Get inspired with some of the best ideas for your holiday photo shoot</p>
        <div>
          {chooseUs.map((why, idx) => (
            <CardChooseUs key={idx} {...why} />
          ))}
        </div>
      </div>
      <div className={styles.testimonials}>
        <h3>What they say?</h3>
        <p>Get inspired with some of the best ideas for your holiday photo shoot</p>
        <div>
          {[...Array(10).keys()].map((_, idx) => (
            <CardTestimony
            key={idx}
            image={sampleVertical}
            desc="Harga terjangkau kualitas terbaik"
            name="husamaziz"
            />
            ))}
        </div>
        <div className={styles.overlayLeft}/>
        <div className={styles.overlayRight}/>
      </div>
    </section>
  )
}
