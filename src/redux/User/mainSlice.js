import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userprofileSlice';
import feedbackReducer from "./feedbackSlice";
import complaintReducer from './complaintSlice';
import tradingReducer from './trading/tradingSlice';
import forgetpasswordReducer from './forgetPasswordSlice';
import eventsReducer from './events/eventsSlice';

import userSlice from './userSlice';
import subscriptionPlanReducer from './userSubscriptionPlan/userSubscriptionPlansSlice';

const userReducer = combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  users: userSlice,
  subscriptionPlan: subscriptionPlanReducer,
  feedback: feedbackReducer,
  complaint: complaintReducer,
  tradingModal: tradingReducer,
  forgetpassword: forgetpasswordReducer,
  events: eventsReducer,
});

export default userReducer;
