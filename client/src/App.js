import React , { useState , useEffect , useContext } from 'react';
import { Routes, Route , useLocation } from "react-router-dom";
import { LandingPage , Login , Signin , Seller , User , CategoryPage , Cart } from './Components';
import { Loading , NotFound } from './Components/UI';

import PropertyList from './Components/LandingPage/PageComponents/Property/PropertyList';
import PropertyDetails from './Components/LandingPage/PageComponents/Property/PropertyDetails.js';

import './App.css';

import { SellerAuthContext } from './Context/Index.js';
import { setAuthSellerToken , setAuthUserToken } from "./utils/setAuthToken.js"
import { SellerPrivateRoute , UserPrivateRoute } from "./PrivateRoutes"


if (localStorage.sellerToken) {
  setAuthSellerToken(localStorage.sellerToken);
}
if (localStorage.userToken) {
  setAuthUserToken(localStorage.userToken)
}


function App() {
  const { loadSellerIfTokenFound } = useContext(SellerAuthContext);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1800);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-gradient-to-b from-[#A8A2F6] to-transparent w-full h-screen font-[Plus Jakarta Sans]">
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/seller/dashboard' element={<SellerPrivateRoute><Seller /></SellerPrivateRoute>} />
              <Route path='/user/dashboard' element={<UserPrivateRoute><User /></UserPrivateRoute>} />
              <Route path='/category' element={<CategoryPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              {PropertyList.map((property) => (
                <Route
                  key={property.id}
                  path={`/properties/${property.id}`}
                  element={<PropertyDetails property={property} />}
                />
              ))}
            </Routes>
          </div>
        </>
      ) }
    </>
  );
}

export default App;
