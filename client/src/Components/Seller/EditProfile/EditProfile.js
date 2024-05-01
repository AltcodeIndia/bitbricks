import React, { useContext, useState } from "react";
import { SellerAuthContext } from "../../../Context/Index";

const EditProfile = () => {
  const { updateImage, updateProfile } = useContext(SellerAuthContext);
  const [user, setUser] = useState({ name: "", email: "" });
  const { name, email } = user;
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImgPreview(URL.createObjectURL(file));
    setImg(file);
  };
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onImageUpdateHandler = (e) => {
    e.preventDefault();
    const dataArray = new FormData();
    dataArray.append("image", img, img.name);
    updateImage(dataArray);
  };

  const onUpdateProfileHandler = (e) => {
    e.preventDefault();
    updateProfile(user);
  };
  return (
    <div className="flex flex-row gap-7">
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
        <button className="mt-6 border px-5 py-2 rounded text-white" onClick={onImageUpdateHandler}><span>Upload Image</span></button>
      </div>
      <div className="h-[271px] flex items-start flex-col justify-center gap-7 w-full">
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Name</span>
          <input 
            onChange={onChangeHandler}
            type="name"
            value={name}
            label="Name"
            name="name"
            placeholder="Name"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Email</span>
          <input 
            onChange={onChangeHandler}
            type="email"
            value={email}
            label="Email Address"
            name="email"
            placeholder="Email Address"
            required
            className="px-2 h-full w-full border rounded outline-none" 
          />
        </div>
        <button className="mt-6 border px-5 py-2 rounded text-white" onClick={onUpdateProfileHandler}><span>Update</span></button>
      </div>
    </div>
  )
}

export default EditProfile