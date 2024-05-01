import React, { useContext , useState } from 'react'
import { NavLink , useNavigate} from "react-router-dom"
import { Logo } from '../../../UI'
import { SellerAuthContext , UserAuthContext } from '../../../../Context/Index.js'
import Dropdown from "./Dropdown.js"

const Navbar = () => {
  const redirect = useNavigate();
  const { isSellerAuthenticated , logoutSeller } = useContext(SellerAuthContext);
  const { isUserAuthenticated , logoutUser } = useContext(UserAuthContext);
  const authenticated = isSellerAuthenticated || isUserAuthenticated;
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const logoutHandler = () => {
    if (isSellerAuthenticated) {
      logoutSeller();
    } else {
        logoutUser();
    }
    redirect("/login");
  };
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className='w-full h-24 flex items-center justify-between px-14 bg-white/40 rounded-sm'>
        <div className='font-medium text-[#000929] w-2/4 flex flex-nowrap items-center'>
            <div className='flex items-center'><NavLink to={"/"}><Logo /></NavLink></div>
            <div className='w-full flex flex-nowrap items-center'>
                <ul className='flex items-baseline justify-evenly w-full'>
                    <li><NavLink to={"/"} className="font-medium leading-[150%]">Rent</NavLink></li>
                    <li><NavLink to={"/"} className="font-medium leading-[150%]">Buy</NavLink></li>
                    <li><NavLink to={"/"} className="font-medium leading-[150%]">Sell</NavLink></li>
                    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <NavLink to={"/"} className="font-medium leading-[150%]">
                            Explore
                            {dropdown && <Dropdown />}
                        </NavLink>
                    </li>
                    <li><NavLink to={"/"} className="font-medium leading-[150%]">Resources</NavLink></li>
                </ul>
            </div>
        </div>
        <div className='font-medium text-[#000929] gap-5 flex'>
            {!authenticated && (
                <>
                    <button className='px-6 py-2 border-2 border-[#E0DEF7] rounded'><NavLink to={"/login"}>Login</NavLink></button>
                    <button className='px-6 py-2 text-white bg-[#7065F0] rounded'><NavLink to={"/signin"}>Sign up</NavLink></button>
                </>
            )}
            {authenticated && (
                <>
                    <button className='px-6 py-2 border-2 border-[#E0DEF7] rounded' onClick={logoutHandler}><NavLink>Logout</NavLink></button>
                    <NavLink to={isSellerAuthenticated ? "/seller/dashboard" : "/user/dashboard"} className='flex items-center'><div><img src='/Navbar/profile.svg' alt='profile'/></div></NavLink>
                </>
            )}
        </div>
    </div>
  )
}

export default Navbar