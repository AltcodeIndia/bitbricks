import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { ThirdwebProvider } from "thirdweb/react";
import { SellerState , UserState , PropertyContext} from "./Context/Index.js"
import { BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <SellerState>
        <UserState>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserState>
      </SellerState>
    </ThirdwebProvider>
  </React.StrictMode>
);
