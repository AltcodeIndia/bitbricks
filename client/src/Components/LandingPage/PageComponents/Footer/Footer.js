import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-2/5 flex flex-col'>
        <div className='w-full flex flex-row'>
            <div className='w-2/5 flex items-center justify-center'><NavLink><img src='/Navbar/logo.svg' alt='logoImage'/></NavLink></div>
            <div className='w-full grid grid-cols-3 gap-3'>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>SELL A HOME</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Request an offer</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Pricing</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Reviews</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Stories</NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>BUY, RENT AND SELL</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Buy and sell properties</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Rent home</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Builder trade-up</NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>ABOUT</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Company</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>How it works</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Contact</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Investors</NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>BUY A HOME</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Buy</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Finance</NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>TERMS & PRIVACY</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Trust & Safety</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Terms of Service</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Privacy Policy</NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold leading-[150% text-[16px] text-[#000929]'>RESOURCES</div>
                    <div className='flex flex-col font-medium text-[#000929]/40 leading-[34px]'>
                        <NavLink className={"hover:text-[#000929]"}>Blog</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Guides</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>FAQ</NavLink>
                        <NavLink className={"hover:text-[#000929]"}>Help Center</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-center py-4'><img src='/Footer/Line.svg' alt='line'/></div>
        <div className='w-full flex px-52 py-5 justify-between'>
            <div className='leading-[160%] text-[#000929]/50 font-medium'>©2024 Bitbricks. All rights reserved</div>
            <div className='w-1/3 flex justify-evenly'>
                <NavLink><img src='/Footer/facebook.svg' alt='facebook' /></NavLink>
                <NavLink><img src='/Footer/insta.svg' alt='insta' /></NavLink>
                <NavLink><img src='/Footer/linkedin.svg' alt='linkedin' /></NavLink>
                <NavLink><img src='/Footer/twitter.svg' alt='twitter' /></NavLink>
            </div>
        </div>
    </div>
  )
}

export default Footer