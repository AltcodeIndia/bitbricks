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

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isSellerAuthenticated: false,
				loading: false,
				token: action.payload.token,
				seller: action.payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("sellerToken", action.payload.token);
			return {
				...state,
				isSellerAuthenticated: false,
				loading: false,
				token: action.payload.token,
				seller: action.payload,
			};
		case USER_LOADED:
			return {
				...state,
				isSellerAuthenticated: true,
				sellerError: null,
				loading: false,
				seller: action.payload.seller,	
			};
			
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem("sellerToken");
			return {
				...state,
				isSellerAuthenticated: false,
				loading: false,
				sellerError: action.payload,
				token: null,
				seller: null,
			};
		case SET_AUTH_REF: 
			return{
				...state,
				isSellerAuthenticated: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				sellerError: null,
			};
		case LIST_PROPERTY:
			return {
			  ...state,
			  properties: [...state.properties, action.payload],
			};
		case LIST_PROPERTY_FAIL:
		return {
		  ...state,
		  error: "Property listing failed",
		};
		case UPDATE_PROPERTY:
		return {
		  ...state,
		  properties: state.properties.map((property) =>
			property.id === action.payload.id ? action.payload : property
		  ),
		};
		case UPDATE_PROPERTY_FAIL:
		return {
		  ...state,
		  error: "Property update failed",
		};
		case UPDATE_PROPERTY_PRICE:
		return {
		  ...state,
		  properties: state.properties.map((property) =>
			property.id === action.payload.id
			  ? { ...property, price: action.payload.price }
			  : property
		  ),
		};
		case UPDATE_PROPERTY_PRICE_FAIL:
		return {
		  ...state,
		  error: "Property price update failed",
		};
		case GET_USER_PROPERTIES:
		return {
		  ...state,
		  properties: action.payload,
		};
		case UPDATE_PROPERTY_IMAGE:
			return {
				...state,
				listing: [...state.listing, action.payload]
			}
		case UPDATE_PROPERTY_FAIL:
			return {
				...state,
				listing: [...state.listing],
			}
		case UPDATE_IMAGE:
			return {
				...state,
				user: action.payload,
			}
		case UPDATE_PROFILE:
		return {
		  ...state,
		  user: action.payload,
		};
        default:
            return state;
    }
}