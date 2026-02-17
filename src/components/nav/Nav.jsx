import React, { useState } from 'react'
import logo from '../../assets/logo.png' 
import './nav.css'


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='fixed top-0 left-0 w-full h-20 flex items-center justify-between md:px-16 lg:px-24 xl:px-32 backdrop-blur-md bg-white/10 z-50'>
            
                    
                    {/* --------------------------------      fix link to home -------------- */}
        <a href='#' aria-label='logo'>
            <img src={logo} alt="Memoria" className='logo mt-5' />
        </a>

        {/* MENU LINKS */}
        <div className={`max-md:fixed max-md:inset-0 max-md:bg-white/50 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:text-lg max-md:backdrop-blur flex items-center gap-8 ${ menuOpen ? 'max-md:w-full' : 'max-md:w-0' }`} >
            
            



            <div className="mt-5 nav-status-container shadow-lg flex items-center justify-around gap-6 px-6">
                {/* Home Link */}
                <a href="#home" className="relative overflow-hidden h-6 group text-white text-sm mx-2">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">
                        Home
                    </span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-emerald-400">
                        Home
                    </span>
                </a>

                {/* About Link */}
                <a href="#about" className="relative overflow-hidden h-6 group text-white text-sm mx-2">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">
                        About
                    </span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-emerald-400">
                        Us
                    </span>
                </a>

                {/* Contact Link */}
                <a href="#Contact" className="relative overflow-hidden h-6 group text-white text-sm mx-2">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">
                        Contact
                    </span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-emerald-400">
                        Us
                    </span>
                </a>
            </div>


            

            <button class='mt-5 md:hidden bg-emerald-300 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-cyan-700/50 shadow-green-500/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-700'>Get Started</button>
            <button aria-label='close menu' className='size-6 md:hidden' onClick={() => setMenuOpen(false)}>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-x'>
                    <path d='M18 6 6 18M6 6l12 12' />
                </svg>
            </button>
        </div>

        <button className='max-md:hidden bg-emerald-300 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-cyan-700/50 shadow-green-500/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-700'>Get Started</button>


        {/* BURGER MENU */}
        <button aria-label='menu burger' className='mr-14 size-6 md:hidden' onClick={() => setMenuOpen(true)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-align-justify'>
                <path d='M3 12h18M3 18h18M3 6h18' />
            </svg>
        </button>
    </nav>

           
    );
};

export default Navbar;