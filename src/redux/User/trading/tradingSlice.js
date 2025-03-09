// src/redux/trading/tradingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async Thunks
export const placeOrder = createAsyncThunk(
  'trading/placeOrder',
  async ({ 
    userId, 
    subscriptionPlanId, 
    companyId,
    companySymbol,
    type, 
    numberOfShares, 
    price 
  }, { rejectWithValue }) => {
    try {
      const endpoint = `${BASE_API_URL}/user/trading/${type}`;
      const response = await axios.post(endpoint, {
        userId,
        subscriptionPlanId,
        companyId,
        companySymbol,
        numberOfShares,
        price
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  'trading/fetchHistory',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/trading/history/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
  }
);

// Initial State
const initialState = {
  transactions: [],
  loading: false,
  error: null,
  orderStatus: null,
  transactions: [],
  holdings: {},
  statistics: {
    totalInvestment: 0,
    totalReturns: 0,
    profitLoss: 0,
    successRate: 0
  }
};

// Helpers
const calculateStatistics = (transactions) => {
  const stats = transactions.reduce((acc, transaction) => {
    const amount = transaction.numberOfShares * transaction.price;
    
    if (transaction.type === 'buy') {
      acc.totalInvestment += amount;
    } else {
      acc.totalReturns += amount;
    }
    
    return acc;
  }, {
    totalInvestment: 0,
    totalReturns: 0
  });

  return {
    ...stats,
    profitLoss: stats.totalReturns - stats.totalInvestment,
    successRate: stats.totalReturns > stats.totalInvestment ? 
      ((stats.totalReturns - stats.totalInvestment) / stats.totalInvestment) * 100 : 0
  };
};

const calculateHoldings = (transactions) => {
  return transactions.reduce((holdings, transaction) => {
    const { companySymbol, numberOfShares, type } = transaction;
    
    if (!holdings[companySymbol]) {
      holdings[companySymbol] = 0;
    }
    
    holdings[companySymbol] += type === 'buy' ? numberOfShares : -numberOfShares;
    return holdings;
  }, {});
};

// Slice
const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    clearOrderStatus: (state) => {
      state.orderStatus = null;
      state.error = null;
    },
    updateStatistics: (state) => {
      state.statistics = calculateStatistics(state.transactions);
    },
    updateHoldings: (state) => {
      state.holdings = calculateHoldings(state.transactions);
    }
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderStatus = 'pending';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatus = 'success';
        state.transactions.unshift(action.payload.transaction);
        state.holdings = calculateHoldings(state.transactions);
        state.statistics = calculateStatistics(state.transactions);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orderStatus = 'failed';
      })
      // Fetch Transaction History
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.holdings = calculateHoldings(action.payload);
        state.statistics = calculateStatistics(action.payload);
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectTradingState = (state) => state.user.tradingModal;
export const selectTransactions = (state) => state.user.tradingModal.transactions;
export const selectHoldings = (state) => state.user.tradingModal.holdings;
export const selectStatistics = (state) => state.user.tradingModal.statistics;
export const selectLoadingState = (state) => ({
  loading: state.user.tradingModal.loading,
  orderStatus: state.user.tradingModal.orderStatus
});

export const { clearOrderStatus, updateStatistics, updateHoldings } = tradingSlice.actions;
export default tradingSlice.reducer;