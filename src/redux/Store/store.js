import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import etfReducer from '../Common/etfSlice';
import adminReducer from '../Admin/AdminSlice';   

const store = configureStore({
  reducer: {
    user: userReducer,  // Single reducer for all user-related slices
    organization: organizationReducer,
    stock: etfReducer,
    admin:adminReducer,
  },
});

export default store;
