'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../../../_cra-pages/Career/styles.module.css';
import CardChooseUs from '../../../components/CardChooseUs';
import { careerChooseUs } from '../../../_cra-pages/Career/dataMock';
import FormDataDiri from '../../../components/FormDataDiri';
import FormDetailPengalaman from '../../../components/FormDetailPengalaman';
import { useDispatch } from 'react-redux';
import { submitHiring } from '../../../store/action';

const satu = '/assets/satu.svg';
const dua = '/assets/dua.svg';
const tiga = '/assets/tiga.svg';
const coverCareer = '/assets/coverCareer.png';
const formImage = '/assets/hiring-cover.jpg';

const initialData = {
  fullname: '', nickname: '', birthDate: '', email: '', phone: '',
  address: '', photoshoot: '', experience: '', camera: '', lens: '',
  accessories: '', workingHour: '', fee: '', cv: '', portfolio: '',
  jobRole: '', city: '', knowFrom: '',
};

export default function CareerClient() {
  const t = useTranslations('career');
  const dispatch = useDispatch();
  const [stepperContent, setStepperContent] = useState<string[]>([]);
  const [step, setStep] = useState('');
  const [data, setData] = useState(initialData);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const _stepperContent = t.raw('stepper') as string[];
    setStepperContent(_stepperContent);
    setStep(_stepperContent[0]);
  }, []);

  const handleSubmit = (values: any) => {
    const _knowFrom = ['Lainnya', 'Instagram', 'Tiktok'].includes(values.knowFrom)
      ? `${values.knowFrom} - ${values['knowFrom-extended']}`
      : values.knowFrom;
    const _city = values.city === 'Lokasi Lainnya'
      ? `${values.city} - ${values['city-extended']}`
      : values.city;
    dispatch(submitHiring({ ...data, ...values, knowFrom: _knowFrom, city: _city }, () => {
      window.location.href = '/career';
    }) as any);
  };

  const changeStep = (dataOnStep: any, nextStep?: string) => {
    setData(prev => ({ ...prev, ...dataOnStep }));
    if (nextStep) setStep(nextStep);
  };

  return (
    <section className={styles.root}>
      <h3>{t('mainTitle')}</h3>
      <p>{t('mainDesc')}</p>
      <div className={styles.why}>
        <h3>{t('whyTitle')}</h3>
        <div>
          {careerChooseUs.map((why: any, i: number) => (
            <CardChooseUs {...why} key={i}
              title={t(`chooseUs.${i}.title` as any)}
              desc={t(`chooseUs.${i}.desc` as any)}
            />
          ))}
        </div>
      </div>
      <div className={styles.workflow}>
        <div className={styles.title}>
          <h2>{t('workflowTitle')}</h2>
          <p>{t('workflowDesc')}</p>
        </div>
        <div className={styles.cards}>
          {[0, 1, 2].map(i => (
            <div key={i}>
              <h4>{t(`workflow.${i}.title` as any)}</h4>
              <p>{t(`workflow.${i}.desc` as any)}</p>
              <img src={i === 0 ? satu : i === 1 ? dua : tiga} alt={String(i + 1)} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cover}>
        <img src={coverCareer} alt="cover" />
      </div>
      <div className={styles.formContent}>
        <div>
          <h3>{t('joinTitle')}</h3>
          <p>{t('joinDesc')}</p>
          <div className={styles.stepper}>
            <p className={step === stepperContent[0] ? styles.active : ''}>{stepperContent[0]}</p>
            <div className={styles.line} />
            <p className={step === stepperContent[1] ? styles.active : ''}>{stepperContent[1]}</p>
          </div>
          {step === stepperContent[0] ? (
            <FormDataDiri data={data} handleStep={changeStep} handleSubmitForm={handleSubmit} setData={setData} />
          ) : (
            <FormDetailPengalaman data={data} handleStep={changeStep} handleSubmitForm={handleSubmit} />
          )}
        </div>
        <img src={formImage} alt="form" />
      </div>
    </section>
  );
}
