import React from 'react'
import styles from './styles.module.css'
import CardChooseUs from '../../components/CardChooseUs'
import { careerChooseUs } from './dataMock'
import satu from '../../assets/satu.svg'
import dua from '../../assets/dua.svg'
import tiga from '../../assets/tiga.svg'
import coverCareer from '../../assets/coverCareer.png'

export default function Career() {
  return (
    <section className={styles.root}>
      <h3>Hasilkan ‘Cuan’ Tambahan dari Hobi Kamu!</h3>
      <p>Kamu fotografer dan mau dapat penghasilan tambahan dari hobi motret kamu? Yuk gabung dengan Yogzan!</p>
      <div className={styles.why}>
        <h3>Kenapa Harus Yogzan?</h3>
        <div>
          {careerChooseUs.map(why => (
            <CardChooseUs {...why} />
          ))}
        </div>
      </div>
      <div className={styles.workflow}>
        <div className={styles.title}>
          <h2>Bagaimana cara kerjanya?</h2>
          <p>Daftarkan diri kamu untuk menjadi kolaborator Yogzan melalui form yang disediakan.</p>
        </div>
        <div className={styles.cards}>
          <div>
            <h4>Terima Tugas</h4>
            <p>Tim kami akan menghubungi kamu terkait informasi detail mengenai proyek yang akan kamu laksanakan.</p>
            <img src={satu} alt="1"/>
          </div>
          <div>
            <h4>Foto dan Kirim</h4>
            <p>Setelah melakukan sesi foto atau video, kirim semua hasilnya ke Yogzan melalui akses cloud storage milik Yogzan.</p>
            <img src={dua} alt="2"/>
          </div>
          <div>
            <h4>Terima Komisi</h4>
            <p>Setelah foto kami terima, silakan tunggu untuk mendapatkan komisi kamu dalam waktu 1 hingga 2 hari.</p>
            <img src={tiga} alt="3"/>
          </div>
        </div>
      </div>
      <div className={styles.cover}>
        <img src={coverCareer} />
      </div>
    </section>
  )
}
