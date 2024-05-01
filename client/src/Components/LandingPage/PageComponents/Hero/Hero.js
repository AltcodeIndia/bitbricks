import React , { useState , useEffect} from 'react'
import Testimonial from './Testmonials';
import PropertyImages from './PropertyImages';

const Hero = () => {
  const [selectedOption, setSelectedOption] = useState('Rent');
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [propertyIndex, setPropertyIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Testimonial.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
        setPropertyIndex((prevIndex) => (prevIndex + 1) % PropertyImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setInputValue('');
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const getInputPlaceholder = () => {
    switch (selectedOption) {
      case 'Rent':
        return 'Enter property name';
      case 'Buy':
        return 'Enter property location';
      case 'Sell':
        return 'Enter property type';
      default:
        return '';
    }
  };
  const getButtonText = () => {
    switch (selectedOption) {
      case 'Rent':
        return 'Start Renting';
      case 'Buy':
        return 'Start Buying';
      case 'Sell':
        return 'Start Listing';
      default:
        return 'Start Listing';
    }
  };

  return (
    <div className='w-full h-full flex flex-nowrap pt-12'>
        <div className='w-1/2 pl-20 flex flex-col gap-8'>
            <div className='flex flex-wrap gap-4'>
                <span className='font-bold text-7xl leading-[110%] tracking-[-1%]'>Buy, rent, or sell your property easily</span>
                <span className='font-medium leading-[160%] tracking-[-0.5%] w-[60%]'>A great platform to buy, sell, or even rent your properties without any commisions.</span>
            </div>
            <div>
                <div className="flex flex-col w-full relative z-10">
                    <div className="flex bg-white rounded-t ml-5 w-72 h-[55px]">
                        <button
                            className={`px-8 py-2 ${selectedOption === 'Rent'? 'border-b-2 border-[#7065F0] text-[#7065F0] font-bold leading-[145%]': 'text-[#000929] border-b-2'}`}
                            onClick={() => handleOptionChange('Rent')}
                        >
                            Rent
                        </button>
                        <button
                            className={`px-8 py-2 ${selectedOption === 'Buy' ? 'border-b-2 border-[#7065F0] text-[#7065F0] font-bold leading-[145%]': 'text-[#000929] border-b-2'}`}
                            onClick={() => handleOptionChange('Buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`px-8 py-2 ${selectedOption === 'Sell' ? 'border-b-2 border-[#7065F0] text-[#7065F0] font-bold leading-[145%]': 'text-[#000929] border-b-2'}`}
                            onClick={() => handleOptionChange('Sell')}
                        >
                            Sell
                        </button>
                    </div>
                    <div className='w-[783px] flex h-[90px] rounded-b-lg bg-white items-center justify-evenly'>
                        <input
                            type="text"
                            value={inputValue}
                            placeholder={getInputPlaceholder()}
                            className="px-4 py-2 rounded-md border h-14 w-[447px] border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                            onChange={handleInputChange}
                        />
                        <img src='/Hero/Line.svg' alt='sepration'/>
                        <button className="px-4 py-2 rounded-md h-14 bg-[#7065F0] font-bold text-white w-[180px]">{getButtonText()}</button>
                    </div>
                </div>
            </div>
        <div><img src='/Hero/numbers.svg' alt='numbers'/></div>
        </div>
        <div className='w-1/2'>
            <div className='flex flex-col w-[270px] bg-white rounded h-[285px] justify-evenly items-center absolute left-[45%]'>
                <div className='flex flex-nowrap w-full px-6 justify-between'>
                    <div><img src={Testimonial[currentIndex].image} alt='client_image'  className='rounded-full w-16 h-16 object-cover'/></div>
                    <div className='flex flex-col'>
                        <span className='flex font-bold leading-[120%] text-[16px] text-[#000929]'>{Testimonial[currentIndex].name}</span>
                        <span className='flex font-medium leading-[140%] text-[12px] text-[#000929]/40 mb-2'>{Testimonial[currentIndex].desgination}</span>
                        <span className='flex font-medium leading-[140%] text-[12px] text-[#000929]/40 gap-3'>Moved with <img src='/Navbar/logo.svg' alt='logo' className='w-[69px]' /></span>
                    </div>
                </div>
                <div className='flex flex-nowrap px-6 justify-between gap-3 h-12 items-start'>
                    <img src='/Hero/quote.svg' alt='review' className='w-8 h-8'/>
                    <span className='font-medium text-[12px] tracking-[-1%] leading-[160%] w-full'>{Testimonial[currentIndex].review}</span>
                </div>
                <div><img src='/Hero/hLine.svg' alt='horizontal line'/></div>
                <div className='flex flex-nowrap justify-between items-center w-full px-6'>
                    <div className='flex flex-col w-1/2'>
                        <div className='flex items-center gap-1'>
                            <img src='/Hero/ether.svg' alt='ether' />
                            <span className='font-extrabold text-[25px] leading-[100%]'>{Testimonial[currentIndex].saved}</span>
                        </div>
                        <div className='flex'>
                            <span className='leading-[135%] text-[#000929]/50 font-medium text-[12px] '>Saved up to</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 items-end justify-end  w-1/2'>
                        <div className='flex items-center'>
                            <span className='font-extrabold text-[25px] leading-[100%]'>-{Testimonial[currentIndex].processTime}</span>
                        </div>
                        <div className='flex'>
                            <span className='leading-[135%] text-[#000929]/50 font-medium text-[12px] '>Process Time</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex items-end'>
                <img src={PropertyImages[propertyIndex].image} alt='backgroundImage' className='w-[100rem] h-[80vh] object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default Hero