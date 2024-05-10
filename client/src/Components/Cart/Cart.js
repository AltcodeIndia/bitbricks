import React, { useContext , useEffect } from 'react'
import { Navbar } from '../LandingPage/PageComponents'
import { UserAuthContext } from '../../Context/Index'

const Cart = () => {
  const { isUserAuthenticated , interestedProperties ,  getInterestedProperties } = useContext(UserAuthContext);
  useEffect(() => {
    if (isUserAuthenticated) {
      getInterestedProperties();
    }
  }, [isUserAuthenticated]);

  return (
    <div className='w-full h-full'>
      <Navbar />
      <div className='w-full h-full py-20 px-20 flex flex-col'>
        <div className='flex flex-col'>
          <span className='leading-[110%] text-7xl text-[#000929] font-bold tracking-[-1%]'>Cart Items</span>
          <span className='leading-[160%] text-[20px] font-medium tracking-[-0.5%]'>One stop for all purchases</span>
        </div>
        <div className='pt-20 grid grid-cols-3'>
        {isUserAuthenticated ? (
            Array.isArray(interestedProperties) && interestedProperties.length > 0 ? (
              interestedProperties.map((propertyId) => (
                <div key={propertyId}>
                  <span>{propertyId}</span>
                </div>
              ))
            ) : (
              <div className='col-span-3 text-center'>
                <span className='text-lg font-semibold'>No properties added yet</span>
              </div>
            )
          ) : (
            <div className='col-span-3 text-center'>
              <span className='text-lg font-semibold'>Login to see details</span>
            </div>
          )}
        </div>
      </div>  
    </div>
  )
}

export default Cart