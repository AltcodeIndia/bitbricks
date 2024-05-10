import React, { useContext } from "react";
import ThirdwebContext from "./ThirdwebState";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const ThirdwebContext = createContext();

export const ThirdwebState = ({props}) => {
 const client = createThirdwebClient({ 
    clientId: "b3c45b2c2feeff455157daed3574b114"
 });
 const contract = getContract({ 
   client, 
   chain: defineChain(80002), 
   address: "0xa46F5570c61602529E2cE64d69d379467213bd7E"
   });
  return (
    <ThirdwebContext.Provider
        value={contract}
    >
        {props.children}
    </ThirdwebContext.Provider>
  )
}

export default ThirdwebContext