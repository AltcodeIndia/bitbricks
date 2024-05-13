import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { ThirdwebProvider } from "@thirdweb-dev/react";
import { SellerState , UserState , PropertyState } from "./Context/Index.js"
import { createThirdwebClient } from "thirdweb";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export const client = createThirdwebClient({ 
  clientId: "b3c45b2c2feeff455157daed3574b114" 
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider clientId='b3c45b2c2feeff455157daed3574b114' activeChain={PolygonAmoyTestnet}>
        <PropertyState>
          <SellerState>
            <UserState>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </UserState>
          </SellerState>
        </PropertyState>
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
