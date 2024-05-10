import React from 'react'

const CTA = () => {
  return (
    <div className='w-full h-2/5 px-[448px] py-[64px] flex flex-col items-center gap-3'>
        <span className='text-[#7065F0] text-2xl font-bold leading-[150%] tracking-[-1%]'>No Spam Promise</span>
        <span className='leading-[140%] tracking-[-1%] text-4xl font-bold text-[#000929]'>Are you a landlord?</span>
        <span className='leading-[160%] text-[#000929]/30 text-[16px] font-medium'>Discover ways to increase your home's value and  get listed. No Spam.</span>
        <div className='flex flex-row gap-6 pt-16 pb-4 items-baseline'>
            <input 
                type='email'
                placeholder='Enter your email address'
                className='h-10 w-80 px-1 outline-none bg-[#F7F7FD] text-[#7065F0]'
            />
            <button className='px-6 py-2 text-white bg-[#7065F0] rounded'>Submit</button>
        </div>
        <span className='font-medium leading-[140%] text-[14px] text-[#9EA3AE]'>Join <span className='text-[#7065F0]'>10,000+</span> other landlords in our bitbricks community</span>
    </div>
  )
}

export default CTA