import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import { routes } from './configs/routes';
import Footer from './components/Footer/Footer';
import AppContextProvider from './contexts';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css';
import Career from './pages/Career';
import Book from './pages/Book';
import FixBook from './pages/FixBook/FixBook';
import Result from './pages/Result';
import PriceList from './pages/PriceList';
import LogRocket from 'logrocket'

function App() {
  // LogRocket.init('dcepbi/yogzan-dashboard');
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path={routes.HOMEPAGE()} exact element={<Home />} />
            <Route path={routes.GALLERY()} element={<Gallery />} />
            <Route path={routes.CAREER()} element={<Career />} />
            <Route path={routes.BOOK()} element={<Book />} />
            <Route path={routes.FIXBOOK()} element={<FixBook />} />
            <Route path={routes.RESULT()} element={<Result />} />
            <Route path={routes.PRICE_LIST()} element={<PriceList />} />
          </Routes>
        </div>
        <Footer />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
