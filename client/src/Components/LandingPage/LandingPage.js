import React from 'react'
import { Navbar , Hero , Benefits , Property , Tenants } from './PageComponents'

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
    </div>
  )
}

export default LandingPage