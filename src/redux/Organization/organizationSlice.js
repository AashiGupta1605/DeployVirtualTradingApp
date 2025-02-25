// src/Organization/organizationReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import organizationAuthReducer from './auth/organizationAuthSlice';
import organizationDashboardReducer from './dashboard/organizationDashboardSlice';
import organizationUsersReducer from './users/organizationUsersSlice';

const organizationReducer = combineReducers({
  auth: organizationAuthReducer,
  dashboard: organizationDashboardReducer,
  users: organizationUsersReducer,
});

export default organizationReducer;