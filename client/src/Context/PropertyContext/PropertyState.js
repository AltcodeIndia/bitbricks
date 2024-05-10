import React, { useReducer } from "react";
import axios from "axios";
import PropertyReducer from "./PropertyReducer";
import PropertyContext from "./PropertyContext";
import {
    GET_ALL_PROPERTIES,
    GET_USER_PROPERTIES,
    GET_PROPERTY_REVIEWS,
    GET_USER_REVIEWS,
    GET_HIGHEST_RATED_PROPERTY,
    BUY_PROPERTY,
    BUY_PROPERTY_FAIL,
    PROPERTY_SOLD,
    PROPERTY_RESOLD,
} from "../types";
const PropertyState = (props) => {
    const initialState = {
        allProperties: [],
        userProperties: [],
        propertyReviews: [],
        userReviews: [],
        highestRatedProperty: null,
        cart: [], // Initialize the cart array
        error: null,
    };
    const [state, dispatch] = useReducer(PropertyReducer, initialState);
    const getAllProperties = async () => {
        try {
          const response = await axios.get("/api/properties");
          dispatch({ type: GET_ALL_PROPERTIES, payload: response.data });
        } catch (error) {
          console.error(error);
        }
    };

  const getUserProperties = async () => {
    // Implement the logic to fetch user properties
  };

  const getPropertyReviews = async (propertyId) => {
    // Implement the logic to fetch property reviews
  };

  const getUserReviews = async () => {
    // Implement the logic to fetch user reviews
  };

  const getHighestRatedProperty = async () => {
    // Implement the logic to fetch the highest rated property
  };

  const buyProperty = async (propertyId) => {
    // Implement the logic to buy a property
  };

  const sellProperty = async (propertyId) => {
    // Implement the logic to sell a property
  };
    return (
        <PropertyContext.Provider
          value={{
            allProperties: state.allProperties,
            userProperties: state.userProperties,
            propertyReviews: state.propertyReviews,
            userReviews: state.userReviews,
            highestRatedProperty: state.highestRatedProperty,
            cart: state.cart,
            error: state.error,
            getAllProperties,
            getUserProperties,
            getPropertyReviews,
            getUserReviews,
            getHighestRatedProperty,
            buyProperty,
            sellProperty,
          }}
        >
          {props.children}
        </PropertyContext.Provider>
      );
} 
export default PropertyState;