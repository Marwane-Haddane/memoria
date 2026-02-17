import { useState } from 'react'
import Home from './components/home/Home'
import './App.css'
import About from './components/about/About'
import AddSick from './components/addPatient/AddSick'



function App() {
  return (
   <>
    <Home></Home>
    <About></About>
    <AddSick></AddSick>

    
   </>
  )
}

export default App
