import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import AddSick from './components/Patient/AddSick';
import Contact from './components/contact/Contact';
import Log from './components/login/log';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Sidebar from './components/Patient/Sidebar';


function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/patient';

  return (
    <>
      {!hideNavbar && <Nav />}
      <Routes>
        <Route path="/" element={<><Home /><About /><Contact /><Footer  /></>} />
        <Route path="/patient" element={<><Sidebar /></>} />
        <Route path="/login" element={<><Log /><Footer /></>} />
      </Routes>
      
    </>
  );
}

export default AppWrapper;