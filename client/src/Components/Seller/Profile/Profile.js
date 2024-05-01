import React, { useContext } from "react";
import { SellerAuthContext } from "../../../Context/Index";
const Profile = () => {
  const { seller } = useContext(SellerAuthContext)
  const { name, email , image } = seller;

  return (
    <div className="flex flex-row gap-7">
        <div className="h-full flex items-center justify-center">
          <div className="w-[224px] h-[271px] bg-[#7065F0] p-4 ">
            <img 
              src={`data:image/jpeg;base64, ${image || ""}`}
              alt="seller_image"
              className="border w-full h-full"
            />
          </div>
        </div>
        <div className="h-[271px] flex items-start flex-col justify-center gap-7 w-full">
          <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Name</span><span className="px-2 text-white h-full w-full border rounded">{name}</span></div>
          <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Email</span><span className="px-2 text-white h-full w-full border rounded">{email}</span></div>
        </div>
    </div>
  )
}

export default Profile