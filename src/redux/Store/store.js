import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-hot-toast'; // Import toast
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import adminReducer from '../Admin/AdminSlice';
import commonReducer from '../Common/commonReducer';

// Custom middleware for handling API errors
const errorMiddleware = () => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    // Normalize error message
    const errorMessage = (() => {
      // If payload is an error object
      if (action.payload instanceof Error) {
        return action.payload.message;
      }
      
      // If payload is an object with a message
      if (typeof action.payload === 'object' && action.payload !== null) {
        return action.payload.message || JSON.stringify(action.payload);
      }
      
      // If payload is a string
      if (typeof action.payload === 'string') {
        return action.payload;
      }
      
      // Fallback to generic error
      return 'An unknown error occurred';
    })();

    // More specific error handling
    if (errorMessage.toLowerCase().includes('symbol') || 
        errorMessage.includes('[object Object]')) {
      toast.error('Invalid company symbol', {
        position: 'top-right',
        duration: 3000
      });
    } else {
      console.error('API Error:', errorMessage);
      toast.error(errorMessage, {
        position: 'top-right',
        duration: 3000
      });
    }
  }
  return next(action);
};

// Enhanced error logging middleware
const loggingMiddleware = () => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    console.group('Redux Error');
    console.error('Action Type:', action.type);
    console.error('Payload:', action.payload);
    console.groupEnd();
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    organization: organizationReducer,
    common: commonReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'organizationRegistration/register/rejected',
          'feedbackTable/updateFeedbackStatus/rejected',
          'trading/placeOrder/rejected'
        ],
      },
    }).concat(
      errorMiddleware, 
      loggingMiddleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export default store;