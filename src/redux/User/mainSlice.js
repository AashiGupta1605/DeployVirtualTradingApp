import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userprofileSlice';
import feedbackReducer from "./feedbackSlice";
import feedbackModalReducer from './feedbackModalSlice';

import userSlice from './userSlice';

const userReducer = combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  users: userSlice,
  feedback: feedbackReducer,
  feedbackModal: feedbackModalReducer,
});

export default userReducer;
