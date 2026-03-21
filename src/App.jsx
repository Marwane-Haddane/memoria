import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import AddSick from './components/Patient/dashboard/AddSick';
import Contact from './components/contact/Contact';
import Log from './components/login/log';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Sidebar from './components/Patient/Sidebar';
import Dashboard from './components/Patient/dashboard/Pdashboard';
import Info from './components/Patient/dashboard/info';
import PatientConv from './components/Patient/dashboard/PatientConv';


function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<><Nav /><Home /><About /><Contact /><Footer /></>} />
        <Route path="/login" element={<><Log /><Footer /></>} />

        {/* Patient Dashboard Routes with Sidebar Layout */}
        <Route element={<Sidebar />}>
          <Route path="/patient" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/add-patient" element={<AddSick />} />
          <Route path="/patient-conv" element={<PatientConv />} />
        </Route>
      </Routes>

    </>
  );
}

export default AppWrapper;