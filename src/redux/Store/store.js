import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/mainSlice';
import orgReducer from '../Organization/orgSlice';
import etfReducer from '../Common/etfSlice';

const store = configureStore({
  reducer: {
    user: userReducer,  // Single reducer for all user-related slices
    organization: orgReducer,
    stock: etfReducer,
  },
});

export default store;
