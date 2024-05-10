import React, { useReducer } from "react";
import axios from "axios";
import UserAuthReducer from "./UserAuthReducer.js";
import UserAuthContext from "./UserAuthContext.js";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_AUTH_REF,
  CLEAR_ERRORS,
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_FAIL,
  GET_INTERESTED_PROPERTIES,
  GET_INTERESTED_PROPERTIES_FAILED
} from "../types.js";
import { setAuthUserToken } from "../../utils/setAuthToken.js";

const UserAuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("userToken"),
    error: null,
    isUserAuthenticated: false,
    loading: true,
    user: null,
    myProperties: null,
  };

  const [state, dispatch] = useReducer(UserAuthReducer, initialState);

  const loadUserIfTokenFound = async () => {
    if(localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
      const config = {
        headers: {
          "Content-Type" : "application/json",
        },
      };
      try {
        const res = await axios.get("http://localhost:8000/api/user/profile", config);
        dispatch ({ type: USER_LOADED, payload: res.data })
      } catch (error) {
        dispatch({ type: AUTH_ERROR })
      }
    }
  }

  const loadUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("http://localhost:8000/api/user", config);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/signup",
        userData,
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
    }
  };

  const loginUser = async (userData) => {
    const { email, password } = userData;
    console.log("Login Details:", { email, password });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Authentication details:", res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch({ type: SET_AUTH_REF, payload: true});
    } catch (error) {
      console.log("Authentication Error:", error.response.data);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const clearUserErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const addPropertyToInterestedProperties = async (id) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:8000/api/property/interestedProperty/${id}`, 
        config
      )
      console.log("addProperty:",res.data)
      dispatch({ type: ADD_TO_CART, payload: res.data });
    } catch (error) {
      dispatch({ type: ADD_TO_CART_FAIL, payload: error.message });
    }
  };
  const removeFromCart = (property) => {
    try {
      dispatch({ type: REMOVE_FROM_CART, payload: property });
    } catch (error) {
      dispatch({ type: REMOVE_FROM_CART_FAIL, payload: error.message })
    }
  };

  const getInterestedProperties = () => async () => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get('http://localhost:8000/api/user/interestedProperty', config);
      dispatch({
        type: GET_INTERESTED_PROPERTIES,
        payload: res.data.InterestedProperties,
      });
    } catch (error) {
      dispatch({ type: GET_INTERESTED_PROPERTIES_FAILED, payload: error.message })
    }
  }

  return (
    <UserAuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isUserAuthenticated: state.isUserAuthenticated,
        loading: state.loading,
        loadUserIfTokenFound,
        registerUser,
        clearUserErrors,
        loadUser,
        loginUser,
        logoutUser,
        addPropertyToInterestedProperties,
        removeFromCart,
        getInterestedProperties
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthState;