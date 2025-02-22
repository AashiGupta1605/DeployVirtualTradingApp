// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import orgReducer from './orgSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    organization: orgReducer,
    auth: authReducer,
  },
});

export default store;