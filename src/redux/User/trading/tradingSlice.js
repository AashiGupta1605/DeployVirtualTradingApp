import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { updateSubscription } from '../userSubscriptionPlan/userSubscriptionPlansSlice';

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

    const buyTrades = buyTransactions.reduce((total, transaction) => 
      total + transaction.numberOfShares, 0);
    
    const sellTrades = sellTransactions.reduce((total, transaction) => 
      total + transaction.numberOfShares, 0);

    const totalInvestment = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * holding.averageBuyPrice), 0);

    const totalHoldingsValue = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * (currentPrice || holding.averageBuyPrice)), 0);

    const realizedPL = sellTransactions.reduce((sum, trade) => {
      const buyPrice = buyTransactions.find(bt => bt.companySymbol === trade.companySymbol)?.price || 0;
      return sum + ((trade.price - buyPrice) * trade.numberOfShares);
    }, 0);

    const currentHoldingsValue = holdings.reduce((sum, holding) => 
      sum + (holding.quantity * currentPrice), 0);

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
      buyTrades,
      sellTrades,
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

const initialState = {
  transactions: [],
  holdings: [],
  loading: {
    general: false,
    trading: false
  },
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

// In tradingSlice.js, update fetchHoldings:
export const fetchHoldings = createAsyncThunk(
  'trading/fetchHoldings',
  async ({ userId, subscriptionPlanId }, { rejectWithValue }) => {
    try {
      // Validate IDs
      if (!mongoose.Types.ObjectId.isValid(userId) || 
          !mongoose.Types.ObjectId.isValid(subscriptionPlanId)) {
        throw new Error('Invalid user ID or subscription plan ID');
      }

      const response = await axios.get(
        `${BASE_API_URL}/user/trading/holdings/${userId}/${subscriptionPlanId}`
      );
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to fetch holdings'
      );
    }
  }
);

export const placeOrder = createAsyncThunk(
  'trading/placeOrder',
  async (orderDetails, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState();
      const activeEvent = state.user.events?.activeEvent;
      
      const requiredFields = [
        'userId', 
        'subscriptionPlanId', 
        'symbol', 
        'type', 
        'numberOfShares', 
        'price', 
        'orderType', 
        'total', 
        'currentMarketPrice'
      ];

      const missingFields = requiredFields.filter(field => 
        orderDetails[field] === undefined || orderDetails[field] === null
      );

      if (missingFields.length > 0) {
        return rejectWithValue({
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields
        });
      }

      const response = await axios.post(
        `${BASE_API_URL}/user/trading/trade`,
        {
          ...orderDetails,
          eventId: activeEvent?._id || null
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(updateSubscription({
        id: orderDetails.subscriptionPlanId,
        updateData: { vertualAmount: response.data.balance }
      }));

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to place order',
        error: error.message,
        details: error.response?.data
      });
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  'trading/fetchHistory',
  async ({ userId, eventId }, { rejectWithValue }) => {
    try {
      let url = `${BASE_API_URL}/user/trading/history/${userId}`;
      if (eventId === 'none') {
        url = `${BASE_API_URL}/user/trading/history/${userId}?eventFilter=none`;
      } else if (eventId) {
        url = `${BASE_API_URL}/user/trading/history/${userId}?eventId=${eventId}`;
      }
      
      const response = await axios.get(url);
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

// Update the selector to properly filter transactions


export const fetchEventSpecificTransactions = createAsyncThunk(
  'trading/fetchEventSpecificTransactions',
  async ({ userId, eventId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/${eventId}/transactions/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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
      })
      .addCase(fetchEventSpecificTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventSpecificTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.holdings = action.payload.holdings;
        state.statistics = calculateAnalytics(
          action.payload.transactions,
          action.payload.holdings
        );
      })
      .addCase(fetchEventSpecificTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
// In your tradingSlice.js
export const selectTransactions = (state) => state.user.tradingModal.transactions || [];

export const selectFilteredTransactions = createSelector(
  [selectTransactions, (state, eventId) => eventId],
  (transactions, eventId) => {
    if (eventId === 'none') {
      // Only show transactions with no eventId or null eventId
      return transactions.filter(t => 
        t.eventId === null || t.eventId === undefined
      );
    }
    if (eventId) {
      // Show only transactions for this specific event
      return transactions.filter(t => t.eventId === eventId);
    }
    // If no eventId parameter, show all transactions
    return transactions;
  }
);

export const selectHoldings = (state) => state.user.tradingModal.holdings || [];
export const selectStatistics = (state) => state.user.tradingModal.statistics;
export const selectLoadingState = (state) => {
  const loading = state.user.tradingModal.loading;
  const orderStatus = state.user.tradingModal.orderStatus;

  return {
    loading: typeof loading === 'object' 
      ? (loading.general || loading.trading || false)
      : (loading || false),
    orderStatus: orderStatus || null
  };
};
export const selectError = (state) => state.user.tradingModal.error;
export const selectHoldingBySymbol = createSelector(
  [(state) => state.user.tradingModal.holdings || [], (state, symbol) => symbol],
  (holdings, symbol) => holdings.find(h => 
    h.companySymbol.toLowerCase() === symbol?.toLowerCase()
  )
);
export const selectTotalHoldingsValue = (state) => 
  (state.user.tradingModal.holdings || []).reduce((total, holding) => 
    total + (holding.quantity * holding.averageBuyPrice), 0);

export const { 
  clearOrderStatus, 
  updateStatistics,
  updateHoldings,
  resetTradingState 
} = tradingSlice.actions;

export default tradingSlice.reducer;