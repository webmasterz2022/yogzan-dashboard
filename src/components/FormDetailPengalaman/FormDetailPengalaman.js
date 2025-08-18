import { Form, Field } from 'react-final-form'
import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput'
import TextArea from '../TextArea';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function FormDetailPengalaman(props) {
  const { handleSubmitForm, handleStep, data } = props;
  const { isLoading } = useSelector(s => s);
  const { t } = useTranslation('formDetailExperience');

  const reqLink3 = new RegExp(/^((ftp|http|https):\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)\w*[#.-]*)*(\/?\w*\??[a-zA-Z0-9_]*=\w*(&[a-zA-Z0-9_]*=\w*)*)?\/?$/);
  const isLink = value => reqLink3.test(value) ? undefined : t('fields.cv.error', 'Format Link salah');

  // Option arrays for selects
  const jobRoleOptions = [
    t('fields.jobRole.options.fotografer', 'Fotografer'),
    t('fields.jobRole.options.videografer', 'Videografer'),
    t('fields.jobRole.options.fotovideo', 'Fotografer & Videografer')
  ];
  const photoshootTypeOptions = [
    t('fields.photoshootType.options.wisuda', 'Wisuda'),
    t('fields.photoshootType.options.wedding', 'Wedding'),
    t('fields.photoshootType.options.prewedding', 'Pre wedding'),
    t('fields.photoshootType.options.studio', 'Studio'),
    t('fields.photoshootType.options.lainnya', 'Lainnya')
  ];
  const workingHourOptions = [
    t('fields.workingHour.options.weekdays', 'Weekdays'),
    t('fields.workingHour.options.weekend', 'Weekend'),
    t('fields.workingHour.options.both', 'Weekdays & Weekend')
  ];

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
        'Fotografer & Videografer'
      ]
    },
  ]

  const disabled = (values) => !values.photoshoot || !values.camera || !values.lens ||
    !values.workingHour || !values.cv || !values.portfolio || !values.jobRole;

  const _submit = (val) => {
    handleSubmitForm({ ...val })
  }
  return (
    <Form
      initialValues={data}
      onSubmit={_submit}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <p>{t('fields.jobRole.label')}</p>
          <Field
            component={SelectInput}
            name="jobRole"
            onChange={(e) => handleStep({ ...values, jobRole: e })}
            options={jobRoleOptions}
            placeholder={t('fields.jobRole.placeholder')}
          />
          <p>{t('fields.photoshoot.label')}</p>
          <Field
            component={Input}
            inputProps={{ placeholder: t('fields.photoshoot.placeholder') }}
            name="photoshoot"
          />
          <Field
            component={TextArea}
            label={t('fields.experience.label')}
            inputProps={{ placeholder: t('fields.experience.placeholder') }}
            name="experience"
          />
          <Field
            component={Input}
            label={t('fields.camera.label')}
            inputProps={{ placeholder: t('fields.camera.placeholder') }}
            name="camera"
            helper={t('fields.camera.description', 'Boleh lebih dari satu')}
          />
          <Field
            component={Input}
            label={t('fields.lens.label')}
            inputProps={{ placeholder: t('fields.lens.placeholder') }}
            name="lens"
            helper={t('fields.lens.description', 'Boleh lebih dari satu')}
          />
          <Field
            component={Input}
            label={t('fields.accessories.label')}
            inputProps={{ placeholder: t('fields.accessories.placeholder') }}
            name="accessories"
            helper={t('fields.accessories.description', 'Boleh lebih dari satu')}
          />
          <p>{t('fields.workingHour.label')}</p>
          <Field
            component={SelectInput}
            name="workingHour"
            onChange={(e) => handleStep({ ...values, workingHour: e })}
            options={workingHourOptions}
            placeholder={t('fields.workingHour.placeholder')}
          />
          <Field
            component={Input}
            label={t('fields.cv.label', 'Link CV')}
            inputProps={{ placeholder: t('fields.cv.placeholder') }}
            name="cv"
            validate={isLink}
          />
          <Field
            component={Input}
            label={t('fields.portfolio.label', 'Link Portfolio')}
            inputProps={{ placeholder: t('fields.portfolio.placeholder') }}
            name="portfolio"
            validate={isLink}
          />
          <div>
            <Button variant="active-square" handleClick={() => handleStep(values, 'Data Diri')}>{t('back', 'Kembali')}</Button>
            <Button disabled={disabled(values) || isLoading.submitHiring} isLoading={isLoading.submitHiring} variant="active-square" handleClick={() => handleSubmit(values)}>{t('submit', 'Kirim Lamaran')}</Button>
          </div>
        </form>
      )}
    />
  )
}
