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
  CLEAR_ERRORS,
} from "../types.js";

const UserAuthState = (props) => {
  const initialState = {
    token: null,
    error: null,
    isUserAuthenticated: false,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(UserAuthReducer, initialState);

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

  return (
    <UserAuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isUserAuthenticated: state.isUserAuthenticated,
        loading: state.loading,
        registerUser,
        clearUserErrors,
        loadUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthState;