import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userprofileSlice';
import userSlice from './userSlice';

const userReducer = combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  users: userSlice,
});

export default userReducer;
