import React from 'react'

const Benefits = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center' style={{backgroundImage:`url("/Benefits/bg.svg")`}}>
        <div className='w-2/3 h-2/3 flex flex-nowrap  items-center'>
            <div className='w-[700px] h-[500px] flex flex-col gap-3 p-10' style={{backgroundImage:`url("/Benefits/MaskGroup.svg")`, backgroundRepeat:"no-repeat"}}>
                <div className='font-bold text-[#100A55] text-3xl leading-[125%]'>The new way to find your new home</div>
                <div className='font-medium text-[#100A55]/80 text-[16px] w-2/3 leading-[160%]'>Find your dream place to live in with more than 10k+ properties listed.</div>
                <div className='mt-8'>
                    <button className='leading-[140%] font-bold text-white bg-[#100A55] px-4 py-2 rounded text-[14px]'>Browse Properties</button>
                </div>
            </div>
            <div className='w-full ml-6'>
                <img src='/Benefits/details.svg' alt='details'/>
            </div>
        </div>
        <div className='w-full flex justify-end px-10'>
            <button><img src='/Benefits/Button.svg' alt='knowMore'/></button>
        </div>
    </div>
  )
}

export default Benefits