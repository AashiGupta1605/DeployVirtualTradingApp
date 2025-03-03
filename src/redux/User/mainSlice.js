import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userprofileSlice';
import userSlice from './userSlice';
import subscriptionPlanReducer from './userSubscriptionPlan/userSubscriptionPlansSlice';

const userReducer = combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  users: userSlice,
  subscriptionPlan: subscriptionPlanReducer,
});

export default userReducer;
