import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userprofileSlice';
import feedbackReducer from "./feedbackSlice";
import feedbackModalReducer from './feedbackModalSlice';
import tradingReducer from './trading/tradingSlice';

import userSlice from './userSlice';
import subscriptionPlanReducer from './userSubscriptionPlan/userSubscriptionPlansSlice';

const userReducer = combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  users: userSlice,
  subscriptionPlan: subscriptionPlanReducer,
  feedback: feedbackReducer,
  feedbackModal: feedbackModalReducer,
  tradingModal: tradingReducer,
});

export default userReducer;
