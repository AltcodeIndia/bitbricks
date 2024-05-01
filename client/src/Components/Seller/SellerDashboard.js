import React , { useReducer, useState } from 'react'
import { Navbar } from '../LandingPage/PageComponents'
import { Profile , EditProfile , ChangePassword , CreateListing , MyListings , Logout } from "./"

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "profile":
			return {
				...state,
				asideSection: "profile",
			};
		case "editProfile":
			return {
				...state,
				asideSection: "editProfile",
			};
    case "changePassword":
      return {
        ...state,
        asideSection: "changePassword",
      }
    case "createListing":
      return {
        ...state,
        asideSection: "createListing",
      }
    case "myListing":
      return {
        ...state,
        asideSection: "myListing",
      }
    default:
      return {
        ...state,
      };
  }
}
const initialState = { asideSection: "profile" };
const SellerDashboard = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [show, setShow] = useState(false);
  const showHandler = () => {
		setShow(true);
	};
  const hideHandler = () => {
		setShow(false);
	};
  return (
    <>
      {show && <Logout onClose={hideHandler}/>}
      <div className='w-full h-screen'>
        <Navbar />
        <div className='w-full flex flex-row h-full items-center gap-3'>
          <div className='w-[29vh] h-[70vh] bg-[#7065F0] rounded-r-lg flex flex-col justify-evenly px-4'>
              <div 
                onClick={() => dispatch({ type:"profile"})}
                className={`w-full flex cursor-pointer ${state.asideSection === "profile" ? 'underline font-medium text-white' : ''}`}
              >Your Profile</div>
              <div 
                onClick={() => dispatch({ type:"editProfile"})}
                className={`w-full flex cursor-pointer ${state.asideSection === "editProfile" ? 'underline font-medium text-white' : ''}`}
              >Edit Profile</div>
              <div 
                onClick={() => dispatch({ type:"changePassword"})}
                className={`w-full flex cursor-pointer ${state.asideSection === "changePassword" ? 'underline font-medium text-white' : ''}`}
              >Change Password</div>
              <div 
                onClick={() => dispatch({ type:"myListing"})}
                className={`w-full flex cursor-pointer ${state.asideSection === "myListing" ? 'underline font-medium text-white' : ''}`}
              >My Listings</div>
              <div 
                onClick={() => dispatch({ type:"createListing"})}
                className={`w-full flex cursor-pointer ${state.asideSection === "createListing" ? 'underline font-medium text-white' : ''}`}
              >Create Listing</div>
              <div 
                onClick={() => showHandler()}
                className={`w-full flex cursor-pointer ${state.asideSection === "logout" ? 'underline font-medium text-white' : ''}`}
              >Logout</div>
          </div>
          <div className='w-full h-[70vh] flex justify-center items-center'>
            <div className='bg-[#5245ED]/70 w-2/3  h-fit px-20 py-10 flex flex-col border-2 border-[#EABFFF] gap-7 rounded-b-lg'>
            {
              (state.asideSection === "profile" && <Profile />) ||
              (state.asideSection === "editProfile" && <EditProfile />) ||
              (state.asideSection === "changePassword" && <ChangePassword />) ||
              (state.asideSection === "myListing" && <MyListings />) ||
              (state.asideSection === "createListing" && <CreateListing />)
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellerDashboard