// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import etfReducer from '../Common/etfSlice';
import adminReducer from '../Admin/AdminSlice';

import { setupListeners } from '@reduxjs/toolkit/query/react';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    organization: organizationReducer,
    stock: etfReducer,
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