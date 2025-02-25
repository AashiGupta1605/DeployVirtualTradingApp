import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import etfReducer from '../Common/etfSlice';

const store = configureStore({
  reducer: {
    user: userReducer,  // Single reducer for all user-related slices
    organization: organizationReducer,
    stock: etfReducer,
  },
});

export default store;
