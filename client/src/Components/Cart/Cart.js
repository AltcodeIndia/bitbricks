import React from 'react'
import { Navbar } from '../LandingPage/PageComponents'

const Cart = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <div className='w-full h-full py-20 px-20 flex flex-col'>
        <div className='flex flex-col'>
          <span className='leading-[110%] text-7xl text-[#000929] font-bold tracking-[-1%]'>Cart Items</span>
          <span className='leading-[160%] text-[20px] font-medium tracking-[-0.5%]'>One stop for all purchases</span>
        </div>
        <div className='pt-20 grid grid-cols-3'>
          <div>hjk</div>
          <div>hjk</div>
          <div>hjk</div>
          <div>hjk</div>
        </div>
      </div>  
    </div>
  )
}

export default Cart