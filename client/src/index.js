import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { ThirdwebProvider } from "thirdweb/react";
import { SellerState , UserState , PropertyState , ThirdwebState } from "./Context/Index.js"
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <ThirdwebState>
        <SellerState>
          <UserState>
            <PropertyState>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PropertyState>
          </UserState>
        </SellerState>
      </ThirdwebState>
    </ThirdwebProvider>
  </React.StrictMode>
);
