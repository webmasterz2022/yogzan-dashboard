import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import { routes } from './configs/routes';
import Footer from './components/Footer/Footer';
import AppContextProvider from './contexts';
import 'swiper/css/bundle'
import "swiper/css/pagination";
import './App.css';
import Career from './pages/Career';
import Book from './pages/Book';
import FixBook from './pages/FixBook';

function App() {
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
          </Routes>
      </div>
      <Footer />
    </AppContextProvider>
  </BrowserRouter>
  );
}

export default App;
