import React, { useContext } from "react";
import { SellerAuthContext } from "../../../Context/Index";

const Logout = ({onClose}) => {
  const { logoutSeller } = useContext(SellerAuthContext);
  return (
    <div className="w-full h-full absolute flex items-center justify-center bg-[#CBC7FA]/90">
        <div className="bg-[#5245ED]/70 w-1/4 h-fit px-20 py-10 flex flex-col border-2 border-[#EABFFF] gap-7 rounded-b-lg items-center">
            <span className="text-white font-medium text-xl text-center">Are you Sure you want to <span className="text-black">logout?</span></span>
            <div className="w-full flex justify-between mt-10">
                <button className='px-6 py-2 bg-[#2516DF] rounded text-white' onClick={logoutSeller} >Logout</button>
                <button className='px-6 py-2 border-2 border-[#E0DEF7] rounded text-white' onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Logout