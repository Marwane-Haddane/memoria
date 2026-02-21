import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react'
import Home from './components/home/Home'
import './App.css'
import About from './components/about/About'
import AddSick from './components/addPatient/AddSick'
import Contact from './components/contact/Contact'
import Log from './components/login/log'
import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'

function App() {
  return (
   <>
   <BrowserRouter>
    <Nav></Nav>
   <Routes>
        <Route path="/" element={<><Home /><About/><Contact/></>} />
        <Route path="/patient" element={<AddSick />} />
        {/*  when we will add the login i will add this link  */}
        <Route path="/login" element={<Log />} />
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
   </>
  )
}

export default App
