import React from 'react'
import { Navbar , Hero , Benefits , Property , Tenants , CTA , Footer} from './PageComponents'

const LandingPage = () => {
  return (
    <div>
        <section className='w-full h-screen'>
            <Navbar />
            <Hero />
        </section>
        <section className='w-full h-screen relative z-10 bg-white'>
            <Benefits />
        </section>
        <section className='w-full bg-gradient-to-b from-white to-[#F0EFFB]'>
            <Property />
        </section>
        <section className='w-full h-screen bg-[#100A55]'>
          <Tenants />
        </section>
        <section className='w-full h-fit'> 
          <CTA />
        </section>
        <section className='w-full'>
          <Footer />
        </section>
    </div>
  )
}

export default LandingPage