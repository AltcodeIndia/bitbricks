import React , { useState , useContext } from 'react'
import { UserAuthContext } from '../../../Context/Index'

const ChangePassword = () => {
  return (
    <div>
    <div className=" flex items-start flex-col justify-center gap-7 w-full">
      <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">Old Password</span>
        <input 
          type="password"
          // value={name}
          label="Password"
          name="your old password"
          placeholder="your old password"
          required
          className="px-2 h-full w-full border rounded outline-none" 
        />
      </div>
      <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">New Password</span>
        <input 
          type="password"
          // value={email}
          label="New Password"
          name="password"
          placeholder="your new password"
          required
          className="px-2 h-full w-full border rounded outline-none" 
        />
      </div>
      <div className="w-full h-16 flex flex-col gap-1"><span className="font-bold">ReEnter Password</span>
      <input 
          type="password"
          // value={email}
          label="New Password"
          name="password"
          placeholder="re-enter password"
          required
          className="px-2 h-full w-full border rounded outline-none" 
        />
      </div>
      <button className="mt-6 border px-5 py-2 rounded text-white" ><span>Update</span></button>
    </div>
  </div>
  )
}

export default ChangePassword