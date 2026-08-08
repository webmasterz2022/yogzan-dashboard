'use client';

import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useTranslations, useLocale } from 'next-intl';
import styles from '../../../_cra-pages/Book/styles.module.css';
import Input from '../../../components/Input';
import SelectInput from '../../../components/SelectInput';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { submitBooking } from '../../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '../../../components/TextArea';
import ReactGA from 'react-ga4';
import { intlNum, domNum, intlNation } from '../../../utils';
import moment from 'moment';
import SelectInputGroup from '../../../components/SelectInputGroup';

const coverBooking = '/assets/YGZ-16.jpg';
const icChecked = '/assets/checked.svg';
const icUnchecked = '/assets/unchecked.svg';
const chevron = '/assets/chevron.svg';

export default function BookClient() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s: any) => s);
  const t = useTranslations('book');
  const locale = useLocale();
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({ name: '', layanan: '', city: '', date: '', phone: '', knowFrom: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const normalizePhone = (value: string) => value ? value.replace(/[^\d]/g, '') : value;

  const layananOptions = t.raw('fields.layanan.options') as string[];
  const cityOptions = t.raw('fields.city.options') as any[];
  const knowFromOptions = t.raw('fields.knowFrom.options') as string[];
  const instagramOptions = t.raw('fields.instagramOptions') as string[];
  const tiktokOptions = t.raw('fields.tiktokOptions') as string[];

  const handleFormSubmit = (values: any) => {
    ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', 'Dapatkan Daftar Harga');
    const _layanan = values.layanan === layananOptions[5] ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan;
    const _city = (values.city === (cityOptions[0]?.options?.[8] ?? 'Lokasi Lainnya') || values.city === (cityOptions[1]?.options?.[2] ?? 'Negara Lainnya'))
      ? `${values.city} - ${values['city-extended']}` : values.city;
    const _knowFrom = [knowFromOptions[5], knowFromOptions[0], knowFromOptions[1]].includes(values.knowFrom)
      ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom;
    let _date = checked ? 'Belum menentukan waktu' : values.date;
    if (_layanan === layananOptions[4]) _date = '';
    if (_date && _date !== 'Belum menentukan waktu') _date = moment(_date).format('YYYY-MM-DD');
    dispatch(submitBooking({ ...values, date: _date, city: _city, layanan: _layanan, knowFrom: _knowFrom }, () => {
      setOpenModal(true);
    }) as any);
  };

  const disabledButton = (val: any) => {
    val = { ...val, checked };
    if (val.name && val.layanan && val.city &&
      (val.layanan === layananOptions[4] || (val.layanan !== layananOptions[4] && (val.date || checked))) &&
      val.phone && val.knowFrom) {
      if (([layananOptions[5]].includes(val.layanan) && !val['layanan-extended']) ||
        ([cityOptions[0]?.options?.[8], cityOptions[1]?.options?.[2]].includes(val.city) && !val['city-extended']) ||
        ([knowFromOptions[5], knowFromOptions[0], knowFromOptions[1]].includes(val.knowFrom) && !val['knowFrom-extended'])) {
        return true;
      }
      return false;
    }
    return true;
  };

  const generateLinkWA = (values: any) => {
    const _layanan = layananOptions[5] === values.layanan ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan;
    const _city = [cityOptions[0]?.options?.[8], cityOptions[1]?.options?.[2]].includes(values.city)
      ? `${values.city} - ${values['city-extended']}` : values.city;
    let _date = checked ? 'Belum menentukan waktu' : values.date;
    if (_layanan === layananOptions[4]) _date = '';
    if (_date && _date !== 'Belum menentukan waktu') _date = moment(_date).format('YYYY-MM-DD');
    let waNum, message;
    if (locale === 'id') {
      waNum = domNum.replace('+', '');
      message = `Halo Admin! Saya ingin info Pricelist.%0ANama: ${values.name}%0AUntuk Event: ${_layanan}%0ATanggal/Bulan: ${_date}%0ALokasi: ${_city}%0AKontak: ${values.phone}%0ATerimakasih!`;
    } else {
      waNum = intlNum.replace('+', '');
      message = `Hello Admin! I want to get the Pricelist info.%0AName: ${values.name}%0AFor Event: ${_layanan}%0ADate/Month: ${_date}%0ALocation: ${_city}%0AContact: ${values.phone}%0AThank you!`;
    }
    return `https://wa.me/${waNum}?text=${message}`;
  };

  return (
    <>
      <section className={styles.root}>
        <div>
          <h3>{t('title')}</h3>
          <p>{t('desc')}</p>
          <Form
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }: any) => (
              <form onSubmit={handleSubmit}>
                <Field component={Input} label={t('fields.name.label')} inputProps={{ placeholder: t('fields.name.placeholder') }} name="name" />
                <p>{t('fields.layanan.label')}</p>
                <Field component={SelectInput} onChange={(e: any) => setData({ ...values, layanan: e })} name="layanan" options={layananOptions} placeholder={t('fields.layanan.placeholder')} />
                {values.layanan === layananOptions[5] && (
                  <Field component={TextArea} label={t('fields.layananExtended.label')} inputProps={{ placeholder: t('fields.layananExtended.placeholder') }} name="layanan-extended" />
                )}
                <p>{t('fields.city.label')}</p>
                <Field
                  component={SelectInputGroup}
                  onChange={(e: any) => setData({ ...values, city: e })}
                  name="city"
                  options={cityOptions}
                  placeholder={t('fields.city.placeholder')}
                  suffixIcon={<img className={styles.imgSuffix} src={chevron} alt="chevron" />}
                />
                {[cityOptions[0]?.options?.[8], cityOptions[1]?.options?.[2]].includes(values.city) && (
                  <Field className={styles.cityExtended} component={Input} inputProps={{ placeholder: t('fields.cityExtended.placeholder') }} name="city-extended" />
                )}
                {values.layanan !== layananOptions[4] && (
                  <>
                    <Field
                      className={styles.date}
                      component={Input}
                      label={t('fields.date.label')}
                      inputProps={{ type: 'date', disabled: checked, placeholder: t('fields.date.placeholder'), value: checked ? '' : values.date }}
                      name="date"
                    />
                    <div className={styles.checkbox} onClick={() => setChecked((v: boolean) => !v)}>
                      <img src={checked ? icChecked : icUnchecked} alt="" />
                      <p>{t('fields.noDate')}</p>
                    </div>
                  </>
                )}
                <Field component={Input} label={t('fields.phone.label')} inputProps={{ placeholder: t('fields.phone.placeholder') }} name="phone" parse={normalizePhone} />
                <p>{t('fields.knowFrom.label')}</p>
                <Field component={SelectInput} onChange={(e: any) => setData({ ...values, knowFrom: e })} name="knowFrom" options={knowFromOptions} placeholder={t('fields.knowFrom.placeholder')} />
                {values.knowFrom === knowFromOptions[6] && (
                  <Field className={styles.knowFromExtended} component={Input} inputProps={{ placeholder: t('fields.knowFromExtended.placeholder') }} name="knowFrom-extended" />
                )}
                {values.knowFrom === knowFromOptions[0] && (
                  <Field className={styles.knowFromExtended} onChange={(e: any) => setData({ ...values, 'knowFrom-extended': e })} component={SelectInput} name="knowFrom-extended" options={instagramOptions} placeholder={t('fields.knowFromExtended.placeholder')} />
                )}
                {values.knowFrom === knowFromOptions[1] && (
                  <Field className={styles.knowFromExtended} onChange={(e: any) => setData({ ...values, 'knowFrom-extended': e })} component={SelectInput} name="knowFrom-extended" options={tiktokOptions} placeholder={t('fields.knowFromExtended.placeholder')} />
                )}
                <a
                  className={disabledButton(values) ? styles.disabledSubmit : ''}
                  onClick={() => handleSubmit(values)}
                  href={generateLinkWA(values)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="active-square" disabled={disabledButton(values) || isLoading.submitBooking} isLoading={isLoading.submitBooking}>
                    {t('submit')}
                  </Button>
                </a>
              </form>
            )}
          />
        </div>
        <img src={coverBooking} alt="booking" />
      </section>
      {openModal && (
        <Modal className={styles.confirmModal} open={openModal} onClose={() => { window.location.href = '/book'; }}>
          <h3>{t('modal.title')}</h3>
          <p>{t('modal.desc')}</p>
          <Button handleClick={() => { window.location.href = '/book'; }} variant="active-square">{t('modal.close')}</Button>
        </Modal>
      )}
    </>
  );
}
