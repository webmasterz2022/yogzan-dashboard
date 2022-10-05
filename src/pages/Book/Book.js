import React, { useEffect, useState } from 'react'
import { Form, Field } from 'react-final-form'
import styles from './styles.module.css'
import coverBooking from '../../assets/cover-booking.png'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { submitBooking } from '../../store/action'
import { useDispatch } from 'react-redux'

export default function Book() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
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

  const inputProps = [
    { placeholder: 'Tulis Nama Pemesan' },
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Family', 'Lainnya'] },
    { placeholder: 'Pilih salah satu', options: ['Bandung', 'Jabodetabek', 'Malang', 'Surabaya', 'Semarang', 'Yogyakarta', 'Kota Lainnya'] },
    { placeholder: 'HH/BB/TTTT', type: 'date' },
    { placeholder: 'Tulis kontak disini', type: 'number' },
    { placeholder: 'Pilih salah satu', options: ['Instagram', 'Facebook', 'Tiktok', 'Iklan', 'Rekomendasi Teman', 'Google', 'Lainnya'] },
  ]

  const handleFormSubmit = (values) => {
    dispatch(submitBooking(values, () => {
      console.log('callback triggered')
      setOpenModal(true)
    }))
    const message = `Halo Admin! Saya ingin Booking.%0ANama: ${values.name}%0AUntuk Event: ${values.layanan}%0ATanggal/Bulan: ${values.date}%0AKota: ${values.city}%0AKontak: ${values.phone}%0ATerimakasih!`
    window.open(`https://wa.me/+6281313269255?text=${message}`, 
    '_blank')
  }

  const handleCloseModal = () => {    
    window.location.href = '/book'
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
                <p>Pilih Kota</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, city: e})}
                  name="city" 
                  {...inputProps[2]} 
                />
                <Field 
                  component={Input} 
                  label="Pilih Tanggal Pemotretan" 
                  inputProps={inputProps[3]} 
                  name="date" 
                />
                <Field 
                  component={Input} 
                  label="Nomor Whatsapp yang dapat dihubungi" 
                  inputProps={inputProps[4]} 
                  name="phone" 
                />
                <p>Dari mana Anda mengetahui Yogzan?</p>
                <Field 
                  component={SelectInput}
                  onChange={(e) => setData({...values, knowFrom: e})}
                  name="knowFrom" 
                  {...inputProps[5]} 
                />
                <Button 
                  variant="active-square" 
                  disabled={Object.values(values).includes('') || Object.keys(values).length !== 6}
                  type="submit"
                >
                  Buat Pesanan
                </Button>
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
