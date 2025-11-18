import React, { useEffect, useRef, useState } from 'react'
import { Form, Field } from 'react-final-form'
import styles from './styles.module.css'
import coverBooking from '../../assets/YGZ-16.jpg'
import icChecked from '../../assets/checked.svg'
import icUnchecked from '../../assets/unchecked.svg'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { submitBooking } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../../components/TextArea'
import ReactGA from 'react-ga4'
import { intlNum, domNum, intlNation } from '../../utils'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import chevron from '../../assets/chevron.svg'
import SelectInputGroup from '../../components/SelectInputGroup'

export default function Book() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(s => s);
  const { t, i18n } = useTranslation('book');
  const [openModal, setOpenModal] = useState(false)
  const [checked, setChecked] = useState(false)
  const [data, setData] = useState({
    "name": '',
    "layanan": '',
    "city": '',
    "date": '',
    "phone": '',
    "knowFrom": '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    return onlyNums
  };

  // Translation-based options
  const layananOptions = t('fields.layanan.options', { returnObjects: true });
  const cityOptions = t('fields.city.options', { returnObjects: true });
  const knowFromOptions = t('fields.knowFrom.options', { returnObjects: true });
  const instagramOptions = t('fields.instagramOptions', { returnObjects: true });
  const tiktokOptions = t('fields.tiktokOptions', { returnObjects: true });

  const handleFormSubmit = (values) => {
    ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', 'Dapatkan Daftar Harga')
    const _layanan = values.layanan === t('fields.layanan.options.5', 'Lainnya') ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    const _city = values.city === t('fields.city.options.0.options.8', 'Lokasi Lainnya') || values.city === t('fields.city.options.1.options.2', 'Negara Lainnya') ? `${values.city} - ${values['city-extended']}` : values.city
    const _knowFrom = (values.knowFrom === t('fields.knowFrom.options.5', 'Lainnya') || values.knowFrom === t('fields.knowFrom.options.0', 'Instagram') || values.knowFrom === t('fields.knowFrom.options.1', 'Tiktok')) ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom
    let _date = checked ? 'Belum menentukan waktu' : values.date
    if (_layanan === t('fields.layanan.options.4', 'Cetak Album')) {
      _date = ''
    }
    // Format date to YYYY-MM-DD if not empty and not 'Belum menentukan waktu'
    if (_date && _date !== 'Belum menentukan waktu') {
      _date = moment(_date).format('YYYY-MM-DD');
    }
    dispatch(submitBooking({ ...values, date: _date, city: _city, layanan: _layanan, knowFrom: _knowFrom }, () => {
      setOpenModal(true)
    }))

  }

  const handleCloseModal = () => {
    window.location.href = '/book'
  }

  const disabledButton = val => {
    val = { ...val, checked }
    if (val.name &&
      val.layanan &&
      val.city &&
      (val.layanan === t('fields.layanan.options.4', 'Cetak Album') ||
        (val.layanan !== t('fields.layanan.options.4', 'Cetak Album') && (val.date || checked))) &&
      val.phone &&
      val.knowFrom
    ) {
      if (((val.layanan === t('fields.layanan.options.5', 'Lainnya') || val.layanan === t('fields.layanan.options.5', 'Other')) && !val['layanan-extended']) ||
        ((val.city === t('fields.city.options.0.options.8', 'Lokasi Lainnya') || val.city === t('fields.city.options.1.options.2', 'Negara Lainnya')) && !val['city-extended']) ||
        ((val.knowFrom === t('fields.knowFrom.options.5', 'Lainnya') || val.knowFrom === t('fields.knowFrom.options.0', 'Instagram') || val.knowFrom === t('fields.knowFrom.options.1', 'Tiktok')) && !val['knowFrom-extended'])
      ) {
        return true
      }
      return false
    } else {
      return true
    }
  }

  const generateLinkWA = (values) => {
    const _layanan = (values.layanan === t('fields.layanan.options.5', 'Lainnya') || values.layanan === t('fields.layanan.options.5', 'Other')) ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    const _city = (values.city === t('fields.city.options.0.options.8', 'Lokasi Lainnya') || values.city === t('fields.city.options.1.options.2', 'Negara Lainnya')) ? `${values.city} - ${values['city-extended']}` : values.city
    let _date = checked ? 'Belum menentukan waktu' : values.date
    if (_layanan === t('fields.layanan.options.4', 'Cetak Album')) {
      _date = ''
    }
    // Format date to YYYY-MM-DD if not empty and not 'Belum menentukan waktu'
    if (_date && _date !== 'Belum menentukan waktu') {
      _date = moment(_date).format('YYYY-MM-DD');
    }
    const isIntl = [...intlNation, t('fields.city.options.1.options.2', 'Negara Lainnya')].includes(values.city)
    // const waNum = isIntl ? intlNum : domNum
    let waNum;
    let message;
    if (i18n.language === 'id') {
      waNum = domNum
      message = `Halo Admin! Saya ingin info Pricelist.%0ANama: ${values.name}%0AUntuk Event: ${_layanan}%0ATanggal/Bulan: ${_date}%0ALokasi: ${_city}%0AKontak: ${values.phone}%0ATerimakasih!`;
    } else {
      waNum = intlNum
      message = `Hello Admin! I want to get the Pricelist info.%0AName: ${values.name}%0AFor Event: ${_layanan}%0ADate/Month: ${_date}%0ALocation: ${_city}%0AContact: ${values.phone}%0AThank you!`;
    }
    return `https://wa.me/${waNum}?text=${message}`
  }

  return (
    <>
      <section className={styles.root}>
        <div>
          <h3>{t('title')}</h3>
          <p>{t('desc')}</p>
          <Form
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  component={Input}
                  label={t('fields.name.label')}
                  inputProps={{ placeholder: t('fields.name.placeholder') }}
                  name="name"
                />
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
                <p>{t('fields.city.label')}</p>
                <Field
                  // className={styles.selectCity}
                  component={SelectInputGroup}
                  onChange={(e) => setData({ ...values, city: e })}
                  name="city"
                  options={cityOptions}
                  placeholder={t('fields.city.placeholder')}
                  suffixIcon={<img className={styles.imgSuffix} img src={chevron} alt="chevron" />}
                />
                {(values.city === t('fields.city.options.0.options.8', 'Lokasi Lainnya') || values.city === t('fields.city.options.1.options.2', 'Negara Lainnya')) && (
                  <Field
                    className={styles.cityExtended}
                    component={Input}
                    inputProps={{ placeholder: t('fields.cityExtended.placeholder') }}
                    name="city-extended"
                  />
                )}
                {values.layanan !== t('fields.layanan.options.4', 'Cetak Album') && (
                  <>
                    <Field
                      className={styles.date}
                      component={Input}
                      label={t('fields.date.label')}
                      inputProps={{ type: 'date', disabled: checked, placeholder: t('fields.date.placeholder'), value: checked ? '' : values.date }}
                      name="date"
                    />
                    <div className={styles.checkbox} onClick={() => setChecked(v => !v)}>
                      {checked ? (
                        <img src={icChecked} />
                      ) : (
                        <img src={icUnchecked} />
                      )}
                      <p>{t('fields.noDate')}</p>
                    </div>
                  </>
                )}
                <Field
                  component={Input}
                  label={t('fields.phone.label')}
                  inputProps={{ placeholder: t('fields.phone.placeholder') }}
                  name="phone"
                  parse={normalizePhone}
                />
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
                <a
                  className={disabledButton(values) ? styles.disabledSubmit : ''}
                  onClick={() => handleSubmit(values)}
                  href={generateLinkWA(values)}
                  target='_blank'
                  rel="noreferrer"
                >
                  <Button
                    variant="active-square"
                    disabled={disabledButton(values) || isLoading.submitBooking}
                    isLoading={isLoading.submitBooking}
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
