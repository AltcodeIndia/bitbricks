import React, { useReducer , useContext} from "react";
import axios from "axios";
import SellerAuthReducer from "./SellerAuthReducer.js";
import SellerAuthContext from "./SellerAuthContext.js";
import { setAuthSellerToken } from "../../utils/setAuthToken";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
	SET_AUTH_REF,
	LIST_PROPERTY,
	LIST_PROPERTY_FAIL,
	UPDATE_PROPERTY,
	UPDATE_PROPERTY_FAIL,
	UPDATE_PROPERTY_IMAGE,
	UPDATE_PROPERTY_IMAGE_FAIL,
	UPDATE_PROPERTY_PRICE,
	UPDATE_PROPERTY_PRICE_FAIL,
	GET_USER_PROPERTIES,
	UPDATE_IMAGE,
	UPDATE_PROFILE,
} from "../types.js"
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const SellerAuthState = (props) => {
    const initialState = {
		token: localStorage.getItem("sellerToken"),
		sellerError: null,
		isSellerAuthenticated: false,
		loading: true,
		seller: null,
		propertiesReadytobebought : [],
		properties: []
	};
    const [state, dispatch] = useReducer(SellerAuthReducer, initialState);
	const client = createThirdwebClient({ 
		clientId: "b3c45b2c2feeff455157daed3574b114"
	   });
	const contract = getContract({ 
		client, 
		chain: defineChain(80002), 
		address: "0xa46F5570c61602529E2cE64d69d379467213bd7E"
	  });
	  
	const loadSellerIfTokenFound = async () => {
		if (localStorage.sellerToken) {
			setAuthSellerToken(localStorage.sellerToken);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			try {
				const res = await axios.get(
					"http://localhost:8000/api/seller/profile",
					config,
				);
				dispatch({ type: USER_LOADED, payload: res.data });
			} catch (error) {
				dispatch({ type: AUTH_ERROR });
			}
		} else {
			return;
		}
	};
	const loadSeller = async () => {
		const config = {
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		try {
		  const res = await axios.get("http://localhost:8000/api/seller", config);
		  dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
		  dispatch({ type: AUTH_ERROR });
		}
	  };

    const registerSeller = async (userData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post(
				"http://localhost:8000/api/seller/signup",
				userData,
				config,
			);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			// loadSeller();
		} catch (error) {
			// console.log(error);
			dispatch({ type: REGISTER_FAIL, payload: error.message });
		}
	};
	const loginSeller = async (userData) => {
		const { email, password } = userData;
		console.log("Login Details:", { email, password });
	  
		try {
		  const res = await axios.post(
			"http://localhost:8000/api/seller/login",
			{ email, password },
			{
			  headers: {
				"Content-Type": "application/json",
			  },
			}
		  );
		  localStorage.setItem("sellerToken", res.data.token);
		  console.log("Authetication details:", res.data)
		  dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		  dispatch({ type: SET_AUTH_REF, payload: true});
		} catch (error) {
		  console.log("Authentication Error:", error.response.data);
		  dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
		}
	  };
    const logoutSeller = () => {
		dispatch({ type: LOGOUT });
		dispatch({ type: SET_AUTH_REF , payload: false});
	};
	const clearSellerErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};
	const addProperty = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
		  const res = await axios.post(
			"http://localhost:8000/api/property", 
			formData,
			config
		);
		  console.log("Response data:", res.data);
		  dispatch({ type: LIST_PROPERTY, payload: res.data });
		} catch (error) {
		  console.log("Error response data:", error.response.data); 
		  dispatch({ type: LIST_PROPERTY_FAIL, payload: error.message });
		}
	  };
	const addPropertyImages = async(image, seller, id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const data = { image, seller };
		try{
			const res = await axios.post(
				`http://localhost:8000/api/property/${id}`,
				data,
				config
			)
			console.log("Image Added successfully")
			dispatch({ type: UPDATE_PROPERTY_IMAGE, payload: res.data })
		}catch(error) {
			dispatch({ type: UPDATE_PROPERTY_IMAGE_FAIL, payload: error.message })
		}
	}
	const getSellerListing = async() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get(`/api/property`, config);
			dispatch({ type: GET_USER_PROPERTIES, payload: res.data.sellerListings })
		} catch(error) {
			console.log(error)
		}
	}
	const authenticateSeller = async (email, password) => {
		try {
		  const response = await axios.post('http://localhost:8000/api/seller/authenticate', { email, password });
		  // Handle successful authentication
		  return response.data; // Assuming the server sends back some data upon successful authentication
		} catch (error) {
		  // Handle authentication error
		  throw error;
		}
	  };	  
	  const updateImage = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(
				`http://localhost:8000/api/seller/profile/image`,
				formData,
				config,
			);
			dispatch({ type: UPDATE_IMAGE });
		} catch (error) {
			console.log(error);
		}
	};
	const updateProfile = async (user) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(`http://localhost:8000/api/seller/profile`, user, config);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <SellerAuthContext.Provider
            value={{
                token: null,
				seller: state.seller,
				sellerError: state.sellerError,
				isSellerAuthenticated: state.isSellerAuthenticated,
				loading: state.loading,
				properties: state.properties,
				contract,
				loadSellerIfTokenFound,
                registerSeller,
				clearSellerErrors,
				loadSeller,
				loginSeller,
				logoutSeller,
				addProperty,
				addPropertyImages,
				getSellerListing,
				updateImage,
				updateProfile,
				authenticateSeller,
            }}
        >
            {props.children}
        </SellerAuthContext.Provider>
    )
}

export default SellerAuthState;