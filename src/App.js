import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import { routes } from './configs/routes';
import Footer from './components/Footer/Footer';
import AppContextProvider from './contexts';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css';
import Career from './pages/Career';
import Book from './pages/Book';
import FixBook from './pages/FixBook/FixBook';
import Result from './pages/Result';
import PriceList from './pages/PriceList';
import LogRocket from 'logrocket'
import ReactGA from 'react-ga4'
import { Select } from 'antd';
import { useState, useLayoutEffect } from 'react';
import chevron from './assets/chevron.svg';

function LanguageRouterWrapper() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist language selection in localStorage
  const hasSetInitialLang = useRef(false);
  useEffect(() => {
    if (!hasSetInitialLang.current) {
      const storedLang = localStorage.getItem('yogzan-lang');
      if (storedLang) {
        i18n.changeLanguage(storedLang);
        if (storedLang === 'en' && !location?.pathname.startsWith('/en')) {
          window.location.pathname = '/en' + location?.pathname;
        } else if (storedLang === 'id' && location?.pathname.startsWith('/en')) {
          window.location.pathname = location?.pathname.replace('/en', '') || '/';
        }
      } else {
        const isEnglish = location?.pathname.startsWith('/en');
        if (isEnglish) {
          i18n.changeLanguage('en');
          localStorage.setItem('yogzan-lang', 'en');
        } else if (location?.pathname === '/' || location?.pathname === '') {
          // Only set on root path to avoid interfering with navigation
          const deviceLang = navigator.language || navigator.userLanguage;
          if (deviceLang && !deviceLang.startsWith('id')) {
            i18n.changeLanguage('en');
            localStorage.setItem('yogzan-lang', 'en');
            if (!location?.pathname.startsWith('/en')) {
              window.location.pathname = '/en';
            }
          } else {
            i18n.changeLanguage('id');
            localStorage.setItem('yogzan-lang', 'id');
          }
        } else {
          i18n.changeLanguage('id');
          localStorage.setItem('yogzan-lang', 'id');
        }
      }
      hasSetInitialLang.current = true;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AppContextProvider>
      {isMobile && (
        <div style={{ position: 'absolute', top: 15, right: 15, zIndex: 9999 }}>
          <Select
            suffixIcon={<img src={chevron} alt="chevron" />}
            className={'languageSwitch'}
            value={i18n.language}
            size="large"
            onChange={(newLang) => {
              i18n.changeLanguage(newLang);
              localStorage.setItem('yogzan-lang', newLang);
              if (window.location.pathname.startsWith('/en') && newLang === 'id') {
                window.location.pathname = window.location.pathname.replace('/en', '') || '/';
              } else if (!window.location.pathname.startsWith('/en') && newLang === 'en') {
                window.location.pathname = '/en' + window.location.pathname;
              }
            }}
            options={[
              { value: 'id', label: <span>🇮🇩 ID</span> },
              { value: 'en', label: <span>🇺🇸 EN</span> }
            ]}
          />
        </div>
      )}
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/en" exact element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/en/gallery" element={<Gallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/en/career" element={<Career />} />
          <Route path="/book" element={<Book />} />
          <Route path="/en/book" element={<Book />} />
          <Route path="/fixbook" element={<FixBook />} />
          <Route path="/en/fixbook" element={<FixBook />} />
          <Route path="/result/:path" element={<Result />} />
          <Route path="/en/result/:path" element={<Result />} />
          <Route path="/price-list/:categoryName/:city" element={<PriceList />} />
          <Route path="/en/price-list/:categoryName/:city" element={<PriceList />} />
        </Routes>
      </div>
      <Footer />
    </AppContextProvider>
  );
}

function App() {
  LogRocket.init('dcepbi/yogzan-dashboard');
  ReactGA.initialize('G-4Y9RTECPZ0')
  return (
    <BrowserRouter>
      <LanguageRouterWrapper />
    </BrowserRouter>
  );
}

export default App;
