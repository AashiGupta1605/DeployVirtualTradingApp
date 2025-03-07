// src/redux/Common/commonReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import etfReducer from './etfSlice';
import nifty50Reducer from './nifty50Slice';
import nifty500Reducer from './nifty500Slice';

const commonReducer = combineReducers({
  etf: etfReducer,
  nifty50: nifty50Reducer,
  nifty500: nifty500Reducer
});

export default commonReducer;