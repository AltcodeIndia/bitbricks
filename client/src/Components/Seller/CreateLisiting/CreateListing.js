import React, { useContext, useState } from 'react';
import { PropertyContext } from '../../../Context/Index';
import { useAddress } from '@thirdweb-dev/react';
const CreateListing = () => {
  const { createPropertyFunction } = useContext(PropertyContext);
  const [propertyForm, setPropertyForm] = useState({
    propertyTitle: '',
    description: '',
    category: '',
    price: '',
    propertyAddress: '',
    image: '',
    owner: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const address = useAddress();
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setPropertyForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'images' ? files : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createPropertyFunction({        
        ...propertyForm,
        owner: address
      });
      alert('Property listed successfully!');
      setPropertyForm({
        propertyTitle: '',
        description: '',
        category: '',
        price: '',
        image: '',
        propertyAddress: '',
        owner: '',
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      setError('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleClick = () => {
    setIsInputOpen(true);
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
    setIsInputOpen(false);
  };
  return (
    <div className='bg-[#5245ED]/70 w-11/12 h-fit px-14 py-10 flex flex-col border-2 border-[#EABFFF] gap-7 rounded-b-lg text-white items-center justify-center'>
      <div className='w-full flex justify-center'><span className='font-medium text-xl text-white/90'>Create Listing</span></div>
      <form onSubmit={handleSubmit} className='w-full h-full gap-4 flex flex-col justify-center items-center'>
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-full flex justify-between">
          <label htmlFor="propertyTitle">Property Title:</label>
          <input
            type="text"
            name="propertyTitle"
            id="propertyTitle"
            value={propertyForm.propertyTitle}
            onChange={handleChange}
            required
            className='bg-transparent border rounded w-96 h-7 outline-none px-3'
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="propertyTitle">Owner:</label>
          <input
            type="text"
            name="owner"
            id="owner"
            value={propertyForm.owner}
            onChange={handleChange}
            required
            className='bg-transparent border rounded w-96 h-7 outline-none px-3'
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={propertyForm.description}
            onChange={handleChange}
            required
            className='bg-transparent border rounded w-96 h-20 outline-none px-3'
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={propertyForm.category}
            onChange={handleChange}
            required
            className='bg-transparent border rounded w-96 h-7 outline-none px-3'
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="price">Price (ETH):</label>
          <input
            type="number"
            name="price"
            id="price"
            value={propertyForm.price}
            onChange={handleChange}
            min="0"
            step="0.000000000000000001"
            required
            className='bg-transparent border rounded w-96 h-7 outline-none px-3'
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="images">Property Images:</label>
          <div className='cursor-pointer bg-transparent border rounded w-96 h-7 outline-none px-3' onClick={handleClick}>
          <label htmlFor="hiddenFileInput">
          {selectedFiles.length > 0 ? (
              <span className="selected-files">
                {selectedFiles.length} file(s) selected
              </span>
            ) : (
              <span className="upload-text cursor-pointer">Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="hiddenFileInput"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*" 
          />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="propertyAddress">Property Address:</label>
          <input
            type="text"
            name="propertyAddress"
            id="propertyAddress"
            value={propertyForm.propertyAddress}
            onChange={handleChange}
            required
            className='bg-transparent border rounded w-96 h-7 outline-none px-3'
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 border-2 border-[#E0DEF7] rounded mt-10 w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Listing'}
        </button>
      </form>
    </div>
  )
}

export default CreateListing