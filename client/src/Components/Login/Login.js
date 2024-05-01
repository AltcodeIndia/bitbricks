import React , { useState , useEffect , useContext }from 'react'
import { Navbar } from '../LandingPage/PageComponents'
import { NavLink , useNavigate } from 'react-router-dom';
import { SellerAuthContext , UserAuthContext } from '../../Context/Index';

const Login = () => {
  const redirect = useNavigate();
  const { loginSeller, sellerError, clearSellerErrors, isSellerAuthenticated } = useContext(SellerAuthContext);
  const { loginUser, error , clearUserErrors , isUserAuthenticated } = useContext(UserAuthContext)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isSellerAuthenticated || isUserAuthenticated) {
      redirect("/");
    }
    if (sellerError) {
      clearSellerErrors();
    } else if (error) {
      clearUserErrors();
    }
    //eslint-disable-next-line
  }, [sellerError , error , isSellerAuthenticated , isUserAuthenticated]);
  const { email, password } = user;
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      window.alert('Enter all fields');
    } else {
      try {
        await loginSeller({ email, password });
        redirect('/');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSubmitUserHandler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      window.alert('Enter all fields');
    } else {
      try {
        await loginUser({ email, password });
        redirect("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='w-full h-full'>
        <Navbar />
        <div className='w-full h-full flex items-center justify-center'>
            <div className='bg-[#5245ED]/70 w-1/3 h-fit px-20 py-10 flex flex-col border-2 border-[#EABFFF] gap-7 rounded-b-lg'>
                <div className='w-full flex justify-center'><span className='font-medium text-2xl text-white/90'>LOG IN</span></div>
                <div className='w-full flex flex-col gap-4'>
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
                      value={password}
                      name='password'
                      placeholder='Enter Password'
                      required
                      className="px-4 py-1 rounded-md border h-10  border-[#7065F0] focus:outline-none focus:ring-2 focus:ring-[#7065F0]"
                    />
                </div>
                <div className='w-full flex flex-row justify-evenly items-center mt-8'>
                  {!isUserAuthenticated ? (
                    <button className='px-5 py-2 bg-white text-black font-medium rounded hover:text-white hover:bg-[#7065F0]' disabled={isUserAuthenticated} filled="true" onClick={onSubmitUserHandler}>User login</button>
                  ): null}
                  {!isSellerAuthenticated ? (
                    <button className='px-5 py-2 bg-white text-black font-medium rounded hover:text-white hover:bg-[#7065F0]' onClick={onSubmitSellerHandler} disabled={isSellerAuthenticated} filled="true">Seller login</button>
                  ) : null }
                </div>
                <div className='flex justify-center'><span>Don't have a Account?</span><span className='font-bold ml-1'><NavLink to={"/signin"}>Sign up</NavLink></span></div>
            </div>
        </div>
    </div>
  )
}

export default Login