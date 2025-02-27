import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User/mainSlice';
import organizationReducer from '../Organization/organizationSlice';
import etfReducer from '../Common/etfSlice';
import adminReducer from '../Admin/AdminSlice';

const store = configureStore({
reducer: {
user: userReducer,
organization: organizationReducer,
stock: etfReducer,
admin: adminReducer,
},
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
serializableCheck: {
ignoredActions: ['organizationRegistration/register/rejected'],
},
}),
});

// Optional: Add dev tools
if (process.env.NODE_ENV === 'development') {
window.store = store;
}

export default store;