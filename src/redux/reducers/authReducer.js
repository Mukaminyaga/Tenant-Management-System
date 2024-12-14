// src/redux/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    user: {},
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case "SIGN_IN":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "SIGN_OUT":
        return {
          ...state,
          isAuthenticated: false,
          user: {},
        };
      default:
        return state;
    }
  }
  