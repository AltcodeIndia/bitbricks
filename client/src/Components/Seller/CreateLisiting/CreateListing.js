import React, { useState, useContext } from "react";
import { SellerAuthContext } from "../../../Context/Index";

const CreateListing = () => {
  const { addProperty } = useContext(SellerAuthContext);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [property, setProperty] = useState({
    name: "",
    isRental: "",
    location: "",
    address: "",
    category: "",
    description: "",
    price: "",
    bed: "",
    bathroom: "",
    area: ""
  });

  const {
    name,
    isRental,
    location,
    address,
    category,
    description,
    price,
    bed,
    bathroom,
    area
  } = property;
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImgPreview(URL.createObjectURL(file));
    setImg(e.target.files);
  };
  const onChangeHandler = (e) => {
    console.log('onChangeHandler:', e.target.name, e.target.value);
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    console.log("dekhle property", property)
    e.preventDefault();
    if (
      property.name === "" ||
      property.isRental === "" ||
      property.location === "" ||
      property.address === "" ||
      property.category === "" ||
      property.description === "" ||
      property.price === "" ||
      property.bed === "" ||
      property.bathroom === "" ||
      property.area === ""
    ) {
      alert("please fill all fields");
    } else {
      const formData = {
        name: property.name,
        isRental: property.isRental,
        location: property.location,
        address: property.address,
        category: property.category,
        description: property.description,
        price: property.price,
        bed: property.bed,
        bathroom: property.bathroom,
        area: property.area,
      };
  
      console.log(formData);
      try {
        await addProperty(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
            <form className="flex flex-row gap-7" onSubmit={submitHandler}>
      <div className="h-full flex items-center justify-center flex-col">
        <div className="w-[224px] h-[271px] bg-[#7065F0] p-4">
          {imgPreview ? (
            <img src={imgPreview} alt="seller_image" className="border w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>No image selected</span>
            </div>
          )}
        </div>
      <div>
        <input type="file" onChange={onImageChange} />
      </div>
      </div>
      <div className=" items-start  justify-center gap-7 w-full">
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Name</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={name}
            name="name"
            placeholder="Name"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">isRental</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={isRental}
            name="isRental"
            placeholder="isRental"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">location</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={location}
            name="location"
            placeholder="Location"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Address</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={address}
            name="address"
            placeholder="address"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Category</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={category}
            name="category"
            placeholder="Category"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Description</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={description}
            name="description"
            placeholder="Description"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Price</span>
          <input 
            onChange={onChangeHandler}
            type="number"
            value={price}
            name="price"
            placeholder="Price"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Bed</span>
          <input 
            onChange={onChangeHandler}
            type="number"
            value={bed}
            name="bed"
            placeholder="Bed"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Bathroom</span>
          <input 
            onChange={onChangeHandler}
            type="number"
            value={bathroom}
            name="bathroom"
            placeholder="bathroom"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Area</span>
          <input 
            onChange={onChangeHandler}
            type="number"
            value={area}
            name="area"
            placeholder="Area"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <button className="mt-6 border px-5 py-2 rounded text-white" ><span>Create Listing</span></button>
      </div>
    </form>
    </div>
  )
}

export default CreateListing