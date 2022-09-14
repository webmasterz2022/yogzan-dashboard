import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import { routes } from './configs/routes';
import Footer from './components/Footer/Footer';
import AppContextProvider from './contexts';

function App() {
  return (
  <BrowserRouter>
    <AppContextProvider>
      <Navbar />
      <div className='App'>
          <Routes>
            <Route path={routes.HOMEPAGE()} exact element={<Home />} />
            <Route path={routes.GALLERY()} element={<Gallery />} />
          </Routes>
      </div>
      <Footer />
    </AppContextProvider>
  </BrowserRouter>
  );
}

export default App;
