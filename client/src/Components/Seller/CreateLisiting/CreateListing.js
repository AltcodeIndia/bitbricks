import React, { useContext, useState } from 'react';
import { PropertyContext } from '../../../Context/Index';

const CreateListing = () => {
  const { createPropertyFunction } = useContext(PropertyContext);
  const [propertyForm, setPropertyForm] = useState({
    propertyTitle: '',
    description: '',
    category: '',
    price: '',
    images: [],
    propertyAddress: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setPropertyForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'images' ? files : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createPropertyFunction(propertyForm);
      alert('Property listed successfully!');
      setPropertyForm({
        propertyTitle: '',
        description: '',
        category: '',
        price: '',
        images: [],
        propertyAddress: '',
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    }
  };
  return (
    <div>CreateListing</div>
  )
}

export default CreateListing