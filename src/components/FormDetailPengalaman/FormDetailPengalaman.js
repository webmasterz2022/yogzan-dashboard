import { Form, Field } from 'react-final-form'
import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput'
import TextArea from '../TextArea';

export default function FormDetailPengalaman(props) {
  const { handleSubmitForm, handleStep, data } = props

  const inputProps = [
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Studio', 'Lainnya'] },
    { placeholder: 'Tulis pengalamanmu disini' },
    { placeholder: 'Tulis seri kamera yang dimiliki disini' },
    { placeholder: 'Tulis seri lensa yang dimiliki disini' },
    { placeholder: 'Tulis aksesoris kamera yang dimiliki disini' },
    { placeholder: 'Pilih Waktu', options: ['Weekdays', 'Weekend', 'Weekdays & Weekend'] },
    { placeholder: 'Pilih Expected Fee disini', options: [
      'Dibawah Rp 200.000',
      'Rp 200.000 - Rp 250.000',
      'Rp 250.000 - Rp 300.000',
      'Rp 300.000 - Rp 350.000',
      'Rp 350.000 - Rp 400.000',
      'Rp 450.000 - Rp 500.000',
      'Diatas Rp 500.000',
    ] },
    { placeholder: 'Link CV' },
    { placeholder: 'Link Portfolio' },
  ]

  const disabled = (values) => !values.photoshoot || !values.experience || !values.camera || !values.lens ||
    !values.workingHour || !values.fee || !values.cv || !values.portfolio || (values.photoshoot === "Lainnya" && !values['photoshoot-extended'])


  const _submit = (val) => {
    const _photoshoot = val.photoshoot === 'Lainnya' ? `${val.photoshoot} - ${val['photoshoot-extended']}` : val.photoshoot
    handleSubmitForm({...val, photoshoot: _photoshoot})
  }
  return (
    <Form 
      initialValues={data}
      onSubmit={_submit}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <p>Jenis Pemotretan yang Pernah diambil</p>
          <Field 
            component={SelectInput} 
            name="photoshoot" 
            onChange={(e) => handleStep({...values, photoshoot: e})}
            {...inputProps[0]} 
          />
          {values.photoshoot === 'Lainnya' && (
            <Field 
              className={styles.photoshootExtended}
              component={Input} 
              inputProps={{placeholder: 'Tulis jenis pemotretan lainnya'}} 
              name="photoshoot-extended" 
            />
          )}
          <Field 
            component={TextArea} 
            label="Ceritakan Pengalaman Memotret Kamu" 
            inputProps={inputProps[1]} 
            name="experience" 
          />
          <Field 
            component={Input} 
            label="Seri Kamera yang Dimiliki" 
            inputProps={inputProps[2]} 
            name="camera"
            helper="Boleh lebih dari satu"
          />
          <Field 
            component={Input} 
            label="Seri Lensa yang Dimiliki" 
            inputProps={inputProps[3]} 
            name="lens" 
            helper="Boleh lebih dari satu"
          />
          <Field 
            component={Input} 
            label="Apakah memiliki aksesoris kamera lain? (opsional)" 
            inputProps={inputProps[4]} 
            name="accessories" 
            helper="Boleh lebih dari satu"
          />
          <p>Pilih alokasi waktu untuk project Yogzan</p>
          <Field 
            component={SelectInput} 
            name="workingHour" 
            onChange={(e) => handleStep({...values, workingHour: e})}
            {...inputProps[5]} 
          />
          <p>Expected Fee untuk memotret foto</p>
          <Field 
            component={SelectInput} 
            onChange={(e) => handleStep({...values, fee: e})}
            name="fee" 
            helper={() => <span>Photo Only dalam <b>durasi 1 jam</b></span>}
            {...inputProps[6]}
            />
          <Field 
            component={Input} 
            label="Link CV" 
            inputProps={inputProps[7]} 
            name="cv" 
            helper="misal: link dokumen google drive"
          />
          <Field 
            component={Input} 
            label="Link Portfolio" 
            inputProps={inputProps[8]} 
            name="portfolio" 
            helper="misal: link dokumen google drive"
          />
          <div>
            <Button variant="active-square" handleClick={() => handleStep(values, 'Data Diri')}>Kembali</Button>
            <Button disabled={disabled(values)} variant="active-square" handleClick={() => handleSubmit(values)}>Kirim Lamaran</Button>
          </div>
        </form>
      )}
    />
  )
}
