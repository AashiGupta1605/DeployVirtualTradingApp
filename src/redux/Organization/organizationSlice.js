// src/Organization/organizationReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import organizationAuthReducer from './auth/organizationAuthSlice';
import organizationDashboardReducer from './dashboard/organizationDashboardSlice';
import organizationUsersReducer from './users/organizationUsersSlice';
import organizationUsersFeedbacksReducer from "./feedbacks/organizationUsersFeedbackSlice";
const organizationReducer = combineReducers({
  auth: organizationAuthReducer,
  dashboard: organizationDashboardReducer,
  users: organizationUsersReducer,
  feedbacks:organizationUsersFeedbacksReducer
});

export default organizationReducer;