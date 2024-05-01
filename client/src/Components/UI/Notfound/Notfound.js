import React from 'react'
import { Navbar } from '../../LandingPage/PageComponents'

const Notfound = () => {
  return (
    <div className='w-full h-full'>
        <Navbar />
        <div className='w-full h-full flex items-center justify-center'>
            <img 
                src="/Notfound/NotFound.svg"
                alt='notfound'
            />
        </div>
    </div>
  )
}

export default Notfound