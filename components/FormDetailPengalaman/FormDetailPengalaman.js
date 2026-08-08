'use client';
import { Form, Field } from 'react-final-form'
import React from 'react'
import Input from '../Input'
import styles from './styles.module.css'
import Button from '../Button';
import SelectInput from '../SelectInput'
import TextArea from '../TextArea';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

export default function FormDetailPengalaman(props) {
  const { handleSubmitForm, handleStep, data } = props;
  const { isLoading } = useSelector(s => s);
  const t = useTranslations('formDetailExperience');

  const reqLink3 = /^((ftp|http|https):\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)\w*[#.-]*)*(\/?\w*\??[a-zA-Z0-9_]*=\w*(&[a-zA-Z0-9_]*=\w*)*)?\/?$/;
  const isLink2 = value => { try { new URL(value); return undefined; } catch { return 'Format Link tidak valid'; } };

  const jobRoleOptions = ['Fotografer', 'Videografer', 'Fotografer & Videografer'];
  const workingHourOptions = ['Weekdays', 'Weekend', 'Weekdays & Weekend'];
  const feeOptions = ['Dibawah Rp 200.000', 'Rp 200.000 - Rp 250.000', 'Rp 250.000 - Rp 300.000', 'Rp 300.000 - Rp 350.000', 'Rp 350.000 - Rp 400.000', 'Rp 450.000 - Rp 500.000', 'Diatas Rp 500.000'];

  const disabled = (values) => !values.photoshoot || !values.camera || !values.lens || !values.workingHour || !values.cv || !values.portfolio || !values.jobRole;

  return (
    <Form
      initialValues={data}
      onSubmit={(val) => handleSubmitForm({ ...val })}
      render={({ handleSubmit, values }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <p>{t('fields.jobRole.label')}</p>
          <Field component={SelectInput} name="jobRole" onChange={(e) => handleStep({ ...values, jobRole: e })} options={jobRoleOptions} placeholder={t('fields.jobRole.placeholder')} />
          <p>{t('fields.photoshoot.label')}</p>
          <Field component={Input} inputProps={{ placeholder: t('fields.photoshoot.placeholder') }} name="photoshoot" />
          <Field component={TextArea} label={t('fields.experience.label')} inputProps={{ placeholder: t('fields.experience.placeholder') }} name="experience" />
          <Field component={Input} label={t('fields.camera.label')} inputProps={{ placeholder: t('fields.camera.placeholder') }} name="camera" helper={t('fields.camera.description')} />
          <Field component={Input} label={t('fields.lens.label')} inputProps={{ placeholder: t('fields.lens.placeholder') }} name="lens" helper={t('fields.lens.description')} />
          <Field component={Input} label={t('fields.accessories.label')} inputProps={{ placeholder: t('fields.accessories.placeholder') }} name="accessories" helper={t('fields.accessories.description')} />
          <p>{t('fields.workingHour.label')}</p>
          <Field component={SelectInput} name="workingHour" onChange={(e) => handleStep({ ...values, workingHour: e })} options={workingHourOptions} placeholder={t('fields.workingHour.placeholder')} />
          <Field component={Input} label={t('fields.cv.label')} inputProps={{ placeholder: t('fields.cv.placeholder') }} name="cv" validate={isLink2} />
          <Field component={Input} label={t('fields.portfolio.label')} inputProps={{ placeholder: t('fields.portfolio.placeholder') }} name="portfolio" validate={isLink2} />
          <div>
            <Button variant="active-square" handleClick={() => handleStep(values, 'Data Diri')}>{t('back')}</Button>
            <Button disabled={disabled(values) || isLoading.submitHiring} isLoading={isLoading.submitHiring} variant="active-square" handleClick={() => handleSubmit(values)}>{t('submit')}</Button>
          </div>
        </form>
      )}
    />
  )
}
