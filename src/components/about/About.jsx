import React from 'react'
import baseGrad from '../../assets/BgGrad.png'
import robot from '../../assets/solution.png'
import CircularGallery from '../../component/CircularGallery'


function About() {
  const testimonialData = [
  { 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800', 
    text: 'Sarah: Changed our lives!' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800', 
    text: 'Marcus: Incredible AI care.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800', 
    text: 'Elena: Helped us so much.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 
    text: 'David: A true blessing.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', 
    text: 'Priya: Flawless IoT tracking.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800', 
    text: 'Linda: Gives me peace.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800', 
    text: 'James: Exceptional support!' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', 
    text: 'Anita: Highly recommended.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800', 
    text: 'Omar: Brilliant technology.' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800', 
    text: 'Chloe: We feel safe now.' 
  }
];
  return (
    <div id='about'>
    
        
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div className="grid place-items-right ml-20">
                <img src={baseGrad} className="col-start-1 row-start-1 w-full max-w-lg h-auto " />
                <img src={robot} className="hov col-start-1 row-start-1 w-full max-w-lg h-auto opacity-100" />
            </div>
            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <h1 className="hov text-4xl md:text-7xl font-semibold bg-linear-to-r from-[#858AFF] to-green-500 text-transparent leading-tight bg-clip-text">
                  About Memoria
              </h1>
              <p className="hovF text-base text-neutral-600 max-w-md mt-4">
              Memoria was born from the understanding that cognitive decline affects not just individuals, but entire families. Behind every diagnosis is a story — of love, resilience, and the desire to provide the best possible care.
              We leverage AI-driven insights and smart IoT systems to help families stay connected, informed, and reassured. Our solutions are designed to anticipate needs, reduce uncertainty, and support caregivers in making confident decisions.
              Because care should feel human — even when powered by technology.    
              </p>
            </div>
            
          </div>

          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery 
            items={testimonialData} 
            bend={1} 
            textColor="#2a2721" /* Change this if your site background is light! */
            borderRadius={0.05} 
            />

          </div>
        
    
    </div>
  )
}

export default About