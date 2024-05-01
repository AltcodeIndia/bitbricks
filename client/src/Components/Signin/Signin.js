import React , { useState , useEffect , useContext } from 'react'
import { Navbar } from '../LandingPage/PageComponents';
import { NavLink , useNavigate } from 'react-router-dom';

import { SellerAuthContext , UserAuthContext } from '../../Context/Index';

const Signin = () => {
  const redirect = useNavigate();
  const {
    registerSeller,
    sellerError,
    clearSellerErrors,
    isSellerAuthenticated,
  } = useContext(SellerAuthContext);
  const {
    registerUser,
    error,
    clearUserErrors,
    isUserAuthenticated
  } = useContext(UserAuthContext);
  useEffect(() => {
    if (isSellerAuthenticated || isUserAuthenticated ) {
      redirect("/");
    }
    if (sellerError) {
      clearSellerErrors();
    } else if (error) {
      clearUserErrors();
    }
  }, [sellerError, isSellerAuthenticated , error , isUserAuthenticated]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { name , email, password , confirmpassword } = user;
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      window.alert("Enter all fields")
    } else if (password !== confirmpassword) {
      window.alert("Password doesn't match")
    } else {
      try {
        await registerSeller({ name, email, password });
        redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSubmitUserHandler = async(e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      window.alert("Enter all fields")
    } else if (password !== confirmpassword) {
      window.alert("Password doesn't match")
    } else {
      try {
        await registerUser({ name, email, password });
        redirect("/login");
      } catch(error) {
        console.log(error)
      }
    }
  }
  return (
    <div className='w-full h-full'>
        <Navbar />
        <div className='w-full h-full flex items-center justify-center'>
            <div className='bg-[#5245ED]/70 w-1/3 h-fit px-20 py-10 flex flex-col border-2 border-[#EABFFF] gap-7 rounded-b-lg'>
                <div className='w-full flex justify-center'><span className='font-medium text-2xl text-white/90 leading-[150%]'>CREATE ACCOUNT</span></div>
                <div className='w-full flex flex-col gap-4'>
                    <input 
                        type='text'
                        onChange={onChangeHandler}
                        aria-label='Enter Name'
                        value={name}
                        placeholder='Enter Name'
                        name='name'
                        required
                        className="px-4 py-1 rounded-md border h-10  border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                    />
                    <input 
                        type='email'
                        onChange={onChangeHandler}
                        aria-label='Email Address'
                        value={email}
                        placeholder='Email Address'
                        name='email'
                        required
                        className="px-4 py-1 rounded-md border h-10  border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                    />
                    <input 
                      type='password'
                      onChange={onChangeHandler}
                      aria-label='Enter Password'
                      value={password}
                      name='password'
                      placeholder='Enter Password'
                      required
                      className="px-4 py-1 rounded-md border h-10  border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                    />
                    <input 
                      type='password'
                      onChange={onChangeHandler}
                      aria-label='Re-Enter Password'
                      value={confirmpassword}
                      name='confirmpassword'
                      placeholder='Re-Enter Password'
                      required
                      className="px-4 py-1 rounded-md border h-10  border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                    />
                </div>
                <div className='w-full flex flex-row justify-evenly items-center mt-8'>
                  {!isUserAuthenticated ? (
                    <button className='px-5 py-2 bg-white text-black font-medium rounded hover:text-white hover:bg-[#7065F0]' disabled={isUserAuthenticated} filled="true" onClick={onSubmitUserHandler}>Create User</button>
                  ): null}
                  {!isSellerAuthenticated ? (
                    <button className='px-5 py-2 bg-white text-black font-medium rounded hover:text-white hover:bg-[#7065F0]' disabled={isSellerAuthenticated} filled="true" onClick={onSubmitSellerHandler}>Create Seller</button>
                  ) : null}
                </div>
                <div className='flex justify-center'><span>Already have a Account?</span><span className='font-bold ml-1'><NavLink to={"/login"}>Login</NavLink></span></div>
            </div>
        </div>
    </div>
  )
}

export default Signin