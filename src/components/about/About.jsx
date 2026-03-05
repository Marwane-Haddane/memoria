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






        <section id="testimonies" className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    {/* Header */}
    <div className="mb-12 text-center">
      <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-600 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
        Words from Our Clients
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 md:text-5xl mb-2">
        It's not just us.
      </h1>
      <p className="text-xl text-gray-700 md:text-2xl">
        Here's what others have to say about us.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Kanye West",
          role: "Rapper & Entrepreneur",
          image: "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
          testimonial: "Find God.",
          url: "https://twitter.com/kanyewest",
        },
        {
          name: "Tim Cook",
          role: "CEO of Apple",
          image: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
          testimonial:
            "Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.",
          url: "https://twitter.com/tim_cook",
        },
        {
          name: "Parag Agrawal",
          role: "CEO of Twitter",
          image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
          testimonial:
            "Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec.",
          url: "https://twitter.com/paraga",
        },
        {
          name: "Satya Nadella",
          role: "CEO of Microsoft",
          image: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
          testimonial:
            "Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi.",
          url: "https://twitter.com/satyanadella",
        },
        {
          name: "Dan Schulman",
          role: "CEO of PayPal",
          image: "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
          testimonial:
            "Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus.",
          url: "https://twitter.com/dan_schulman",
        },
      ].map((person, idx) => (
        <a
          key={idx}
          href={person.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg bg-gray-50 p-6 ring-1 ring-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={person.image}
              alt={person.name}
              className="w-12 h-12 rounded-full border bg-gray-200 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
              <p className="text-gray-500 text-sm">{person.role}</p>
            </div>
          </div>
          <p className="text-gray-700">{person.testimonial}</p>
        </a>
      ))}
    </div>
  </div>
</section>







          <p className="text-xl text-gray-700 md:text-2xl text-center font-semibold">
            Here's what Our Customers said 
          </p>

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