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
import { useDispatch } from 'react-redux'
import TextArea from '../../components/TextArea'
import moment from 'moment'

export default function Book() {
  moment.locale('id')
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState({
    "fullname": '',
    "nickname": '',
    "layanan": '',
    "campus": '',
    "faculty": '',
    "ig": '',
    "ig-mua": '',
    "ig-attire": '',
    "date": '',
    "time": '',
    "phone": '',
    "location": ''
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
    { placeholder: 'Tulis Nama Lengkap' },
    { placeholder: 'Tulis Nama Panggilan' },
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Family', 'Lainnya'] },
    { placeholder: 'Tulis Asal Kampus' },
    { placeholder: 'Tulis Fakultas / Jurusan' },
    { placeholder: 'Contoh: @yogzan.graduation' },
    { placeholder: 'HH/BB/TTTT', type: 'date' },
    { placeholder: 'JJ/MM', type: 'time' },
    { placeholder: 'Tulis kontak disini' },
    { placeholder: 'Tulis Lokasi Pemotretan' },

  ]

  const handleFormSubmit = (values) => {
    const _layanan = values.layanan === 'Lainnya' ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    dispatch(submitFixBooking({...values, layanan: _layanan}, () => {
      setOpenModal(true)
    }))
  }

  const handleCloseModal = () => {    
    window.location.href = '/fixbook'
  }

  const disabledButton = val => {
    if(val.fullname && 
      val.nickname &&
      val.layanan && 
      val.ig && 
      val.date &&
      val.time &&
      val.phone && 
      val.location
    ) {
      if((val.layanan === 'Lainnya' && !val['layanan-extended']) || 
      (val.layanan === 'Wisuda' && !val.campus) ||
      (val.layanan === 'Wisuda' && !val.faculty)
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
    if(layanan === 'Wisuda') {
      const message = `Halo Admin! Saya ingin melakukan Booking.%0ANama Lengkap: ${values.fullname}%0ANama Panggilan: ${values.nickname}%0AUntuk Event: ${layanan}%0AAsal Kampus: ${campus}%0AFakultas/Jurusan: ${faculty}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${moment(date).format('dddd, DD MMM YYYY')}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0ATerimakasih!`
      return `https://wa.me/+6281313269255?text=${message}`
    } else {
      const _layanan = layanan === 'Lainnya' ? `${layanan} - ${values['layanan-extended']}` : layanan
      const message = `Halo Admin! Saya ingin melakukan Booking.%0ANama Lengkap: ${fullname}%0ANama Panggilan: ${nickname}%0AUntuk Event: ${_layanan}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${moment(date).format('dddd, DD MMM YYYY')}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0ATerimakasih!`
      return `https://wa.me/+6281313269255?text=${message}`
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
                <p>Pilih Layanan</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, layanan: e})}
                  name="layanan" 
                  {...inputProps[2]} 
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
                {values.layanan === 'Wisuda' && (
                  <>
                    <Field 
                      component={Input} 
                      label="Asal Kampus" 
                      inputProps={inputProps[3]} 
                      name="campus" 
                    />
                    <Field 
                      component={Input} 
                      label="Fakultas / Jurusan" 
                      inputProps={inputProps[4]} 
                      name="faculty" 
                    />
                  </>
                )}
                <Field 
                  component={Input} 
                  label="Akun Instagram" 
                  inputProps={inputProps[5]} 
                  name="ig" 
                />
                <Field 
                  component={Input} 
                  label="Akun Instagram MUA (Opsional)" 
                  inputProps={inputProps[5]} 
                  name="ig-mua" 
                />
                <Field 
                  component={Input} 
                  label="Akun Instagram Attire (Opsional)" 
                  inputProps={inputProps[5]} 
                  name="ig-attire" 
                />
                <Field 
                  className={styles.date}
                  component={Input} 
                  label="Pilih Tanggal Pemotretan" 
                  inputProps={{...inputProps[6], value: values.date}} 
                  name="date" 
                />
                <Field 
                  className={styles.date}
                  component={Input} 
                  label="Pilih Waktu Pemotretan" 
                  inputProps={{...inputProps[7], value: values.time}} 
                  name="time" 
                />
                <Field 
                  component={Input} 
                  label="Nomor Whatsapp yang dapat dihubungi" 
                  inputProps={inputProps[8]} 
                  name="phone" 
                  parse={normalizePhone}
                />
                <Field 
                  component={Input} 
                  label="Lokasi Pemotretan" 
                  inputProps={inputProps[9]} 
                  name="location" 
                />
                <a 
                  className={disabledButton(values) ? styles.disabledSubmit : ''} 
                  onClick={() => handleSubmit(values)} 
                  href={generateLinkWA(values)} 
                  target='_blank'
                  rel="noreferrer"
                >
                  <Button 
                    variant="active-square" 
                    disabled={disabledButton(values)}
                  >
                    Pesan Sekarang
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
