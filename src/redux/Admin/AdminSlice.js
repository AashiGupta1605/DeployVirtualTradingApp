// src/Admin/adminSlice.js

import { combineReducers } from '@reduxjs/toolkit';
import adminQueryTableReducer from './QueryListPage/QueryTableSllice';
import registeredUsersReducer from "./RegisteredUsersPage/RegisteredUserSlice";
import organizationListReducer from './OrganizationListPage/OrganizationListSlice';

const adminReducer = combineReducers({
  queryTable: adminQueryTableReducer,
  registeredUsersTable: registeredUsersReducer,
  organizationList: organizationListReducer,
});

export default adminReducer;