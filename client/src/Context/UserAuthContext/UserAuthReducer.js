import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    SET_AUTH_REF,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    BUY_PROPERTY,
    BUY_PROPERTY_FAIL,
    PROPERTY_SOLD,
    PROPERTY_RESOLD,
    ADD_TO_CART,
    ADD_TO_CART_FAIL,
    REMOVE_FROM_CART,
    REMOVE_FROM_CART_FAIL,
    UPDATE_IMAGE,
    UPDATE_PROFILE,
    GET_INTERESTED_PROPERTIES,
    GET_INTERESTED_PROPERTIES_FAILED
  } from "../types";
  
  export default (state, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isUserAuthenticated: false,
          loading: false,
          token: action.payload.token,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
        localStorage.setItem("userToken", action.payload.token);
        return {
          ...state,
          isUserAuthenticated: true,
          loading: false,
          token: action.payload.token,
          user: action.payload,
        };
      case USER_LOADED:
        return {
          ...state,
          isUserAuthenticated: true,
          error: null,
          loading: false,
          user: action.payload,
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case AUTH_ERROR:
        localStorage.removeItem("userToken");
        return {
          ...state,
          isUserAuthenticated: false,
          loading: false,
          error: action.payload,
          token: null,
          user: null,
        };
      case SET_AUTH_REF: 
        return{
            ...state,
            isUserAuthenticated: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
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
          if (action.payload && typeof action.payload === 'object') {
            return {
              ...state,
              cart: [...state.cart, action.payload],
            };
          } else {
            return state; // Return the current state if action.payload is not an object
          }
      case ADD_TO_CART_FAIL:
        return {
          ...state,
          error: action.payload
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        }
      case REMOVE_FROM_CART_FAIL:
        return {
          ...state,
          error: action.payload
        }
      case GET_INTERESTED_PROPERTIES:
        return {
          ...state,
          interestedProperties: action.payload,
        };
      case GET_INTERESTED_PROPERTIES_FAILED:
        return {
          ...state,
          error: action.payload
        }
      default:
        return state;
    }
  };