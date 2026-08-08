'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../../../_cra-pages/Gallery/styles.module.css';
import ButtonFilter from '../../../components/ButtonFIlter';
import { useRouter, usePathname } from '../../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import SelectInput from '../../../components/SelectInput';
import Modal from '../../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, getGalleryCategories, getPortfolioImages } from '../../../store/action';
import Button from '../../../components/Button';
import { routes } from '../../../configs/routes';

const pinLocation = '/assets/pin-location.svg';
const iconImage = '/assets/icon-image.svg';
const arrowLight = '/assets/arrow-light.svg';
const arrowDark = '/assets/arrow-dark.svg';
const arrowLeft = '/assets/arrow-left.svg';
const arrowRight = '/assets/arrow-right.svg';
const xCircle = '/assets/x-circle.svg';
const check = '/assets/check.svg';

export default function GalleryClient() {
  const t = useTranslations('translation');
  const router = useRouter();
  const dispatch = useDispatch();
  const { cities, portfolioImages, categories } = useSelector((v: any) => v);
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<any>({ open: false });
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const type = searchParams.get('type');
  const currentCategory = categories.find((e: any) => e.name === type);

  const setSearchParams = (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    router.push(`/gallery?${qs}` as any);
  };

  useEffect(() => {
    setSelectedCity(searchParams.get('city') || '');
    dispatch(getCities(type !== 'Semua' ? type : '') as any);
  }, [type]);

  useEffect(() => {
    const cityParam = (selectedCity || '').replace('Semua Lokasi', '');
    dispatch(getPortfolioImages(type, cityParam) as any);
  }, [type, selectedCity]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGalleryCategories() as any);
    if (!type) {
      setSearchParams({ type: 'Semua' });
    }
  }, []);

  const _previewImage = (image: any) => {
    const { name, url, description, city, category, vertical, index } = image;
    setSelectedImage({
      open: true,
      path: url,
      description,
      city,
      category,
      name,
      index,
      orientation: vertical ? 'vertical' : 'horizontal',
    });
  };

  const _renderGallery = () => {
    const { images } = portfolioImages;
    let column = 0;
    const dataPerColumn = Math.ceil(images.length / 4);
    const dataRow: Record<string, any[]> = { '0': [], '1': [], '2': [], '3': [] };
    while (column < 4) {
      dataRow[column] = images.slice(column * dataPerColumn, (column + 1) * dataPerColumn);
      column++;
    }
    return (
      <>
        {Object.keys(dataRow).map((_column, idx) => (
          <div key={idx}>
            {dataRow[_column].map((image: any, i: number) => (
              <div className={styles[image.vertical ? 'vertical' : 'horizontal']} key={i}>
                <div onClick={() => _previewImage(image)} style={{ backgroundImage: `url(${image.url})` }} />
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.root}>
      <h3>{t('gallery.mainTitle')}</h3>
      <h5>{t('gallery.mainSubtitle')}</h5>
      <div className={styles.filters}>
        <div className={styles.groupButton}>
          <ButtonFilter handleClick={() => setSearchParams({ type: 'Semua' })} variant={type === 'Semua' ? 'active' : ''}>
            {type === 'Semua' ? (
              <div className={styles.activeButton}>
                <img className={styles.iconButton} src={check} alt="v" />
                {t('gallery.all')}
              </div>
            ) : (
              <>{t('gallery.all')}</>
            )}
          </ButtonFilter>
          {categories.map(({ name }: any) => (
            <ButtonFilter
              handleClick={() => setSearchParams({ type: name })}
              key={name}
              variant={type === name ? 'active' : ''}
            >
              {type === name ? (
                <div className={styles.activeButton}>
                  <img className={styles.iconButton} src={check} alt="v" />
                  {t(`gallery.category.${name}.label` as any) || name}
                </div>
              ) : (
                <>{t(`gallery.category.${name}.label` as any) || name}</>
              )}
            </ButtonFilter>
          ))}
        </div>
        <div>
          <SelectInput
            placeholder={t('gallery.selectLocation')}
            options={[t('gallery.allLocations'), ...cities]}
            onChange={setSelectedCity}
            value={selectedCity}
          />
        </div>
      </div>
      {type && type !== 'Semua' && t(`gallery.category.${type}.title` as any) && (
        <div className={styles.categoryDescription}>
          <div>
            <h3>{t(`gallery.category.${type}.title` as any)}</h3>
            <h5>{t(`gallery.category.${type}.text` as any)}</h5>
          </div>
          <Button variant="active-square" handleClick={() => router.push(routes.BOOK())}>
            {t('gallery.getPriceList')}
            <img src={arrowLight} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.galleries}>
        {portfolioImages.images.length > 0 && _renderGallery()}
      </div>
      <div className={styles.redirect}>
        {currentCategory?.redirectLink && (
          <Button handleClick={() => window.open(currentCategory.redirectLink, '_blank')}>
            {t('gallery.seeMore')}
            <img src={arrowDark} alt="" />
          </Button>
        )}
      </div>
      {selectedImage.open && (
        <Modal
          className={[styles.preview, styles[selectedImage.orientation]].join(' ')}
          open={selectedImage.open}
          onClose={() => setSelectedImage({ open: false })}
        >
          <img src={selectedImage.path} alt="preview" />
          <div>
            <h4>{selectedImage.name}</h4>
            <p>{selectedImage.description}</p>
            <div>
              {selectedImage.city && (
                <div>
                  <img src={pinLocation} alt="city" />
                  <p>{selectedImage.city}</p>
                </div>
              )}
              <div>
                <img src={iconImage} alt="category" />
                <p>{t(`gallery.category.${selectedImage.category}.label` as any, { defaultValue: selectedImage.category })}</p>
              </div>
            </div>
          </div>
          <div className={styles.modalNav}>
            {selectedImage.index - 1 >= 0 ? (
              <img alt="back" src={arrowLeft} onClick={() => _previewImage(portfolioImages.images[selectedImage.index - 1])} />
            ) : (
              <img alt="" />
            )}
            <img alt="close" src={xCircle} onClick={() => setSelectedImage({ open: false })} />
            {selectedImage.index + 1 < portfolioImages.images.length ? (
              <img alt="next" src={arrowRight} onClick={() => _previewImage(portfolioImages.images[selectedImage.index + 1])} />
            ) : (
              <img alt="" />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
