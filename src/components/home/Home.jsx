import React from 'react'
import './home.css'
import hero from '../../assets//Alzheimer.svg'
import { Link } from 'react-router-dom';



function Home() {
    
    

    return (
        <>
            <section id='home' className='w-full bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-grid-gradient-img.png")] bg-cover bg-center bg-no-repeat px-4 pb-10'>
    
                <div className='w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 '>
                    
                    
                    {/* Left -----------------       fix link --------------*/}
                    <div className='flex flex-col items-start relative z-10'>
                        

                        <h1 className="mb-5 hov text-4xl md:text-7xl/20 text-center font-semibold max-w-3xl mt-5 bg-linear-to-r from-[#858AFF] to-green-500 text-transparent leading-tight bg-clip-text">
                            Memoria
                        </h1>
                        <p className="mb-5 hov text-center lg:text-left text-base/7 text-neutral-600 max-w-md mt-4 mx-auto md:mx-0 ">
                            The Digital Pulse of Memory combines AI with advanced IoT monitoring , We are here to help you
                        </p>


                        {/*------------------- fix the link here to start -------------------- */}
                        <Link to="/patient">
                        <button id='' className="btn-53">
                        <div className="original">Let's_Start</div>
                        <div className="letters">
                            
                            <span>L</span>
                            <span>E</span>
                            <span>T</span>
                            <span>'</span>
                            <span>S</span>
                            <span>_</span>
                            <span>S</span>
                            <span>T</span>
                            <span>A</span>
                            <span>R</span>
                            <span>T</span>
                        </div>
                        </button>
                        </Link>


                       
                    </div>

                    {/* Right */}
                    <div className='w-full max-w-md md:max-w-lg'>
                        <img className='heroimg w-full h-auto object-contain' src={hero} alt="Dashboard Preview" />
                    </div>
                </div>
            </section>




            
        </>
    )





}

export default Home