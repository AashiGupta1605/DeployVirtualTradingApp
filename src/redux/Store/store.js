// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/userSlice';
import orgReducer from '../Organization/orgSlice';
import authReducer from '../User/authSlice';
import adminReducer from '../Admin/AdminSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    organization: orgReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;