'use client';

import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useTranslations, useLocale } from 'next-intl';
import styles from '../../../_cra-pages/FixBook/styles.module.css';
import Input from '../../../components/Input';
import SelectInput from '../../../components/SelectInput';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { submitFixBooking } from '../../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '../../../components/TextArea';
import moment from 'moment';
import { domNum, intlNum } from '../../../utils';

const coverBooking = '/assets/cover-booking.png';
const icChecked = '/assets/checked.svg';
const icUnchecked = '/assets/unchecked.svg';

export default function FixBookClient() {
  moment.locale('id');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s: any) => s);
  const t = useTranslations('fixbook');
  const locale = useLocale();
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({
    fullname: '', nickname: '', address: '', layanan: '', campus: '', faculty: '',
    ig: '', 'ig-mua': '', 'ig-attire': '', date: '', time: '', phone: '', location: '', knowFrom: '',
  });

  const layananOptions = t.raw('fields.layanan.options') as string[];
  const knowFromOptions = t.raw('fields.knowFrom.options') as string[];
  const instagramOptions = t.raw('fields.instagramOptions') as string[];
  const tiktokOptions = t.raw('fields.tiktokOptions') as string[];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const normalizePhone = (value: string) => value ? value.replace(/[^\d]/g, '') : value;

  const handleFormSubmit = (values: any) => {
    const _layanan = values.layanan === layananOptions[5] ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan;
    if (_layanan === layananOptions[4]) {
      values.date = ''; values.time = ''; values.location = '';
      values['ig-mua'] = ''; values['ig-attire'] = '';
    } else if (values.date) {
      values.date = moment(values.date).isValid() ? moment(values.date).format('YYYY-MM-DD') : values.date;
    }
    const _knowFrom = [knowFromOptions[5], knowFromOptions[0], knowFromOptions[1]].includes(values.knowFrom)
      ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom;
    dispatch(submitFixBooking({ ...values, layanan: _layanan, knowFrom: _knowFrom }, () => setOpenModal(true)) as any);
  };

  const disabledButton = (val: any) => {
    if (val.fullname && val.nickname && val.layanan && val.ig && val.phone && val.knowFrom &&
      (val.layanan === layananOptions[4] || (val.date && val.time && val.location))) {
      if ((val.layanan === layananOptions[5] && !val['layanan-extended']) ||
        (val.layanan === layananOptions[0] && (!val.campus || !val.faculty)) ||
        ([knowFromOptions[5], knowFromOptions[0], knowFromOptions[1]].includes(val.knowFrom) && !val['knowFrom-extended'])) {
        return true;
      }
      return false;
    }
    return true;
  };

  const generateLinkWA = (values: any) => {
    const { fullname, nickname, layanan, campus, faculty, ig, date, time, location } = values;
    const _knowFrom = [knowFromOptions[5], knowFromOptions[0], knowFromOptions[1]].includes(values.knowFrom)
      ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom;
    const formattedDate = date && moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : date;
    const isGraduation = layanan === layananOptions[0];
    let waNum, message;
    if (locale === 'id') {
      waNum = domNum.replace('+', '');
      if (isGraduation) {
        message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${fullname}%0ANama Panggilan: ${nickname}%0AUntuk Event: ${layanan}%0AAsal Kampus: ${campus}%0AFakultas/Jurusan: ${faculty}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${formattedDate}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0AMengetahui Yogzan dari: ${_knowFrom}%0ATerimakasih!`;
      } else {
        const _l = layanan === layananOptions[5] ? `${layanan} - ${values['layanan-extended']}` : layanan;
        message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${fullname}%0ANama Panggilan: ${nickname}%0AUntuk Event: ${_l}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${formattedDate}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0AMengetahui Yogzan dari: ${_knowFrom}%0ATerimakasih!`;
      }
    } else {
      waNum = intlNum.replace('+', '');
      if (isGraduation) {
        message = `Hello Admin! Here is the booking form I filled out:%0AFull Name: ${fullname}%0ANickname: ${nickname}%0AFor Event: ${layanan}%0ACampus: ${campus}%0AFaculty: ${faculty}%0AInstagram: ${ig}%0AMUA IG: ${values['ig-mua']}%0AAttire IG: ${values['ig-attire']}%0ADate: ${formattedDate}%0ATime: ${time}%0AContact: ${values.phone}%0ALocation: ${location}%0AFrom: ${_knowFrom}%0AThank you!`;
      } else {
        const _l = layanan === 'Other' ? `${layanan} - ${values['layanan-extended']}` : layanan;
        message = `Hello Admin! Here is the booking form I filled out:%0AFull Name: ${fullname}%0ANickname: ${nickname}%0AFor Event: ${_l}%0AInstagram: ${ig}%0AMUA IG: ${values['ig-mua']}%0AAttire IG: ${values['ig-attire']}%0ADate: ${formattedDate}%0ATime: ${time}%0AContact: ${values.phone}%0ALocation: ${location}%0AFrom: ${_knowFrom}%0AThank you!`;
      }
    }
    return `https://wa.me/${waNum}?text=${message}`;
  };

  return (
    <>
      <section className={styles.root}>
        <div>
          <h3>{t('title')}</h3>
          <Form
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }: any) => (
              <form onSubmit={handleSubmit}>
                <p>{t('fields.layanan.label')}</p>
                <Field component={SelectInput} onChange={(e: any) => setData({ ...values, layanan: e })} name="layanan" options={layananOptions} placeholder={t('fields.layanan.placeholder')} />
                {values.layanan === layananOptions[5] && (
                  <Field component={TextArea} label={t('fields.layananExtended.label')} inputProps={{ placeholder: t('fields.layananExtended.placeholder') }} name="layanan-extended" />
                )}
                <Field component={Input} label={t('fields.fullname.label')} inputProps={{ placeholder: t('fields.fullname.placeholder') }} name="fullname" />
                <Field component={Input} label={t('fields.nickname.label')} inputProps={{ placeholder: t('fields.nickname.placeholder') }} name="nickname" />
                <Field component={TextArea} label={t('fields.address.label')} inputProps={{ placeholder: t('fields.address.placeholder') }} name="address" helper={t('fields.address.helper')} />
                {values.layanan === layananOptions[0] && (
                  <>
                    <Field component={Input} label={t('fields.campus.label')} inputProps={{ placeholder: t('fields.campus.placeholder') }} name="campus" />
                    <Field component={Input} label={t('fields.faculty.label')} inputProps={{ placeholder: t('fields.faculty.placeholder') }} name="faculty" />
                  </>
                )}
                <Field component={Input} label={t('fields.ig.label')} inputProps={{ placeholder: t('fields.ig.placeholder') }} name="ig" helper={t('fields.ig.helper')} />
                {values.layanan !== layananOptions[4] && (
                  <>
                    <Field component={Input} label={t('fields.igMua.label')} inputProps={{ placeholder: t('fields.igMua.placeholder') }} name="ig-mua" />
                    <Field component={Input} label={t('fields.igAttire.label')} inputProps={{ placeholder: t('fields.igAttire.placeholder') }} name="ig-attire" />
                    <Field className={styles.date} component={Input} label={t('fields.date.label')} inputProps={{ type: 'date', placeholder: t('fields.date.placeholder'), value: values.date }} name="date" />
                    <Field className={styles.date} component={Input} label={t('fields.time.label')} inputProps={{ type: 'time', placeholder: t('fields.time.placeholder'), value: values.time }} name="time" />
                  </>
                )}
                <Field component={Input} label={t('fields.phone.label')} inputProps={{ placeholder: t('fields.phone.placeholder') }} name="phone" parse={normalizePhone} />
                {values.layanan !== layananOptions[4] && (
                  <Field component={Input} label={t('fields.location.label')} inputProps={{ placeholder: t('fields.location.placeholder') }} name="location" />
                )}
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
                <div className={styles.checkbox} onClick={() => setChecked((v: boolean) => !v)}>
                  <img src={checked ? icChecked : icUnchecked} alt="" />
                  <p style={{ textAlign: 'left' }}>
                    {t('terms')}
                    <a href="https://www.yogzan.com/price-list/wisuda/Terms_of_Service" style={{ color: '#512B58', fontWeight: 700 }} target="_blank" rel="noreferrer">Terms of Service</a> yogzan
                  </p>
                </div>
                <a
                  className={disabledButton(values) || !checked ? styles.disabledSubmit : ''}
                  onClick={() => handleSubmit(values)}
                  href={generateLinkWA(values)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="active-square" disabled={disabledButton(values) || !checked || isLoading.submitFixBooking} isLoading={isLoading.submitFixBooking}>
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
        <Modal className={styles.confirmModal} open={openModal} onClose={() => { window.location.href = '/fixbook'; }}>
          <h3>{t('modal.title')}</h3>
          <p>{t('modal.desc')}</p>
          <Button handleClick={() => { window.location.href = '/fixbook'; }} variant="active-square">{t('modal.close')}</Button>
        </Modal>
      )}
    </>
  );
}
