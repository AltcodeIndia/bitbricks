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
    ADD_TO_CART,
    ADD_TO_CART_FAIL
  } from "../types";
  
  export default (state, action) => {
    switch (action.type) {
      case GET_ALL_PROPERTIES:
        return {
          ...state,
          allProperties: action.payload,
        };
      case GET_USER_PROPERTIES:
        return {
          ...state,
          userProperties: action.payload,
        };
      case GET_PROPERTY_REVIEWS:
        return {
          ...state,
          propertyReviews: action.payload,
        };
      case GET_USER_REVIEWS:
        return {
          ...state,
          userReviews: action.payload,
        };
      case GET_HIGHEST_RATED_PROPERTY:
        return {
          ...state,
          highestRatedProperty: action.payload,
        };
      case BUY_PROPERTY:
        return {
          ...state,
          // Handle property purchase logic here
        };
      case BUY_PROPERTY_FAIL:
        return {
          ...state,
          error: action.payload,
          // Handle failed property purchase logic here
        };
      case PROPERTY_SOLD:
        return {
          ...state,
          // Handle property sold logic here
        };
      case PROPERTY_RESOLD:
        return {
          ...state,
          // Handle property resold logic here
        };
      case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      default:
        return state;
    }
  };