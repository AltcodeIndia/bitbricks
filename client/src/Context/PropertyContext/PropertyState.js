import React, { useEffect , useState } from "react";
import PropertyContext from "./PropertyContext";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
  // new hooks
  useDisconnect,
  useConnectionStatus,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: "b3c45b2c2feeff455157daed3574b114"
});
const PropertyState = (props) => {
  const [userBlance, setUserBlance] = useState();
  const { contract } = useContract(
    "0xF99fAdb5166570250B0BAF2Fd038202f2f820cbD"
  );
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const signer = useSigner();
  const realEstate = "Bitbricks"

  const { mutateAsync: listProperty } = useContractWrite( contract, "listProperty");
  const createPropertyFunction = async(form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await listProperty({
        args: [
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: updateProperty } = useContractWrite(contract, "updateProperty");
  const updatePropertyFunction = async(form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: updatePrice } = useContractWrite(contract, "updatePrice");
  const updatePriceFunction = async(form) => {
    const { productId, price } = form;
    try {
      const data = await updatePrice({ args: [address, productId, ethers.utils.parseEther(price)], });
      console.info("contract upodateprice successs", data);
    } catch (err) {
      console.error("contract updateprice failure", err);
    }
  };

  const { mutateAsync: buyProperty } = useContractWrite(contract, "buyProperty");
  const buyPropertytFunction = async(buying) => {
    const { productId,amount } = buying;
    try {
      const data = await buyProperty({ args: [productId, address], value: ethers.utils.parseEther(amount), });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: addReview } = useContractWrite(contract, "addReview");
  const addReviewFunction = async(form) => {
    const { productID, rating, comment } = form;
    try {
      const data = await addReview({
        args: [productID, rating, comment, address],
      });
      console.info("contract addReviewFunction successs", data);
    } catch (err) {
      console.error("contract addReviewFunction failure", err);
    }
  };

  const { mutateAsync: likeReview } = useContractWrite(contract, "likeReview");
  const likeReviewFunction = async(form) => {
    const { productID, reviewIndex } = form;
    try {
      const data = await likeReview({
        args: [productID, reviewIndex, address],
      });
      console.info("contract likereview successs", data);
    } catch (err) {
      console.error("contract likereview failure", err);
    }
  };

  const getPropertiesData = async() => {
    try
    {
      const properties = await contract.call("getAllProperties");
      const balance = await signer?.getBalance();
      const userBlance = address ? ethers.utils.formatEther(balance?.toString()) : "";
      setUserBlance(userBlance);
      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviewers,
        image: property.images,
        address: property.address,
      }));
      return parsedProperties;
    } catch (error) {
      console.log("Error while loading data", error);
    }
  };

  const { data: getHighestratedReview } = useContractRead(contract, "getHighestratedReview");

  const getProductReviewsFunction = async(productId) =>{
    try{
      const getProductReviews = await contract.call("getProductReviews",[productId,]);
      const  parsedReviews = getProductReviews?.map((review, i)=> ({
      reviewer: review.reviewer,
      likes: review.likes.toNumber(),
      Comment: review.comment,
      rating: review.rating,
      productID: review.productId.toNumber(),
      }));
      return parsedReviews;
    } catch (err){
      console.log("fail getProductReview",err);
    }
  };

  const getPropertyFunction = async(id) => {
    const productID = id * 1;
    try
    {
      const propertyItem = await contract.call("getProperty", [productID]);
      const property = {
        productID: propertyItem?.[0].toNumber(),
        owner: propertyItem?.[1],
        title: propertyItem?.[3],
        category: propertyItem?.[4],
        description: propertyItem?.[7],
        price: ethers.utils.formatEther(propertyItem?.[2].toString()),
        address: propertyItem?.[6],
        images: propertyItem?.[5],
      };
      return property;
    } catch (err)
    {
      console.log("faill single getpropertyfunction", err);
    }
  };

  const getUserPropertiesFunction = async()=>{
    try{
      const properties = await contract.call("getUserProperties",[address]);
      const parsedProperties = properties.map((property,i)=>({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productID: property.productID.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));
      return parsedProperties;
    }catch(err){
      console.log("failled on getUserPropertyfunction", err);
    }
  };

  const getUserReviewsFunction = async() => {
    try
    {
      const getUserReviews= await contract.call("getUserReviews", [address,]);
      return getUserReviews;
    } catch (err)
    {
      console.log("failed on getUserReviews",err)
    }

  };

  const totalPropertyFunction = async() => {
    try
    {
      const totalProperty = await contract.call("propertyIndex");
      return totalProperty;
    } catch (err)
    {
      console.log("error totalproprty index", err);
    }
  };

  const totalReviewsFunction = async() => {
    try
    {
      const totalReviews = await contract.call("reviewsCounter");
      return totalReviews.toNumber();
    } catch(err)
    {
      console.log("failed totalreviewsCount function",err);
      }
  };

  const { data: event } = useContractEvents(contract, "PropertyListed");
  const { data: allEvents } = useContractEvents(contract);
  const { data: eventWithoutListener } = useContractEvents(
    contract,
    undefined,
    { subscribe: false }
  );
  return (
      <PropertyContext.Provider
        value={{
          client,
          address,
          contract,
          connect,
          createPropertyFunction,
          updatePropertyFunction,
          updatePriceFunction,
          buyPropertytFunction,
          // review
          addReviewFunction,
          likeReviewFunction,
          getProductReviewsFunction,
          getPropertyFunction,
          getUserPropertiesFunction,
          getUserReviewsFunction,
          totalPropertyFunction,
          totalReviewsFunction,
          getHighestratedReview,
          // contract datas
          getPropertiesData,
          userBlance,
          disconnect,
        }}
      >
        {props.children}
      </PropertyContext.Provider>
  );
} 
export default PropertyState;