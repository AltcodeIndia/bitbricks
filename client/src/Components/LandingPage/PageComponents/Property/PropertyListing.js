import React , { useEffect } from 'react'
import axios from 'axios';

const PropertyListing = ({name , imageUrl , isPopular , isRental , price , address , bed , bathroom , area}) => {
  return (
    <div className="w-[352px] h-[424px] border bg-[#FFFFFF] rounded border-[#F0EFFB] flex flex-col"> 
        <div className='w-full h-[200px]'> <img src={imageUrl} alt='propertyImage' className='rounded object-cover w-full h-full'/> </div>
        {isPopular && (
            <div><img src='/PropertyListing/Popluar.svg' alt='Popular' className='left-[-0.6rem] relative top-[-1rem]'/></div>
        )}
        <div className='h-[224px] w-full p-5 flex flex-col justify-evenly relative top-[-1rem]'>
            <div className='flex items-center flex-row'>
                <span className='font-extrabold leading-[150%] text-[#7065F0] text-2xl tracking-[-1px]'>{price}</span>
                {isRental && (
                    <span className='leading-[150%] text-[#000929]/60 px-1'>ETH/month</span>
                )}
                {!isRental && (
                    <span className='leading-[150%] text-[#000929]/60 px-1'>ETH/night</span>
                )}
            </div>
            <div><span className='font-bold tracking-[-1px] leading-[150%] text-2xl'>{name}</span></div>
            <div><span className='font-medium text-[14px] text-[#000929]/60 truncate flex'>{address}</span></div>
            <div className='bg-[#F0EFFB] w-full h-[2px] mt-2' />
            <div className='flex flex-row w-full justify-between items-end mt-4'>
                <div className='flex flex-row gap-1 hover:bg-violet-200 rounded px-1 py-1'>
                    <img src='/PropertyListing/Bed.svg' alt='Bed'/>
                    <span className='flex gap-1 text-[#000929]/80 text-[14px] font-medium leading-[140%]'>{bed}<span>Beds</span></span>
                </div>
                <div className='flex flex-row gap-1 hover:bg-violet-200 rounded px-1 py-1'>
                    <img src='/PropertyListing/Bath.svg' alt='Bath'/>
                    <span className='flex gap-1 text-[#000929]/80 text-[14px] font-medium leading-[140%]'>{bathroom}<span>Bathrooms</span></span>
                </div>
                <div className='flex flex-row gap-1 hover:bg-violet-200 rounded px-1 py-1'>
                    <img src='/PropertyListing/SquareMeters.svg' alt='Bed'/>
                    <span className='flex gap-1 text-[#000929]/80 text-[14px] font-medium leading-[140%]'>{area}<span>m²</span></span>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default PropertyListing