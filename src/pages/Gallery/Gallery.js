import React, { useEffect } from 'react'
import styles from './styles.module.css'
import sampleVertical from '../../assets/sample-vertical.png'
import sampleHorizontal from '../../assets/sample-horizontal.png'
import check from '../../assets/check.svg'
import ButtonFilter from '../../components/ButtonFIlter'
import { useSearchParams } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'

export default function Gallery() {

  const categories = ['All', 'Graduation', 'Marriage', 'Family & Event']
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')

  useEffect(() => {
    if(!type){
      setSearchParams({ type: 'All' })
    }
  }, [])

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
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
        <img src={sampleHorizontal} alt="img" />
        <img src={sampleVertical} alt="img1" />
      </div>
    </div>
  )
}
