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

export default function Book() {
  moment.locale('id')
  const dispatch = useDispatch()
  const { isLoading } = useSelector(s => s)
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
    "bankName": '',
    "accountHolderName": '',
  })
  const [checked, setChecked] = useState(false)


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
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Family', 'Lainnya'] },
    { placeholder: 'Tulis Asal Kampus' },
    { placeholder: 'Tulis Fakultas / Jurusan' },
    { placeholder: 'Contoh: @yogzan.graduation' },
    { placeholder: 'HH/BB/TTTT', type: 'date' },
    { placeholder: 'JJ/MM', type: 'time', required: true },
    { placeholder: 'Tulis kontak disini' },
    { placeholder: 'Tulis Lokasi Pemotretan' },
    { placeholder: 'Contoh: Bank BCA' },
    { placeholder: 'Contoh: an. Rahmat' },


  ]

  const handleFormSubmit = (values) => {
    const _layanan = values.layanan === 'Lainnya' ? `${values.layanan} - ${values['layanan-extended']}` : values.layanan
    dispatch(submitFixBooking({ ...values, layanan: _layanan }, () => {
      setOpenModal(true)
    }))
  }

  const handleCloseModal = () => {
    window.location.href = '/fixbook'
  }

  const disabledButton = val => {
    if (val.fullname &&
      val.nickname &&
      val.layanan &&
      val.ig &&
      val.date &&
      val.time &&
      val.phone &&
      val.location
    ) {
      if ((val.layanan === 'Lainnya' && !val['layanan-extended']) ||
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
      location, bankName, accountHolderName
    } = values
    console.log(values)
    if (layanan === 'Wisuda') {
      const message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${values.fullname}%0ANama Panggilan: ${values.nickname}%0AUntuk Event: ${layanan}%0AAsal Kampus: ${campus}%0AFakultas/Jurusan: ${faculty}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${moment(date).format('dddd, DD MMM YYYY')}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0ATransfer via Bank: ${bankName}%0ANama pemilik rekening: ${accountHolderName}%0ATerimakasih!`
      return `https://wa.me/+6281313269255?text=${message}`
    } else {
      const _layanan = layanan === 'Lainnya' ? `${layanan} - ${values['layanan-extended']}` : layanan
      const message = `Halo Admin! Berikut form pemesanan yang sudah saya isi:%0ANama Lengkap: ${fullname}%0ANama Panggilan: ${nickname}%0AUntuk Event: ${_layanan}%0AAkun Instagram: ${ig}%0AAkun Instagram MUA: ${values['ig-mua']}%0AAkun Instagram Attire: ${values['ig-attire']}%0ATanggal Pemotretan: ${moment(date).format('dddd, DD MMM YYYY')}%0AWaktu Pemotretan: ${time}%0AKontak: ${values.phone}%0ALokasi Pemotretan: ${location}%0ATransfer via Bank: ${bankName}%0ANama pemilik rekening: ${accountHolderName}%0ATerimakasih!`
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
          <h3>Yeay! Tinggal Selangkah Lagi Pesanan Kamu Selesai!</h3>
          <Form
            initialValues={data}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <p>Pilih Layanan</p>
                <Field
                  component={SelectInput}
                  onChange={(e) => setData({ ...values, layanan: e })}
                  name="layanan"
                  {...inputProps[2]}
                />
                {values.layanan === 'Lainnya' && (
                  <>
                    <Field
                      component={TextArea}
                      label="Tuliskan kebutuhan kamu secara detail"
                      inputProps={{ placeholder: 'Tulis kebutuhanmu disini' }}
                      name="layanan-extended"
                    />
                  </>
                )}
                <Field
                  component={Input}
                  label={values.layanan !== 'Wisuda' ? "Nama Lengkap" : 'Nama Lengkap dan Gelar'}
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
                  component={TextArea}
                  label="Alamat Pengiriman (Khusus untuk yang memilih paket dengan cetak Foto / Album)"
                  inputProps={{ placeholder: "Tulis alamat lengkap" }}
                  name="address"
                  helper={'Mohon isi dengan format "Nama Penerima - No Hp Penerima - Alamat Lengkap - Kecamatan - Kota/Kabupaten - Kode Pos"'}
                />
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
                  inputProps={{ ...inputProps[5], placeholder: 'Contoh: @yogzan.graduation, @yogzan.fotosinema' }}
                  name="ig"
                  helper="Untuk foto grup, mohon untuk ditulis akun seluruh anggota (gunakan koma untuk memisahkan)"
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
                  inputProps={{ ...inputProps[6], value: values.date }}
                  name="date"
                />
                <Field
                  className={styles.date}
                  component={Input}
                  label="Pilih Waktu Pemotretan"
                  inputProps={{ ...inputProps[7], value: values.time }}
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
                <Field
                  component={Input}
                  label="Transfer via Bank"
                  inputProps={inputProps[10]}
                  name="bankName"
                />
                <Field
                  component={Input}
                  label="Nama Pemilik Rekening"
                  inputProps={inputProps[11]}
                  name="accountHolderName"
                />
                <div className={styles.checkbox} onClick={() => setChecked(v => !v)}>
                  {checked ? (
                    <img src={icChecked} />
                  ) : (
                    <img src={icUnchecked} />
                  )}
                  <p style={{ textAlign: "left" }}>
                    Saya sudah membaca dan setuju dengan{" "}
                    <a
                      href="https://www.yogzan.com/price-list/wisuda/Terms_of_Service"
                      style={{ color: "#512B58", fontWeight: 700 }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a> {" "}
                    yogzan
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
                    Selesaikan Pesanan
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
