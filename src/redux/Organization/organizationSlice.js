// src/Organization/organizationReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import organizationAuthReducer from './auth/organizationAuthSlice';
import organizationDashboardReducer from './dashboard/organizationDashboardSlice';
import organizationUsersReducer from './users/organizationUsersSlice';
import organizationUsersFeedbacksReducer from "./feedbacks/organizationUsersFeedbackSlice";
import organizationAuthSlicereducer from "./count/CardStatCountSlice"
const organizationReducer = combineReducers({
  auth: organizationAuthReducer,
  dashboard: organizationDashboardReducer,
  users: organizationUsersReducer,
  feedbacks:organizationUsersFeedbacksReducer,
  organization:organizationAuthSlicereducer
});

export default organizationReducer;