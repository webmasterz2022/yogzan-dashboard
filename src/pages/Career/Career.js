import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'
import CardChooseUs from '../../components/CardChooseUs'
import { careerChooseUs } from './dataMock'
import satu from '../../assets/satu.svg'
import dua from '../../assets/dua.svg'
import tiga from '../../assets/tiga.svg'
import coverCareer from '../../assets/coverCareer.png'
import formImage from '../../assets/hiring-cover.jpg'
import FormDataDiri from '../../components/FormDataDiri'
import FormDetailPengalaman from '../../components/FormDetailPengalaman'
import { useDispatch } from 'react-redux'
import { submitHiring } from '../../store/action'

export default function Career() {
  const { t } = useTranslation(['career'])
  const dispatch = useDispatch()
  const [stepperContent, setStepperContent] = useState([])
  const [step, setStep] = useState('')
  const [data, setData] = useState({
    "fullname": '',
    "nickname": '',
    "birthDate": '',
    "email": '',
    "phone": '',
    "address": '',
    "photoshoot": '',
    "experience": '',
    "camera": '',
    "lens": '',
    "accessories": '',
    "workingHour": '',
    "fee": '',
    "cv": '',
    "portfolio": '',
    "jobRole": '',
    "city": '',
    "knowFrom": ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useLayoutEffect(() => {
    const _stepperContent = t('stepper', { ns: 'career', returnObjects: true })
    setStepperContent(_stepperContent)
    setStep(_stepperContent[0])
  }, [])

  console.log(step, stepperContent)

  const handleSubmit = (values, step) => {
    const _knowFrom = (values.knowFrom === 'Lainnya' || values.knowFrom === 'Instagram' || values.knowFrom === 'Tiktok') ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom
    const _city = values.city === 'Lokasi Lainnya' ? `${values.city} - ${values['city-extended']}` : values.city
    dispatch(submitHiring({
      ...data,
      ...values,
      knowFrom: _knowFrom,
      city: _city
    }, () => {
      window.location.href = '/career'
    }))
  }

  const changeStep = (dataOnStep, step) => {
    setData(prev => ({ ...prev, ...dataOnStep }))
    step && setStep(step)
  }

  return (
    <section className={styles.root}>
      <h3>{t('mainTitle', { ns: 'career' })}</h3>
      <p>{t('mainDesc', { ns: 'career' })}</p>
      <div className={styles.why}>
        <h3>{t('whyTitle', { ns: 'career' })}</h3>
        <div>
          {careerChooseUs.map((why, i) => (
            <CardChooseUs {...why} key={i}
              title={t(`chooseUs.${i}.title`, { ns: 'career' })}
              desc={t(`chooseUs.${i}.desc`, { ns: 'career' })}
            />
          ))}
        </div>
      </div>
      <div className={styles.workflow}>
        <div className={styles.title}>
          <h2>{t('workflowTitle', { ns: 'career' })}</h2>
          <p>{t('workflowDesc', { ns: 'career' })}</p>
        </div>
        <div className={styles.cards}>
          {[0, 1, 2].map(i => (
            <div key={i}>
              <h4>{t(`workflow.${i}.title`, { ns: 'career' })}</h4>
              <p>{t(`workflow.${i}.desc`, { ns: 'career' })}</p>
              <img src={i === 0 ? satu : i === 1 ? dua : tiga} alt={String(i + 1)} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cover}>
        <img src={coverCareer} />
      </div>
      <div className={styles.formContent}>
        <div>
          <h3>{t('joinTitle', { ns: 'career' })}</h3>
          <p>{t('joinDesc', { ns: 'career' })}</p>
          <div className={styles.stepper}>
            <p
              className={step === stepperContent[0] ? styles.active : ''}
            >
              {stepperContent[0]}
            </p>
            <div className={styles.line} />
            <p
              className={step === stepperContent[1] ? styles.active : ''}
            >
              {stepperContent[1]}
            </p>
          </div>
          {step === stepperContent[0] ? (
            <FormDataDiri data={data} handleStep={changeStep} handleSubmitForm={(e) => handleSubmit(e, stepperContent[0])} setData={setData} />
          ) : (
            <FormDetailPengalaman data={data} handleStep={changeStep} handleSubmitForm={(e) => handleSubmit(e, stepperContent[1])} />
          )}
        </div>
        <img src={formImage} />
      </div>
    </section>
  )
}
