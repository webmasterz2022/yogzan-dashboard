import { Form, Field } from 'react-final-form'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput';
import { useTranslation } from 'react-i18next';

export default function FormDataDiri(props) {
  const { handleSubmitForm, handleStep, data, setData } = props;
  const { t } = useTranslation(['form']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const reqEmail = new RegExp([
    '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)',
    '(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])',
    '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
  ].join('|'));
  const isEmail = value => reqEmail.test(value) ? undefined : t('fields.email.error', 'Format Email salah');

  const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    return onlyNums
  };

  // City and KnowFrom options (static, but can be translated if needed)
  const cityOptions = [
    'Bandung', 'Jabodetabek', 'Malang', 'Surabaya', 'Semarang', 'Yogyakarta', 'Surakarta', 'Bali'
  ].sort().concat([t('fields.city.options.lainnya', 'Lokasi Lainnya')]);
  const knowFromOptions = [
    'Instagram', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Facebook', 'LinkedIn', t('fields.knowFrom.options.lainnya', 'Lainnya')
  ];
  const knowFromInstagramOptions = [
    'Iklan Instagram', 'Muncul di explore instagram', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', t('fields.knowFromExtended.options.lainnya', 'Lainnya')
  ];
  const knowFromTiktokOptions = [
    'Iklan Tiktok', 'Muncul di FYP saya', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', t('fields.knowFromExtended.options.lainnya', 'Lainnya')
  ];

  const handleNext = (values) => {
    handleStep(values, 'Detail Pengalaman');
  };

  const disabled = values => !values.fullname || !values.nickname || !values.email || !values.phone ||
    !values.address || !values.birthDate || !values.city || (values.city === t('fields.city.options.lainnya', 'Lokasi Lainnya') && !values['city-extended']) ||
    !values.knowFrom || ((values.knowFrom === t('fields.knowFrom.options.lainnya', 'Lainnya') || values.knowFrom === 'Instagram' || values.knowFrom === 'Tiktok') && !values['knowFrom-extended']);

  return (
    <Form
      initialValues={data}
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <Field
            component={Input}
            label={t('fields.name.label')}
            inputProps={{ placeholder: t('fields.name.placeholder') }}
            name="fullname"
          />
          <Field
            component={Input}
            label={t('fields.nickname.label', 'Nama Panggilan')}
            inputProps={{ placeholder: t('fields.nickname.placeholder', 'Tulis nama panggilan disini') }}
            name="nickname"
          />
          <Field
            className={styles.date}
            component={Input}
            label={t('fields.birthDate.label')}
            inputProps={{ placeholder: t('fields.birthDate.placeholder'), type: 'date', value: values.date }}
            name="birthDate"
          />
          <Field
            component={Input}
            label={t('fields.email.label')}
            inputProps={{ placeholder: t('fields.email.placeholder') }}
            name="email"
            validate={isEmail}
          />
          <Field
            component={Input}
            label={t('fields.phone.label', 'Nomor Whatsapp')}
            inputProps={{ placeholder: t('fields.phone.placeholder', 'Tulis nomor whatsapp disini') }}
            name="phone"
            parse={normalizePhone}
          />
          <p style={{ textAlign: 'left', fontSize: isMobile ? '16px' : '1rem', margin: 0, fontFamily: 'Avenir' }}>{t('fields.city.label', 'Pilih Lokasi Domisili')}</p>
          <Field
            component={SelectInput}
            onChange={(e) => setData({ ...values, city: e })}
            name="city"
            options={cityOptions}
            placeholder={t('fields.city.placeholder', 'Pilih salah satu')}
          />
          {values.city === t('fields.city.options.lainnya', 'Lokasi Lainnya') && (
            <Field
              className={styles.cityExtended}
              component={Input}
              inputProps={{ placeholder: t('fields.city.extendedPlaceholder', 'Tulis Nama Lokasi') }}
              name="city-extended"
            />
          )}
          <Field
            component={Input}
            label={t('fields.address.label', 'Alamat Domisili saat ini')}
            inputProps={{ placeholder: t('fields.address.placeholder', 'Tulis alamat domisili saat ini') }}
            name="address"
          />
          <p style={{ textAlign: 'left', fontSize: isMobile ? '16px' : '1rem', margin: 0, fontFamily: 'Avenir' }}>{t('fields.knowFrom.label', 'Dari mana Anda mengetahui Yogzan?')}</p>
          <Field
            component={SelectInput}
            onChange={(e) => setData({ ...values, knowFrom: e })}
            name="knowFrom"
            options={knowFromOptions}
            placeholder={t('fields.knowFrom.placeholder', 'Pilih salah satu')}
          />
          {values.knowFrom === t('fields.knowFrom.options.lainnya', 'Lainnya') && (
            <Field
              className={styles.knowFromExtended}
              component={Input}
              inputProps={{ placeholder: t('fields.knowFrom.extendedPlaceholder', 'Sumber Lainnya') }}
              name="knowFrom-extended"
            />
          )}
          {values.knowFrom === 'Instagram' && (
            <Field
              className={styles.knowFromExtended}
              onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
              component={SelectInput}
              name="knowFrom-extended"
              options={knowFromInstagramOptions}
              placeholder={t('fields.knowFromExtended.placeholder', 'Detail Sumber')}
              style={{ textAlign: 'left' }}
            />
          )}
          {values.knowFrom === 'Tiktok' && (
            <Field
              className={styles.knowFromExtended}
              onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
              component={SelectInput}
              name="knowFrom-extended"
              options={knowFromTiktokOptions}
              placeholder={t('fields.knowFromExtended.placeholder', 'Detail Sumber')}
            />
          )}
          <Button disabled={disabled(values)} variant="active-square" handleClick={() => handleNext(values)}>{t('submit', 'Selanjutnya')}</Button>
        </form>
      )}
    />
  )
}
