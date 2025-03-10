// tradingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Helper Functions
const calculateAnalytics = (transactions = [], holdings = [], currentPrice = 0) => {
  if (!transactions.length) {
    return {
      totalInvestment: 0,
      currentHoldingsValue: 0,
      realizedPL: 0,
      realizedPLPercentage: 0,
      buyTrades: 0,
      sellTrades: 0,
      successRate: 0,
      totalHoldingsValue: 0
    };
  }

  try {
    const buyTransactions = transactions.filter(t => t.type === 'buy');
    const sellTransactions = transactions.filter(t => t.type === 'sell');

    // Calculate total investment from current holdings
    const totalInvestment = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * holding.averageBuyPrice), 0);

    // Calculate total holdings value
    const totalHoldingsValue = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * (currentPrice || holding.averageBuyPrice)), 0);

    // Calculate realized P&L from completed trades
    const realizedPL = sellTransactions.reduce((sum, trade) => {
      const buyPrice = buyTransactions.find(bt => bt.companySymbol === trade.companySymbol)?.price || 0;
      return sum + ((trade.price - buyPrice) * trade.numberOfShares);
    }, 0);

    // Calculate current holdings value
    const currentHoldingsValue = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * currentPrice), 0);

    // Calculate success rate
    const successfulTrades = sellTransactions.filter(trade => {
      const buyPrice = buyTransactions.find(bt => bt.companySymbol === trade.companySymbol)?.price || 0;
      return trade.price > buyPrice;
    }).length;

    const successRate = sellTransactions.length > 0
      ? (successfulTrades / sellTransactions.length) * 100
      : 0;

    return {
      totalInvestment,
      currentHoldingsValue,
      realizedPL,
      realizedPLPercentage: totalInvestment > 0 
        ? (realizedPL / totalInvestment) * 100 
        : 0,
      buyTrades: buyTransactions.length,
      sellTrades: sellTransactions.length,
      successRate,
      totalHoldingsValue
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return {
      totalInvestment: 0,
      currentHoldingsValue: 0,
      realizedPL: 0,
      realizedPLPercentage: 0,
      buyTrades: 0,
      sellTrades: 0,
      successRate: 0,
      totalHoldingsValue: 0
    };
  }
};

// Initial State
const initialState = {
  transactions: [],
  holdings: [],
  loading: false,
  error: null,
  orderStatus: null,
  statistics: {
    totalInvestment: 0,
    currentHoldingsValue: 0,
    realizedPL: 0,
    realizedPLPercentage: 0,
    buyTrades: 0,
    sellTrades: 0,
    successRate: 0,
    totalHoldingsValue: 0
  }
};

// Async Thunks
export const fetchHoldings = createAsyncThunk(
  'trading/fetchHoldings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/trading/holdings/${userId}`);
      return response.data.holdings || [];
    } catch (error) {
      // return rejectWithValue('Failed to fetch holdings');
    }
  }
);

export const placeOrder = createAsyncThunk(
  'trading/placeOrder',
  async ({ 
    userId, 
    subscriptionPlanId,
    symbol, 
    type,
    numberOfShares, 
    price,
    orderType = 'market',
    total
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/trading/trade`,
        {
          userId,
          subscriptionPlanId,
          companySymbol: symbol,
          type,
          numberOfShares,
          price,
          orderType,
          total
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return {
        transaction: response.data.transaction,
        holdings: response.data.holdings || [],
        holding: response.data.holding,
        balance: response.data.balance,
        currentPrice: price
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Failed to place order',
        error: error.message,
        orderType: type,
        symbol,
        quantity: numberOfShares,
        price
      });
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  'trading/fetchHistory',
  async ({ userId, subscriptionPlanId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/trading/history/${userId}`);
      return {
        transactions: response.data.transactions || [],
        holdings: response.data.holdings || []
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to fetch trading history'
      );
    }
  }
);

// Slice
const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    clearOrderStatus: (state) => {
      state.orderStatus = null;
      state.error = null;
    },
    updateStatistics: (state, action) => {
      state.statistics = calculateAnalytics(
        state.transactions,
        state.holdings,
        action.payload
      );
    },
    updateHoldings: (state, action) => {
      state.holdings = action.payload;
      state.statistics = calculateAnalytics(
        state.transactions,
        action.payload,
        action.payload.currentPrice
      );
    },
    resetTradingState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Fetch Holdings
      .addCase(fetchHoldings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHoldings.fulfilled, (state, action) => {
        state.loading = false;
        state.holdings = action.payload;
        state.statistics = calculateAnalytics(
          state.transactions,
          action.payload
        );
      })
      .addCase(fetchHoldings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderStatus = 'pending';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatus = 'success';
        
        if (!Array.isArray(state.transactions)) {
          state.transactions = [];
        }
        
        if (action.payload.transaction) {
          state.transactions = [action.payload.transaction, ...state.transactions];
        }
        
        state.holdings = action.payload.holdings || [];
        state.statistics = calculateAnalytics(
          state.transactions,
          state.holdings,
          action.payload.currentPrice
        );
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
        state.transactions = action.payload.transactions;
        state.holdings = action.payload.holdings;
        state.statistics = calculateAnalytics(
          action.payload.transactions,
          action.payload.holdings
        );
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectTransactions = (state) => state.user.tradingModal.transactions || [];
export const selectHoldings = (state) => state.user.tradingModal.holdings || [];
export const selectStatistics = (state) => state.user.tradingModal.statistics;
export const selectLoadingState = (state) => ({
  loading: state.user.tradingModal.loading,
  orderStatus: state.user.tradingModal.orderStatus
});
export const selectError = (state) => state.user.tradingModal.error;
export const selectHoldingBySymbol = (state, symbol) => 
  (state.user.tradingModal.holdings || []).find(h => h.companySymbol === symbol);
export const selectTotalHoldingsValue = (state) => 
  (state.user.tradingModal.holdings || []).reduce((total, holding) => 
    total + (holding.quantity * holding.averageBuyPrice), 0);

// Actions
export const { 
  clearOrderStatus, 
  updateStatistics,
  updateHoldings,
  resetTradingState 
} = tradingSlice.actions;

export default tradingSlice.reducer;