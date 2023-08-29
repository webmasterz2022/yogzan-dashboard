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
import { submitBooking } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../../components/TextArea'
import ReactGA from 'react-ga4'

export default function Book() {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(s => s)
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
    window.scrollTo(0,0)
  }, [])

  const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    return onlyNums
  };

  const inputProps = [
    { placeholder: 'Tulis Nama Pemesan' },
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Family', 'Lainnya'] },
    { placeholder: 'Pilih salah satu', options: ['Bandung', 'Jabodetabek', 'Malang', 'Surabaya', 'Semarang', 'Yogyakarta', 'Kota Lainnya'] },
    { placeholder: 'HH/BB/TTTT', type: 'date', disabled: checked },
    { placeholder: 'Tulis kontak disini' },
    { placeholder: 'Pilih salah satu', options: ['Instagram', 'Facebook', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Lainnya'] },
  ]

  const handleFormSubmit = (values) => {
    ReactGA._gaCommandSendEvent('btnPesanSekarang', 'click', 'Pesan Sekarang')
    const _layanan = values.layanan === 'Lainnya' ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    const _city = values.city === 'Kota Lainnya' ? `${values.city} - ${values['city-extended']}` : values.city
    const _knowFrom = values.knowFrom === 'Lainnya' ? `${values.knowFrom} - ${values['knowFrom-extended']}` : values.knowFrom
    const _date = checked ? 'Belum menentukan waktu' : values.date
    dispatch(submitBooking({...values, date: _date, city: _city, layanan: _layanan, knowFrom: _knowFrom}, () => {
      setOpenModal(true)
    }))

  }

  const handleCloseModal = () => {    
    window.location.href = '/book'
  }

  const disabledButton = val => {
    val = {...val, checked}
    if(val.name && val.layanan && 
      val.city && 
      (val.date || checked) &&
      val.phone && val.knowFrom
    ) {
      if((val.layanan === 'Lainnya' && !val['layanan-extended']) || 
        (val.city === 'Kota Lainnya' && !val['city-extended']) ||
        (val.knowFrom === 'Lainnya' && !val['knowFrom-extended'])
      ) {
        return true
      }
      return false
    } else {
      return true
    }
  }

  const generateLinkWA = (values) => {
    const _layanan = values.layanan === 'Lainnya' ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    const _city = values.city === 'Kota Lainnya' ? `${values.city} - ${values['city-extended']}` : values.city
    const _date = checked ? 'Belum menentukan waktu' : values.date
    const message = `Halo Admin! Saya ingin info Pricelist.%0ANama: ${values.name}%0AUntuk Event: ${_layanan}%0ATanggal/Bulan: ${_date}%0AKota: ${_city}%0AKontak: ${values.phone}%0ATerimakasih!`
    return `https://wa.me/+6285876020261?text=${message}`
  }

  return (
    <>
      <section className={styles.root}>
        <div>
          <h3>Kamu Berhak Dapat Layanan Terbaik</h3>
          <p>
            Ayo kenang setiap momen berharga kamu dengan cara paling indah yang bisa kamu 
            bayangkan. Dapatkan daftar harga Yogzan dengan mengisi formulir di bawah ini! 
          </p>
          <Form 
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Field 
                  component={Input} 
                  label="Nama" 
                  inputProps={inputProps[0]} 
                  name="name" 
                />
                <p>Pilih Layanan</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, layanan: e})}
                  name="layanan" 
                  {...inputProps[1]} 
                />
                {values.layanan === 'Lainnya' && (
                  <>
                    <Field 
                      component={TextArea}
                      label="Tuliskan kebutuhan kamu secara detail" 
                      inputProps={{placeholder: 'Tulis kebutuhanmu disini'}} 
                      name="layanan-extended" 
                    />
                  </>
                )}
                <p>Pilih Kota</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, city: e})}
                  name="city" 
                  {...inputProps[2]} 
                />
                {values.city === 'Kota Lainnya' && (
                  <Field 
                    className={styles.cityExtended}
                    component={Input} 
                    inputProps={{placeholder: 'Tulis Nama Kota'}} 
                    name="city-extended" 
                  />
                )}
                <Field 
                  className={styles.date}
                  component={Input} 
                  label="Pilih Tanggal Pemotretan" 
                  inputProps={{...inputProps[3], value: checked ? '' : values.date}} 
                  name="date" 
                />
                <div className={styles.checkbox} onClick={() => setChecked(v => !v)}>
                  {checked ? (
                    <img src={icChecked} />
                  ) : (
                    <img src={icUnchecked} />
                  )}
                  <p>Belum menentukan waktu</p>
                </div>
                <Field 
                  component={Input} 
                  label="Nomor Whatsapp yang dapat dihubungi" 
                  inputProps={inputProps[4]} 
                  name="phone" 
                  parse={normalizePhone}
                />
                <p>Dari mana Anda mengetahui Yogzan?</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, knowFrom: e})}
                  name="knowFrom" 
                  {...inputProps[5]} 
                />
                {values.knowFrom === 'Lainnya' && (
                  <Field 
                    className={styles.knowFromExtended}
                    component={Input} 
                    inputProps={{placeholder: 'Sumber Lainnya'}} 
                    name="knowFrom-extended" 
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
                    Dapatkan Daftar Harga
                  </Button>
                </a>
              </form>
            )}
          />
        </div>
        <img src={coverBooking}/>
      </section>
      {openModal && (
        <Modal className={styles.confirmModal} open={openModal} onClose={handleCloseModal}>
          <h3>Pesanan kami terima!</h3>
          <p>
            Terimakasih sudah mempercayakan kepada kami. 
            Kami akan menghubungi Anda secepatnya, pastikan nomor Anda selalu aktif. 
          </p>
          <Button handleClick={handleCloseModal} variant="active-square">Tutup</Button>
        </Modal>
      )}
    </>
  )
}
