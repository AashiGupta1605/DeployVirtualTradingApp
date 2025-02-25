// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import organizationReducer from '../Organization/organizationSlice';
import authReducer from '../User/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
    auth: authReducer,
  },
});

export default store;