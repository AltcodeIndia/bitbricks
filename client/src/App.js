import React , { useState , useEffect , useContext } from 'react';
import { Routes, Route  } from "react-router-dom";
import { LandingPage , Login , Signin , Seller , User , CategoryPage , Cart } from './Components';
import { Loading , NotFound } from './Components/UI';
import axios from 'axios'


import PropertyDetails from './Components/LandingPage/PageComponents/Property/PropertyDetails.js';

import './App.css';

import { SellerAuthContext } from './Context/Index.js';
import { setAuthSellerToken , setAuthUserToken } from "./utils/setAuthToken.js"
import { SellerPrivateRoute , UserPrivateRoute } from "./PrivateRoutes"

function App() {
  const { isSellerAuthenticated } = useContext(SellerAuthContext);
  if(isSellerAuthenticated) {
    setAuthSellerToken(localStorage.sellerToken)
  } else {
    setAuthUserToken(localStorage.userToken)
  }
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1800);
  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/property')
      .then(response => {
        setPropertyData(response.data.property);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, []);

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
              {propertyData.map(property => (
                <Route
                  key={property._id}
                  path={`/properties/${property._id}`}
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
