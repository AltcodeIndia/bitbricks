import React , { useState , useEffect } from 'react'
import PropertyListing from './PropertyListing';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Property = () => {
  const [selectedOption, setSelectedOption] = useState('Rent');
  const [searchLocation, setSearchLocation] = useState('');
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    // Fetch property data from the backend API
    axios.get('http://localhost:8000/api/property')
      .then(response => {
        // Set the fetched properties into state
        setProperties(response.data.property);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, []);

  const filteredProperties = properties.filter(property => {
    const lowercaseSearchLocation = searchLocation.toLowerCase();
    const lowercasePropertyName = property.name.toLowerCase();
    const lowercasePropertyLocation = property.location.toLowerCase();

    if (selectedOption === 'Rent') {
      return (
        property.isRental &&
        (lowercasePropertyName.includes(lowercaseSearchLocation) ||
          lowercasePropertyLocation.includes(lowercaseSearchLocation))
      );
    } else if (selectedOption === 'Buy') {
      return (
        property.isPopular &&
        (lowercasePropertyName.includes(lowercaseSearchLocation) ||
          lowercasePropertyLocation.includes(lowercaseSearchLocation))
      );
    }
    // Add more conditions if needed for 'Sell' option
    return false;
  });
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  }
  const handleSearch = (e) => { 
    setSearchLocation(e.target.value); 
  };
  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
        <div className='flex flex-col items-center pt-10'>
            <span className='leading-[140%] font-bold text-[#000929] text-5xl'>Based on your location</span>
            <span className='leading-[160%] font-normal text-[#000929]/70 text-[16px]'>Some of our picked properties near you location.</span>
        </div>
        <div className='w-2/3 h-11/12 flex flex-col pt-20'>
            <div className='w-full flex flex-nowrap justify-between items-center'>
                <div className='w-96 border-2 border-[#E0DEF7] bg-[#F0EFFB] h-16 rounded flex justify-evenly items-center p-2'>
                    <button
                        className={`px-8 py-2 ${selectedOption === 'Rent'? 'bg-white text-[#7065F0] border-2 border-[#E0DEF7] font-bold leading-[145%] rounded': 'text-[#000929]'}`}
                        onClick={() => handleOptionChange('Rent')}
                    >
                        Rent
                    </button>
                        <button
                            className={`px-8 py-2 ${selectedOption === 'Buy' ? 'bg-white text-[#7065F0] border-2 border-[#E0DEF7] font-bold leading-[145%] rounded': 'text-[#000929]'}`}
                            onClick={() => handleOptionChange('Buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`px-8 py-2 ${selectedOption === 'Sell' ? 'bg-white text-[#7065F0] border-2 border-[#E0DEF7] font-bold leading-[145%] rounded': 'text-[#000929]'}`}
                            onClick={() => handleOptionChange('Sell')}
                        >
                            Sell
                        </button>
                </div>
                <div className='flex h-14 w-80 bg-[#F7F7FD] border-2 border-[#E0DEF7] rounded flex-row px-2'>
                    <img src='/PropertyListing/Icon.svg'alt='searchIcon' className='w-6'/>
                    <input 
                        type='text'
                        placeholder='Search...'
                        className='w-full px-1 outline-none bg-[#F7F7FD] text-[#7065F0]'
                        value={searchLocation} 
                        onChange={handleSearch} 
                    />
                </div>
            </div>
        </div>
        <div className='flex flex-row gap-6 justify-center w-full '>
            {selectedOption === "Sell" ? (
                <p className="text-center text-gray-500 w-full h-[45rem] px-14 py-10">No Properties Listed Yet</p>
            ) : (
                <div className="grid grid-cols-3 gap-4 w-full h-full px-14 py-10">
                    {filteredProperties.length === 0 ? (
                        <p className="text-center text-gray-500 w-full h-[45rem] ">No property found</p>
                    ) : (
                        filteredProperties.map((property) => (
                            <Link key={property._id} to={`/properties/${property._id}`}>
                              <PropertyListing {...property} />
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
        <div>
            <img src='/PropertyListing/Button.svg' alt='more_options'/>
        </div>
    </div>
  )
}

export default Property