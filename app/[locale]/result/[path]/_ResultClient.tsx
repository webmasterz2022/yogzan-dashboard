'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStoredPhotos } from '../../../../store/action';
import Button from '../../../../components/Button';
import styles from '../../../../_cra-pages/Result/styles.module.css';

export default function ResultClient({ path }: { path: string }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  const getLink = (p: string) => p.includes('http') ? p : `http://${p}`;

  useEffect(() => {
    dispatch(getStoredPhotos(path, (p: string | null) => {
      if (p) {
        setLink(p);
        setIsEmpty(false);
        setTimeout(() => { window.location.href = getLink(p); }, 1000);
      } else {
        setIsEmpty(true);
      }
    }) as any);
  }, [path]);

  return (
    <div className={styles.root}>
      <h3>{isEmpty ? 'sorry, you have no photos' : 'checking your photos...'}</h3>
      {link && <Button onClick={() => { window.location.href = getLink(link); }}>click here if you are not redirected</Button>}
    </div>
  );
}
