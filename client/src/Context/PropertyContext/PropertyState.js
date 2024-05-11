import React, { useEffect } from "react";
import PropertyContext from "./PropertyContext";
import { 
  useAddress,
  useContract,
  ConnectWallet,
  useContractWrite,
  useContractRead,
  useContractEvents
} from "@thirdweb-dev/react"
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ethers } from "ethers";
//

const PropertyState = (props) => {
  const client = createThirdwebClient({ 
    clientId: "b3c45b2c2feeff455157daed3574b114"
   });
  
  const { contract } = getContract({ 
    client, 
    chain: defineChain(80002), 
    address: "0xF99fAdb5166570250B0BAF2Fd038202f2f820cbD"
  });
  const address = useAddress();
  const connect = ConnectWallet();
  const realEstate = "Bitbricks"
  return (
      <PropertyContext.Provider
        value={{
          contract,
          address,
          connect,
          realEstate
        }}
      >
        {props.children}
      </PropertyContext.Provider>
  );
} 
export default PropertyState;