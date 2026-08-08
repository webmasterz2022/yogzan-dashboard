'use client';
import { Form, Field } from 'react-final-form'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput';
import { useTranslations } from 'next-intl';

export function isValidEmail(email) {
  return /^.+@.+\..+$/.test(email);
}

export default function FormDataDiri(props) {
  const { handleSubmitForm, handleStep, data, setData } = props;
  const t = useTranslations('form');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isEmail = value => isValidEmail(value) ? undefined : 'Format Email salah';
  const normalizePhone = value => value ? value.replace(/[^\d]/g, '') : value;

  const cityOptions = [
    'Bandung', 'Jabodetabek', 'Malang', 'Surabaya', 'Semarang', 'Yogyakarta', 'Surakarta', 'Bali'
  ].sort().concat(['Lokasi Lainnya']);
  const knowFromOptions = ['Instagram', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Facebook', 'LinkedIn', 'Lainnya'];
  const knowFromInstagramOptions = ['Iklan Instagram', 'Muncul di explore instagram', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'];
  const knowFromTiktokOptions = ['Iklan Tiktok', 'Muncul di FYP saya', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'];

  const handleNext = (values) => handleStep(values, 'Detail Pengalaman');

  const disabled = values => !values.fullname || !values.nickname || !values.email || !values.phone ||
    !values.address || !values.birthDate || !values.city ||
    (values.city === 'Lokasi Lainnya' && !values['city-extended']) ||
    !values.knowFrom || ((['Lainnya', 'Instagram', 'Tiktok'].includes(values.knowFrom)) && !values['knowFrom-extended']);

  return (
    <Form
      initialValues={data}
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <Field component={Input} label={t('fields.name.label')} inputProps={{ placeholder: t('fields.name.placeholder') }} name="fullname" />
          <Field component={Input} label={t('fields.nickname.label')} inputProps={{ placeholder: t('fields.nickname.placeholder') }} name="nickname" />
          <Field className={styles.date} component={Input} label={t('fields.birthDate.label')} inputProps={{ placeholder: t('fields.birthDate.placeholder'), type: 'date', value: values.date }} name="birthDate" />
          <Field component={Input} label={t('fields.email.label')} inputProps={{ placeholder: t('fields.email.placeholder') }} name="email" validate={isEmail} />
          <Field component={Input} label={t('fields.phone.label')} inputProps={{ placeholder: t('fields.phone.placeholder') }} name="phone" parse={normalizePhone} />
          <p style={{ textAlign: 'left', fontSize: isMobile ? '16px' : '1rem', margin: 0 }}>{t('fields.city.label')}</p>
          <Field component={SelectInput} onChange={(e) => setData({ ...values, city: e })} name="city" options={cityOptions} placeholder={t('fields.city.placeholder')} />
          {values.city === 'Lokasi Lainnya' && (
            <Field className={styles.cityExtended} component={Input} inputProps={{ placeholder: 'Tulis Nama Lokasi' }} name="city-extended" />
          )}
          <Field component={Input} label={t('fields.address.label')} inputProps={{ placeholder: t('fields.address.placeholder') }} name="address" />
          <p style={{ textAlign: 'left', fontSize: isMobile ? '16px' : '1rem', margin: 0 }}>{t('fields.knowFrom.label')}</p>
          <Field component={SelectInput} onChange={(e) => setData({ ...values, knowFrom: e })} name="knowFrom" options={knowFromOptions} placeholder={t('fields.knowFrom.placeholder')} />
          {values.knowFrom === 'Lainnya' && (
            <Field className={styles.knowFromExtended} component={Input} inputProps={{ placeholder: 'Sumber Lainnya' }} name="knowFrom-extended" />
          )}
          {values.knowFrom === 'Instagram' && (
            <Field className={styles.knowFromExtended} onChange={(e) => setData({ ...values, 'knowFrom-extended': e })} component={SelectInput} name="knowFrom-extended" options={knowFromInstagramOptions} placeholder="Detail Sumber" style={{ textAlign: 'left' }} />
          )}
          {values.knowFrom === 'Tiktok' && (
            <Field className={styles.knowFromExtended} onChange={(e) => setData({ ...values, 'knowFrom-extended': e })} component={SelectInput} name="knowFrom-extended" options={knowFromTiktokOptions} placeholder="Detail Sumber" />
          )}
          <Button disabled={disabled(values)} variant="active-square" handleClick={() => handleNext(values)}>{t('submit')}</Button>
        </form>
      )}
    />
  )
}
