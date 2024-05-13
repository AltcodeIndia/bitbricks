import React from 'react'

const Listing = ({owner, title, description, category, price, productID, address, reviewer, image}) => {
  return (
    <div className="w-[352px] h-[424px] border bg-[#FFFFFF] rounded border-[#F0EFFB] flex flex-col">
        <div className='w-full h-[200px]'> <img src={image} alt='propertyImage' className='rounded object-cover w-full h-full'/></div>
        <div className='h-[224px] w-full p-5 flex flex-col justify-evenly relative top-[-1rem]'>
        <div className='flex items-center flex-row'>
            <span className='font-extrabold leading-[150%] text-[#7065F0] text-2xl tracking-[-1px]'>{price}</span>
                {category && (
                    <span className='leading-[150%] text-[#000929]/60 px-1'>ETH/month</span>
                )}
                {!category && (
                    <span className='leading-[150%] text-[#000929]/60 px-1'>ETH/night</span>
                )}
            </div>
            <div><span className='font-bold tracking-[-1px] leading-[150%] text-2xl'>{title}</span></div>
            <div><span className='font-medium text-[14px] text-[#000929]/60 truncate flex'>{address}</span></div>
            <div className='flex flex-row w-full justify-between items-end mt-4'>
                {description}
            </div>
        </div>
    </div>
  )
}

export default Listing