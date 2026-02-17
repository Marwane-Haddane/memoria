import { useState } from 'react'
import Home from './components/home/Home'
import './App.css'
import About from './components/about/About'
import AddSick from './components/addPatient/AddSick'
import Contact from './components/contact/Contact'


function App() {
  return (
   <>
    <Home></Home>
    <About></About>
    <Contact></Contact>
    <AddSick></AddSick>

    
   </>
  )
}

export default App
