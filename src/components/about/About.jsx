import React from 'react'
import baseGrad from '../../assets/BgGrad.png'
import robot from '../../assets/solution.png'
function About() {
  return (
    <div>
    
        
        <div className="grid place-items-right ml-20">
            <img src={baseGrad} className="col-start-1 row-start-1 w-150 h-150 " />
            <img src={robot} className="hov col-start-1 row-start-1 w-150 h-150 opacity-80" />
        </div>
    
    
    </div>
  )
}

export default About