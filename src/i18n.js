import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import id from './locales/id.json';
import homeEn from './locales/home.en.json';
import homeId from './locales/home.id.json';
import navbarEn from './locales/navbar.en.json';
import navbarId from './locales/navbar.id.json';
import footerEn from './locales/footer.en.json';
import footerId from './locales/footer.id.json';
import careerEn from './locales/career.en.json';
import careerId from './locales/career.id.json';
import formEn from './locales/form.en.json';
import formId from './locales/form.id.json';
import formDetailExperienceEn from './locales/en/formDetailPengalaman.json';
import formDetailExperienceId from './locales/id/formDetailPengalaman.json';
import bookEn from './locales/en/book.json';
import bookId from './locales/id/book.json';
import fixbookEn from './locales/en/fixbook.json';
import fixbookId from './locales/id/fixbook.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
                home: homeEn,
                navbar: navbarEn,
                footer: footerEn,
                career: careerEn,
                form: formEn,
                formDetailExperience: formDetailExperienceEn,
                book: bookEn,
                fixbook: fixbookEn
            },
            id: {
                translation: id,
                home: homeId,
                navbar: navbarId,
                footer: footerId,
                career: careerId,
                form: formId,
                formDetailExperience: formDetailExperienceId,
                book: bookId,
                fixbook: fixbookId
            },
        },
        lng: 'id', // default language
        fallbackLng: 'id',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
