import { Form, Field } from 'react-final-form'
import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput'
import TextArea from '../TextArea';
import { useSelector } from 'react-redux';

export default function FormDetailPengalaman(props) {
  const { handleSubmitForm, handleStep, data } = props
  const { isLoading } = useSelector(s => s)

  const reqLink2 = new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#-]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/)
  const reqLink = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  const isLink = value => reqLink2.test(value) ? undefined : 'Format Link salah'

  const inputProps = [
    { placeholder: 'Pilih salah satu', options: ['Wisuda', 'Wedding', 'Pre wedding', 'Studio', 'Lainnya'] },
    { placeholder: 'Tulis pengalamanmu disini' },
    { placeholder: 'Tulis seri kamera yang dimiliki disini' },
    { placeholder: 'Tulis seri lensa yang dimiliki disini' },
    { placeholder: 'Tulis aksesoris kamera yang dimiliki disini' },
    { placeholder: 'Pilih Waktu', options: ['Weekdays', 'Weekend', 'Weekdays & Weekend'] },
    {
      placeholder: 'Pilih Expected Fee disini', options: [
        'Dibawah Rp 200.000',
        'Rp 200.000 - Rp 250.000',
        'Rp 250.000 - Rp 300.000',
        'Rp 300.000 - Rp 350.000',
        'Rp 350.000 - Rp 400.000',
        'Rp 450.000 - Rp 500.000',
        'Diatas Rp 500.000',
      ]
    },
    { placeholder: 'Contoh: https://drive.google.com/file/...' },
    { placeholder: 'Contoh: https://drive.google.com/file/...' },
    {
      placeholder: 'Pilih posisi disini', options: [
        'Fotografer',
        'Videografer',
        'Keduanya'
      ]
    },
  ]

  const disabled = (values) => !values.photoshoot || !values.camera || !values.lens ||
    !values.workingHour || !values.fee || !values.cv || !values.portfolio || !values.jobRole;


  const _submit = (val) => {
    handleSubmitForm({ ...val })
  }
  return (
    <Form
      initialValues={data}
      onSubmit={_submit}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <p>Posisi yang dilamar</p>
          <Field
            component={SelectInput}
            name="jobRole"
            onChange={(e) => handleStep({ ...values, jobRole: e })}
            {...inputProps[9]}
          />
          <p>Jenis Pemotretan yang Pernah diambil</p>
          <Field
            component={Input}
            inputProps={{ placeholder: 'Contoh: Wedding, Wisuda, Studio, dll.' }}
            name="photoshoot"
          />
          <Field
            component={TextArea}
            label="Ceritakan Pengalaman Kamu dalam Berkarir di Dunia Fotografi (Jika Ada)"
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
            onChange={(e) => handleStep({ ...values, workingHour: e })}
            {...inputProps[5]}
          />
          {values.jobRole !== "Videografer" && (
            <>
              <p>Expected Fee untuk memotret foto (Photo Only dalam durasi 1 jam)</p>
              <Field
                component={SelectInput}
                onChange={(e) => handleStep({ ...values, fee: e })}
                name="fee"
                {...inputProps[6]}
              />
            </>
          )}
          <Field
            component={Input}
            label="Link CV"
            inputProps={inputProps[7]}
            name="cv"
            validate={isLink}
          />
          <Field
            component={Input}
            label="Link Portfolio"
            inputProps={inputProps[8]}
            name="portfolio"
            validate={isLink}
          />
          <div>
            <Button variant="active-square" handleClick={() => handleStep(values, 'Data Diri')}>Kembali</Button>
            <Button disabled={disabled(values) || isLoading.submitHiring} isLoading={isLoading.submitHiring} variant="active-square" handleClick={() => handleSubmit(values)}>Kirim Lamaran</Button>
          </div>
        </form>
      )}
    />
  )
}
