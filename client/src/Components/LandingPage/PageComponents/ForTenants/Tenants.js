import React from 'react'

const Tenants = () => {
  return (
    <div className='flex flex-col justify-between items-center w-full h-full py-20'>
        <div className='w-3/4 flex flex-row justify-between items-center'>
            <span className='w-1/2 font-bold leading-[140%] tracking-[-1px] text-white text-5xl'>We make it easy for <span className='text-[#7065F0]'>tenants</span> and <span className='text-[#7065F0]'>landlords.</span></span>
            <span className='w-2/6 font-medium leading-[160%] text-[16px] text-white/70'>Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. The best part? you’ll save a bunch of money and time with our services.</span>
        </div>
        <div className='w-3/4 h-[25rem] grid grid-cols-3 items-center gap-3 px-10'>
            <div className='bg-white/40 h-full rounded-lg flex flex-col justify-evenly items-center p-10'>
                <div className='flex flex-row items-center gap-2'>
                    <img src='/Tenants/Icon.svg' alt='Icon'/>
                    <span className='leading-[150%] font-bold text-2xl text-white'>Virtual home tour</span>
                </div>
                <div><span className='text-white/70'>You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.</span></div>
            </div>
            <div className='bg-white h-full rounded-lg flex flex-col justify-evenly items-center p-10'>
                <div className='flex flex-row items-center gap-2'>
                    <img src='/Tenants/Icon2.svg' alt='Icon'/>
                    <span className='leading-[150%] font-bold text-2xl'>Find the best deal</span>
                </div>
                <div><span className='text-[#000929]/70'>Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!</span></div>
            </div>
            <div className='bg-[#7065F0] h-full rounded-lg flex flex-col justify-evenly items-center p-10 text-white'>
                <div className='flex flex-row items-center gap-2'>
                    <img src='/Tenants/Icon3.svg' alt='Icon'/>
                    <span className='leading-[150%] font-bold text-2xl'>Get ready to apply</span>
                </div>
                <div><span className='text-white/70'>Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!</span></div>
            </div>
        </div>
        <div className='w-3/4 h-[0.05rem] bg-white' />
        <div className='flex flex-row w-3/5 justify-between'>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-bold leading-[140%] tracking-[-1%] text-4xl text-white'>7.4%</div>
                <div className='font-medium leading-[160%] text-[16px] text-white/70'>Property Return Rate</div>
            </div>
            <img src='/Hero/Line.svg' alt='line'/>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-bold leading-[140%] tracking-[-1%] text-4xl text-white'>3,856</div>
                <div className='font-medium leading-[160%] text-[16px] text-white/70'>Property in Sell & Rent</div>
            </div>
            <img src='/Hero/Line.svg' alt='line'/>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-bold leading-[140%] tracking-[-1%] text-4xl text-white'>2,540</div>
                <div className='font-medium leading-[160%] text-[16px] text-white/70'>Daily Completed Transactions</div>
            </div>
        </div>
    </div>
  )
}

export default Tenants