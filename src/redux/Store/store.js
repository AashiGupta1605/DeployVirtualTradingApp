// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import adminReducer from '../Admin/AdminSlice';
import commonReducer from '../Common/commonReducer';

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
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export default store;