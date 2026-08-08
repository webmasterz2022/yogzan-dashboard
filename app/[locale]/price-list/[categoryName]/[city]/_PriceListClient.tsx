'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../../../store/action';
import styles from '../../../../../_cra-pages/PriceList/styles.module.css';

export default function PriceListClient({ categoryName, city }: { categoryName: string; city: string }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((s: any) => s);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    dispatch(getAllCategories() as any);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      try {
        const height = iframeRef.current.contentWindow?.document.body.scrollHeight;
        if (height) iframeRef.current.style.height = `${height}px`;
      } catch {}
    }
  }, [iframeRef]);

  const currentCategory = categories.find((e: any) => e.name?.toLowerCase() === categoryName?.toLowerCase());
  const currentPriceList = currentCategory?.cities?.find((e: any) => e.name?.toLowerCase() === city?.toLowerCase());

  return (
    <div className={styles.root}>
      <h2>Daftar Harga</h2>
      <h3>{categoryName} - {city}</h3>
      <br />
      {currentPriceList?.file && (
        <iframe
          ref={iframeRef}
          width="100%"
          title={`${categoryName} - ${city}`}
          src={currentPriceList.file.replace('/view?usp=sharing', '/preview')}
        />
      )}
    </div>
  );
}
