import React, { useEffect, useRef, useState } from 'react'
import { Form, Field } from 'react-final-form'
import styles from './styles.module.css'
import coverBooking from '../../assets/cover-booking.png'
import icChecked from '../../assets/checked.svg'
import icUnchecked from '../../assets/unchecked.svg'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { submitFixBooking } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../../components/TextArea'
import moment from 'moment'
import { domNum, getPrefixedPath, intlNation, intlNum } from '../../utils'
import { useTranslation } from 'react-i18next'

export default function Book() {
  moment.locale('id')
  const dispatch = useDispatch()
  const { isLoading } = useSelector(s => s)
  const { t, i18n } = useTranslation('fixbook');
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState({
    "fullname": '',
    "nickname": '',
    "address": '',
    "layanan": '',
    "campus": '',
    "faculty": '',
    "ig": '',
    "ig-mua": '',
    "ig-attire": '',
    "date": '',
    "time": '',
    "phone": '',
    "location": '',
    "knowFrom": '',
  })
  const [checked, setChecked] = useState(false)

  // Translation-based options
  const layananOptions = t('fields.layanan.options', { returnObjects: true });
  const knowFromOptions = t('fields.knowFrom.options', { returnObjects: true });
  const instagramOptions = t('fields.instagramOptions', { returnObjects: true });
  const tiktokOptions = t('fields.tiktokOptions', { returnObjects: true });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    return onlyNums
  };

  const inputProps = [
    { placeholder: 'Tulis Nama Lengkap' },
    { placeholder: 'Tulis Nama Panggilan' },
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Family', 'Cetak Album', 'Lainnya'] },
    { placeholder: 'Tulis Asal Kampus' },
    { placeholder: 'Tulis Fakultas / Jurusan' },
    { placeholder: 'Contoh: @yogzan.graduation' },
    { placeholder: 'HH/BB/TTTT', type: 'date' },
    { placeholder: 'JJ/MM', type: 'time', required: true },
    { placeholder: 'Tulis kontak disini' },
    { placeholder: 'Tulis Lokasi Pemotretan' },
    { placeholder: 'Pilih salah satu', options: ['Instagram', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Facebook', 'Lainnya'] },
    { placeholder: 'Detail Sumber', options: ['Iklan Instagram', 'Muncul di explore instagram', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'], styles: { textAlign: 'left' } },
    { placeholder: 'Detail Sumber', options: ['Iklan Tiktok', 'Muncul di FYP saya', 'Saya mencari hashtag tertentu dan menemukan yogzan', 'Dari influencer/orang lain yang saya ikuti', 'Lainnya'], styles: { textAlign: 'left' } }
  ]

  const handleFormSubmit = (values) => {
    const _layanan = values.layanan === t('fields.layanan.options.5', 'Lainnya') ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    if (_layanan === t('fields.layanan.options.4', 'Cetak Album')) {
      values.date = ''
      values.time = ''
      values.location = ''
      values['ig-mua'] = ''
      values['ig-attire'] = ''
    } else {
      // Format date to YYYY-MM-DD if not empty
      if (values.date) {
        values.date = moment(values.date).isValid() ? moment(values.date).format('YYYY-MM-DD') : values.date;
      }
    }
    const _knowFrom = (values.knowFrom === t('fields.knowFrom.options.5', 'Lainnya') || values.knowFrom === t('fields.knowFrom.options.0', 'Instagram') || values.knowFrom === t('fields.knowFrom.options.1', 'Tiktok')) ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom
    const { knowFromExtended: _, ..._values } = values
    dispatch(submitFixBooking({ ..._values, layanan: _layanan, knowFrom: _knowFrom }, () => {
      setOpenModal(true)
    }))
  }

  const handleCloseModal = () => {
    window.location.href = getPrefixedPath('/fixbook')
  }

  const disabledButton = val => {
    if (val.fullname &&
      val.nickname &&
      val.layanan &&
      val.ig &&
      val.phone &&
      val.knowFrom &&
      (val.layanan === t('fields.layanan.options.4', 'Cetak Album') ||
        (((val.layanan !== t('fields.layanan.options.4', 'Cetak Album') && val.date)) &&
          ((val.layanan !== t('fields.layanan.options.4', 'Cetak Album') && val.time)) &&
          ((val.layanan !== t('fields.layanan.options.4', 'Cetak Album') && val.location))))
    ) {
      if ((val.layanan === t('fields.layanan.options.5', 'Lainnya') && !val['layanan-extended']) ||
        (val.layanan === t('fields.layanan.options.1', 'Wisuda') && !val.campus) ||
        (val.layanan === t('fields.layanan.options.1', 'Wisuda') && !val.faculty) ||
        (val.knowFrom === t('fields.knowFrom.options.5', 'Lainnya') && !val['knowFrom-extended']) ||
        (val.knowFrom === t('fields.knowFrom.options.0', 'Instagram') && !val['knowFrom-extended']) ||
        (val.knowFrom === t('fields.knowFrom.options.1', 'Tiktok') && !val['knowFrom-extended'])
      ) {
        return true
      }
      return false
    } else {
      return true
    }
  }

  const generateLinkWA = (values) => {
    const {
      fullname, nickname, layanan,
      campus, faculty, ig, date, time,
      location
    } = values
    console.log(values)
    const _knowFrom = (values.knowFrom === t('fields.knowFrom.options.5', 'Lainnya') || values.knowFrom === t('fields.knowFrom.options.5', 'Other') || values.knowFrom === t('fields.knowFrom.options.0', 'Instagram') || values.knowFrom === t('fields.knowFrom.options.1', 'Tiktok')) ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom

    // Format date to YYYY-MM-DD if not empty
    let formattedDate = date;
    if (date) {
      formattedDate = moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : date;
    }
    // let waNum = intlNation.includes(location) ? intlNum : domNum
    let waNum;
    let message = '';
    if (i18n.language === 'id') {
      waNum = domNum.replace('+', '')
      if (layanan === 'Wisuda') {
        message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${values.fullname}%0ANama Panggilan: ${values.nickname}%0AUntuk Event: ${layanan}%0AAsal Kampus: ${campus}%0AFakultas/Jurusan: ${faculty}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${formattedDate}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0AMengetahui Yogzan dari: ${_knowFrom}%0ATerimakasih!`
        return `https://wa.me/${waNum}?text=${message}`
      } else {
        const _layanan = layanan === 'Lainnya' ? `${layanan} - ${values['layanan-extended']}` : layanan
        message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${fullname}%0ANama Panggilan: ${nickname}%0AUntuk Event: ${_layanan}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${formattedDate}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0AMengetahui Yogzan dari: ${_knowFrom}%0ATerimakasih!`
        return `https://wa.me/${waNum}?text=${message}`
      }
    } else {
      waNum = intlNum.replace('+', '')
      if (layanan === 'Graduation') {
        message = `Hello Admin! Here is the booking form that I have filled out:%0AFull Name: ${values.fullname}%0ANickname: ${values.nickname}%0AFor Event: ${layanan}%0ACampus: ${campus}%0AFaculty: ${faculty}%0AInstagram Account: ${ig}%0AMUA Instagram Account: ${values['ig-mua']}%0AAttire Instagram Account: ${values['ig-attire']}%0APhoto Shoot Date: ${formattedDate}%0APhoto Shoot Time: ${time}%0AContact: ${values.phone}%0APhoto Shoot Location: ${location}%0AHow did you know Yogzan: ${_knowFrom}%0AThank you!`
      } else {
        const _layanan = layanan === 'Other' ? `${layanan} - ${values['layanan-extended']}` : layanan
        message = `Hello Admin! Here is the booking form that I have filled out:%0AFull Name: ${fullname}%0ANickname: ${nickname}%0AFor Event: ${_layanan}%0AInstagram Account: ${ig}%0AMUA Instagram Account: ${values['ig-mua']}%0AAttire Instagram Account: ${values['ig-attire']}%0APhoto Shoot Date: ${formattedDate}%0APhoto Shoot Time: ${time}%0AContact: ${values.phone}%0APhoto Shoot Location: ${location}%0AHow did you know Yogzan: ${_knowFrom}%0AThank you!`
      }
      return `https://wa.me/${waNum}?text=${message}`
    }
  }

  // Nama Lengkap:
  // Nama Panggilan:
  // Pilih Layanan:
  // Asal Kampus (Untuk Foto Wisuda): 
  // Fakultas/Jurusan (Untuk Foto Wisuda):
  // Akun Instagram:
  // Akun Instagram MUA:
  // Akun Instagram Attire:
  // Pilih Tanggal Pemotretan: 
  // Waktu:
  // Lokasi Pemotretan:

  return (
    <>
      <section className={styles.root}>
        <div>
          <h3>{t('title')}</h3>
          <Form
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <p>{t('fields.layanan.label')}</p>
                <Field
                  component={SelectInput}
                  onChange={(e) => setData({ ...values, layanan: e })}
                  name="layanan"
                  options={layananOptions}
                  placeholder={t('fields.layanan.placeholder')}
                />
                {values.layanan === t('fields.layanan.options.5', 'Lainnya') && (
                  <Field
                    component={TextArea}
                    label={t('fields.layananExtended.label')}
                    inputProps={{ placeholder: t('fields.layananExtended.placeholder') }}
                    name="layanan-extended"
                  />
                )}
                <Field
                  component={Input}
                  label={values.layanan !== t('fields.layanan.options.0', 'Wisuda') ? t('fields.fullname.label') : t('fields.fullname.label', 'Nama Lengkap dan Gelar')}
                  inputProps={{ placeholder: t('fields.fullname.placeholder') }}
                  name="fullname"
                />
                <Field
                  component={Input}
                  label={t('fields.nickname.label')}
                  inputProps={{ placeholder: t('fields.nickname.placeholder') }}
                  name="nickname"
                />
                <Field
                  component={TextArea}
                  label={t('fields.address.label')}
                  inputProps={{ placeholder: t('fields.address.placeholder') }}
                  name="address"
                  helper={t('fields.address.helper')}
                />
                {values.layanan === t('fields.layanan.options.0', 'Wisuda') && (
                  <>
                    <Field
                      component={Input}
                      label={t('fields.campus.label')}
                      inputProps={{ placeholder: t('fields.campus.placeholder') }}
                      name="campus"
                    />
                    <Field
                      component={Input}
                      label={t('fields.faculty.label')}
                      inputProps={{ placeholder: t('fields.faculty.placeholder') }}
                      name="faculty"
                    />
                  </>
                )}
                <Field
                  component={Input}
                  label={t('fields.ig.label')}
                  inputProps={{ placeholder: t('fields.ig.placeholder') }}
                  name="ig"
                  helper={t('fields.ig.helper')}
                />
                {values.layanan !== t('fields.layanan.options.4', 'Cetak Album') && (
                  <>
                    <Field
                      component={Input}
                      label={t('fields.igMua.label')}
                      inputProps={{ placeholder: t('fields.igMua.placeholder') }}
                      name="ig-mua"
                    />
                    <Field
                      component={Input}
                      label={t('fields.igAttire.label')}
                      inputProps={{ placeholder: t('fields.igAttire.placeholder') }}
                      name="ig-attire"
                    />
                    <Field
                      className={styles.date}
                      component={Input}
                      label={t('fields.date.label')}
                      inputProps={{ type: 'date', placeholder: t('fields.date.placeholder'), value: values.date }}
                      name="date"
                    />
                    <Field
                      className={styles.date}
                      component={Input}
                      label={t('fields.time.label')}
                      inputProps={{ type: 'time', placeholder: t('fields.time.placeholder'), value: values.time }}
                      name="time"
                    />
                  </>
                )}
                <Field
                  component={Input}
                  label={t('fields.phone.label')}
                  inputProps={{ placeholder: t('fields.phone.placeholder') }}
                  name="phone"
                  parse={normalizePhone}
                />
                {values.layanan !== t('fields.layanan.options.4', 'Cetak Album') && (
                  <Field
                    component={Input}
                    label={t('fields.location.label')}
                    inputProps={{ placeholder: t('fields.location.placeholder') }}
                    name="location"
                  />
                )}
                <p>{t('fields.knowFrom.label')}</p>
                <Field
                  component={SelectInput}
                  onChange={(e) => setData({ ...values, knowFrom: e })}
                  name="knowFrom"
                  options={knowFromOptions}
                  placeholder={t('fields.knowFrom.placeholder')}
                />
                {values.knowFrom === t('fields.knowFrom.options.6', 'Lainnya') && (
                  <Field
                    className={styles.knowFromExtended}
                    component={Input}
                    inputProps={{ placeholder: t('fields.knowFromExtended.placeholder') }}
                    name="knowFrom-extended"
                  />
                )}
                {values.knowFrom === t('fields.knowFrom.options.0', 'Instagram') && (
                  <Field
                    className={styles.knowFromExtended}
                    onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
                    component={SelectInput}
                    name="knowFrom-extended"
                    options={instagramOptions}
                    placeholder={t('fields.knowFromExtended.placeholder')}
                    style={{ textAlign: 'left' }}
                  />
                )}
                {values.knowFrom === t('fields.knowFrom.options.1', 'Tiktok') && (
                  <Field
                    className={styles.knowFromExtended}
                    onChange={(e) => setData({ ...values, "knowFrom-extended": e })}
                    component={SelectInput}
                    name="knowFrom-extended"
                    options={tiktokOptions}
                    placeholder={t('fields.knowFromExtended.placeholder')}
                  />
                )}
                <div className={styles.checkbox} onClick={() => setChecked(v => !v)}>
                  {checked ? (
                    <img src={icChecked} />
                  ) : (
                    <img src={icUnchecked} />
                  )}
                  <p style={{ textAlign: "left" }}>
                    {t('terms')}
                    <a
                      href="https://www.yogzan.com/price-list/wisuda/Terms_of_Service"
                      style={{ color: "#512B58", fontWeight: 700 }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a> yogzan
                  </p>
                </div>
                <a
                  className={disabledButton(values) || !checked ? styles.disabledSubmit : ''}
                  onClick={() => handleSubmit(values)}
                  href={generateLinkWA(values)}
                  target='_blank'
                  rel="noreferrer"
                >
                  <Button
                    variant="active-square"
                    disabled={disabledButton(values) || !checked || isLoading.submitFixBooking}
                    isLoading={isLoading.submitFixBooking}
                  >
                    {t('submit')}
                  </Button>
                </a>
              </form>
            )}
          />
        </div>
        <img src={coverBooking} />
      </section>
      {openModal && (
        <Modal className={styles.confirmModal} open={openModal} onClose={handleCloseModal}>
          <h3>{t('modal.title')}</h3>
          <p>{t('modal.desc')}</p>
          <Button handleClick={handleCloseModal} variant="active-square">{t('modal.close')}</Button>
        </Modal>
      )}
    </>
  )
}
