import { configureStore } from '@reduxjs/toolkit';  // Use configureStore from @reduxjs/toolkit
import authReducer from './reducers/authReducer';  // Import your reducers

// Create the store using configureStore which automatically enables Redux DevTools
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add your reducers here
  },
  // No need for composeWithDevTools or applyMiddleware here
});

export default store;
