import { Form, Field } from 'react-final-form'
import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput';

export default function FormDataDiri(props) {
  const { handleSubmitForm, handleStep, data, setData } = props
  const reqEmail = new RegExp([
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
    '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
    '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  ].join('|'));
  const isEmail = value => reqEmail.test(value) ? undefined : 'Format Email salah';

  const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    return onlyNums
  };

  const inputProps = [
    { placeholder: 'Tulis nama lengkap disini' },
    { placeholder: 'Tulis nama panggilan disini' },
    { placeholder: 'Tulis email disini' },
    { placeholder: 'Tulis nomor whatsapp disini' },
    { placeholder: 'Tulis alamat domisili saat ini' },
    { placeholder: 'HH/BB/TTTT', type: 'date' },
    { placeholder: 'Pilih salah satu', options: ['Bandung', 'Jabodetabek', 'Malang', 'Surabaya', 'Semarang', 'Yogyakarta', 'Surakarta', 'Kota Lainnya'] },
    { placeholder: 'Pilih salah satu', options: ['Instagram', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Facebook', 'Lainnya'] },
    { placeholder: 'Detail Sumber', options: ['Iklan Instagram', 'Muncul di explore instagram', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'], styles: { textAlign: 'left' } },
    { placeholder: 'Detail Sumber', options: ['Iklan Tiktok', 'Muncul di FYP saya', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'], styles: { textAlign: 'left' } }
  ]

  const handleNext = (values) => {
    handleStep(values, 'Detail Pengalaman')
  }

  const disabled = values => !values.fullname || !values.nickname || !values.email || !values.phone ||
    !values.address || !values.birthDate || !values.city || (values.city === 'Kota Lainnya' && !values['city-extended']) ||
    !values.knowFrom || ((values.knowFrom === 'Lainnya' || values.knowFrom === 'Instagram' || values.knowFrom === 'Tiktok') && !values['knowFrom-extended']);

  return (
    <Form
      initialValues={data}
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <Field
            component={Input}
            label="Nama Lengkap"
            inputProps={inputProps[0]}
            name="fullname"
          />
          <Field
            component={Input}
            label="Nama Panggilan"
            inputProps={inputProps[1]}
            name="nickname"
          />
          <Field
            className={styles.date}
            component={Input}
            label="Tanggal Lahir"
            inputProps={{ ...inputProps[5], value: values.date }}
            name="birthDate"
          />
          <Field
            component={Input}
            label="Email"
            inputProps={inputProps[2]}
            name="email"
            validate={isEmail}
          />
          <Field
            component={Input}
            label="Nomor Whatsapp"
            inputProps={inputProps[3]}
            name="phone"
            parse={normalizePhone}
          />
          <p style={{ textAlign: 'left' }}>Pilih Kota Domisili</p>
          <Field
            component={SelectInput}
            onChange={(e) => setData({ ...values, city: e })}
            name="city"
            {...inputProps[6]}
          />
          {values.city === 'Kota Lainnya' && (
            <Field
              className={styles.cityExtended}
              component={Input}
              inputProps={{ placeholder: 'Tulis Nama Kota' }}
              name="city-extended"
            />
          )}
          <Field
            component={Input}
            label="Alamat Domisili saat ini"
            inputProps={inputProps[4]}
            name="address"
          />
          <p style={{ textAlign: 'left' }}>Dari mana Anda mengetahui Yogzan?</p>
          <Field
            component={SelectInput}
            onChange={(e) => setData({ ...values, knowFrom: e })}
            name="knowFrom"
            {...inputProps[7]}
          />
          {values.knowFrom === 'Lainnya' && (
            <Field
              className={styles.knowFromExtended}
              component={Input}
              inputProps={{ placeholder: 'Sumber Lainnya' }}
              name="knowFrom-extended"
            />
          )}
          {values.knowFrom === 'Instagram' && (
            <Field
              className={styles.knowFromExtended}
              onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
              component={SelectInput}
              name="knowFrom-extended"
              {...inputProps[8]}
              style={{ textAlign: 'left' }}
            />
          )}
          {values.knowFrom === 'Tiktok' && (
            <Field
              className={styles.knowFromExtended}
              onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
              component={SelectInput}
              name="knowFrom-extended"
              {...inputProps[9]}
            />
          )}
          <Button disabled={disabled(values)} variant="active-square" handleClick={() => handleNext(values)}>Selanjutnya</Button>
        </form>
      )}
    />
  )
}
