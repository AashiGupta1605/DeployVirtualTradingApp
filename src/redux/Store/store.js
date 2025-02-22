// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import orgReducer from '../Organization/orgSlice';
import authReducer from '../User/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    organization: orgReducer,
    auth: authReducer,
  },
});

export default store;