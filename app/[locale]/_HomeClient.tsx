'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../../_cra-pages/Home/styles.module.css';
import Button from '../../components/Button';
import CategoryCard from '../../components/CategoryCard';
import CardChooseUs from '../../components/CardChooseUs';
import CardTestimony from '../../components/CardTestimony';
import {
  getAllTestimonies,
  getHomepageCategories,
  getHomepageImages,
} from '../../store/action';
import { useSelector, useDispatch } from 'react-redux';
import { getDeviceType, shuffle } from '../../utils';
import { useRouter } from '../../i18n/navigation';
import { chooseUs } from '../../_cra-pages/Home/dataMock';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { routes } from '../../configs/routes';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const logo = '/assets/logo-dark.svg';
const blank = '/assets/blank.png';
const arrowLight = '/assets/arrow-light.svg';

export default function HomeClient() {
  const testimonyRef = useRef<HTMLDivElement>(null);
  const overlayRightRef = useRef<HTMLDivElement>(null);
  const overlayLeftRef = useRef<HTMLDivElement>(null);
  const device = getDeviceType();
  const lengthTestimony: Record<string, number> = { desktop: 2.8, tablet: 2, mobile: 1 };
  const router = useRouter();
  const dispatch = useDispatch();
  const { homepageImages, categories, testimonies } = useSelector((s: any) => s);
  const [images, setImages] = useState<any[]>([]);
  const t = useTranslations('home');

  useEffect(() => {
    if (testimonies && testimonies.length > 0 && testimonyRef.current) {
      const parentHeight = testimonyRef.current.clientHeight;
      if (overlayLeftRef.current && overlayRightRef.current) {
        overlayLeftRef.current.style.height = `${parentHeight}px`;
        overlayRightRef.current.style.height = `${parentHeight}px`;
      }
    }
  }, [testimonies]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (homepageImages.length === 0) {
      dispatch(getHomepageImages() as any);
    }
    dispatch(getHomepageCategories() as any);
    dispatch(getAllTestimonies() as any);
  }, []);

  useEffect(() => {
    if (homepageImages.length && images.length === 0) {
      const shuffled = shuffle([...homepageImages]);
      setImages(shuffled.slice(0, 11));
    }
  }, [homepageImages]);

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <img src={logo} alt="yogzan" />
        <h3 className={styles.heading1}>{t('header.mainTitle')}</h3>
        <h4 className={styles.heading2}>{t('header.subtitle')}</h4>
      </div>
      <div className={styles.galleries}>
        <div className={styles.overlay} />
        <div>
          {images.length > 0 && (
            <>
              <div className={styles.satu}><div style={{ backgroundImage: `url(${images[0]?.url || blank})` }} /></div>
              <div className={styles.dua}><div style={{ backgroundImage: `url(${images[1]?.url || blank})` }} /></div>
              <div className={styles.tiga}><div style={{ backgroundImage: `url(${images[2]?.url || blank})` }} /></div>
              <div className={styles.empat}><div style={{ backgroundImage: `url(${images[3]?.url || blank})` }} /></div>
              <div className={styles.lima}><div style={{ backgroundImage: `url(${images[4]?.url || blank})` }} /></div>
              <div className={styles.enam}><div style={{ backgroundImage: `url(${images[5]?.url || blank})` }} /></div>
              <div className={styles.tujuh}><div style={{ backgroundImage: `url(${images[6]?.url || blank})` }} /></div>
              <Button variant="active-square" handleClick={() => router.push(routes.BOOK())}>
                {t('getPriceList')}
                <img src={arrowLight} alt="" />
              </Button>
              <div className={styles.delapan}><div style={{ backgroundImage: `url(${images[7]?.url || blank})` }} /></div>
              <div className={styles.sembilan}><div style={{ backgroundImage: `url(${images[8]?.url || blank})` }} /></div>
              <div className={styles.sepuluh}><div style={{ backgroundImage: `url(${images[9]?.url || blank})` }} /></div>
              <div className={styles.sebelas}><div style={{ backgroundImage: `url(${images[10]?.url || blank})` }} /></div>
            </>
          )}
        </div>
        <div>
          <h3>{t('gallery.label')}</h3>
          {t('gallery.description') && <p>{`"${t('gallery.description')}"`}</p>}
          <div>
            {categories?.map((category: any) => (
              <CategoryCard
                key={category.name}
                {...category}
                title={t(`category.${category.name}.label` as any, { defaultValue: category.name })}
                handleClick={() => router.push(`/gallery?type=${category.name}`)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.contentWhyUs}>
        <h3>{t('whyUs.title')}</h3>
        <p>{t('whyUs.desc')}</p>
        <div>
          {chooseUs?.map((why: any, idx: number) => (
            <CardChooseUs
              key={idx}
              {...why}
              title={t(`chooseUs.${idx}.title` as any)}
              desc={t(`chooseUs.${idx}.desc` as any)}
            />
          ))}
        </div>
      </div>
      <div className={styles.testimonials} ref={testimonyRef}>
        <h3>{t('testimonials.title')}</h3>
        <p>{t('testimonials.desc')}</p>
        <div>
          <Swiper
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Autoplay, Pagination]}
            spaceBetween={2}
            slidesPerView={lengthTestimony[device]}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            {testimonies?.map((data: any) => (
              <SwiperSlide key={data.username}>
                <CardTestimony image={data.image} desc={data.desc} name={`@${data.name}`} link={data.link} />
              </SwiperSlide>
            ))}
          </Swiper>
          {testimonies?.length > 0 && <div className={styles.overlayLeft} ref={overlayLeftRef} />}
          {testimonies?.length > 0 && <div className={styles.overlayRight} ref={overlayRightRef} />}
        </div>
      </div>
    </section>
  );
}
