import React from 'react'
import baseGrad from '../../assets/BgGrad.png'
import robot from '../../assets/solution.png'
function About() {
  return (
    <div id='about'>
    
        
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div className="grid place-items-right ml-20">
                <img src={baseGrad} className="col-start-1 row-start-1 w-full max-w-lg h-auto " />
                <img src={robot} className="hov col-start-1 row-start-1 w-full max-w-lg h-auto opacity-100" />
            </div>
            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <h1 className="hov text-4xl md:text-7xl font-semibold bg-linear-to-r from-[#858AFF] to-green-500 text-transparent leading-tight bg-clip-text">
                  Memoria
              </h1>
              <p className="hov text-base text-neutral-600 max-w-md mt-4">
                  The Digital Pulse of Memory combines AI with advanced IoT monitoring , We are here to help you
              </p>
            </div>
            
          </div>
        
    
    </div>
  )
}

export default About