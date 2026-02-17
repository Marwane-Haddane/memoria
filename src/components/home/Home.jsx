import React from 'react'
import './home.css'
import hero from '../../assets//Alzheimer.svg'
import Nav from '../nav/Nav'



function Home() {
    
    

    return (
        <>
            <section className='w-full bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-grid-gradient-img.png")] bg-cover bg-center bg-no-repeat px-4 pb-10'>
                <Nav></Nav>
                <div className='w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 '>
                    
                    
                    {/* Left -----------------       fix link --------------*/}
                    <div className='flex flex-col items-start'>
                        

                        <h1 className="hov text-4xl md:text-7xl/20 text-center font-semibold max-w-3xl mt-5 bg-linear-to-r from-[#858AFF] to-green-500 text-transparent leading-tight bg-clip-text">
                            Memoria
                        </h1>
                        <p className="hov text-center lg:text-left text-base/7 text-neutral-600 max-w-md mt-4 mx-auto md:mx-0 ">
                            The Digital Pulse of Memory combines AI with advanced IoT monitoring , We are here to help you
                        </p>



                       
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