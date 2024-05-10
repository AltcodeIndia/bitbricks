import React , { useState , useContext } from 'react'
import { Navbar } from "../index"
import { NavLink } from 'react-router-dom'
import { SellerAuthContext, UserAuthContext } from '../../../../Context/Index'


const PropertyDetails = ({property}) => {
  const [ show , setShow ] = useState(false);
  const { isSellerAuthenticated } = useContext(SellerAuthContext);
  const { isUserAuthenticated } = useContext(UserAuthContext)
  const authenticated = isSellerAuthenticated || isUserAuthenticated;
  const { addPropertyToInterestedProperties  } = useContext(UserAuthContext);
  const handleDetailClick = () => {
    setShow(!show);
  }
  const handleAddToCart = () => {
    console.log(property._id)
    addPropertyToInterestedProperties(property._id);
  }
  return (
    <div className='w-full h-full'>
        <Navbar />
        <div className='w-full h-full flex flex-col p-16'>
            <div className='w-full h-[70%] flex flex-row'>
                <div className='w-1/3 p-5 bg-[#7065F0]/50 flex items-center justify-center rounded-lg h-fit'>
                    <img 
                        src={property.imageUrl}
                        alt={property.name}
                        className='rounded-lg'
                    />
                </div>
                <div className='w-full px-10 flex flex-col gap-4'>
                    <div className='flex w-full'> <span className='text-[#000929] font-bold leading-[150%] text-5xl w-1/3'>{property.name}</span> </div>
                    <div className='flex w-full'> <span className='leading-[150%] font-medium text-[16px] text-[#000929]/70'> {property.description} </span></div>
                    <div className='flex w-2/3 flex-row justify-between items-end'>
                        <div className='flex items-end'><img src='/Hero/ether.svg' alt='ether' className='w-[24px]'/><span className='leading-[150%] font-bold text-[22px]'>{property.price}</span></div>
                        <div className='flex'><button className='px-6 py-2 text-white bg-[#7065F0] rounded' onClick={handleDetailClick}><NavLink>More Details</NavLink></button></div>
                    </div>
                    {show && 
                        <div className='w-2/3 bg-[#7065F0]/50 flex flex-col justify-between items-center py-5 px-10 gap-4 rounded'>
                            <div>PropertyDetails</div>
                            <div className='flex flex-row justify-between w-2/3'>
                                <div className='flex gap-1 hover:bg-violet-200 px-1 py-1 cursor-pointer rounded'><img src='/PropertyListing/bed.svg' alt="bedImage"/>{property.bed}beds</div>
                                <div className='flex gap-1 hover:bg-violet-200 px-1 py-1 cursor-pointer rounded'><img src='/PropertyListing/bath.svg' alt='BathImage'/>{property.bathroom}bathrooms</div>
                                <div className='flex gap-1 hover:bg-violet-200 px-1 py-1 cursor-pointer rounded'><img src='/PropertyListing/SquareMeters.svg' alt='AreaImage'/>{property.area}m²</div>
                            </div>
                        </div>
                    }
                    <div className='flex w-2/3 flex-col gap-3'>
                        <button className='px-6 py-2 border-2 border-[#7065F0]/50 rounded'><NavLink className="font-bold text-[16px] leading-[150%]">Buy Now</NavLink></button>
                        <button className='px-6 py-2 border-2 bg-[#7065F0] text-white rounded h-[56px] flex flex-row justify-center items-center'>
                            { !authenticated && (
                                <>
                                    <NavLink className="font-bold text-[16px] leading-[150%]" to={"/login"}>Login to get started</NavLink>
                                </>
                            )}
                            { authenticated && (
                                <>
                                    <NavLink className="font-bold text-[16px] leading-[150%] flex" onClick={handleAddToCart}>Add to Cart <img src='/PropertyListing/cart.svg' /></NavLink>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full pt-10 flex flex-col'>
                <span className='leading-[150%] text-5xl font-bold'> Similar Properties </span>
            </div>
        </div>
    </div>
  )
}

export default PropertyDetails