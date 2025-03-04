// redux/Admin/SubscriptionPlans/subscriptionPlanSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async thunks
export const createSubscription = createAsyncThunk(
  'subscriptionPlan/create',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/user/subscription` , subscriptionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubscription = createAsyncThunk(
  'subscriptionPlan/getOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/subscription/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// redux/User/userSubscriptionPlan/userSubscriptionPlansSlice.js

export const getUserSubscriptions = createAsyncThunk(
    'subscriptionPlan/getUserPlans',
    async (userId, { rejectWithValue }) => {
      try {
        // Update this URL to match your route structure
        const response = await axios.get(`${BASE_API_URL}/user/subscription/user/${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// redux/User/userSubscriptionPlan/userSubscriptionPlansSlice.js

export const updateSubscription = createAsyncThunk(
  'subscriptionPlan/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      // Make sure you're using the correct id parameter
      const response = await axios.patch(`${BASE_API_URL}/user/subscription/${id}`, updateData);
      
      // Check if response.data exists
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update subscription'
      );
    }
  }
);

export const cancelSubscription = createAsyncThunk(
    'subscriptionPlan/cancel',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`${BASE_API_URL}/user/subscription/${id}/cancel`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getAllSubscriptions = createAsyncThunk(
  'subscriptionPlan/getAll',
  async (filters, { rejectWithValue }) => {
    // try {
    //   const queryString = new URLSearchParams(filters).toString();
    //   const response = await axios.get(`/api/v1/users/subscription-plans?${queryString}`);
    //   return response.data;
    // } catch (error) {
    //   return rejectWithValue(error.response.data);
    // }
  }
);

// Initial state
const initialState = {
  subscriptions: [],
  currentSubscription: null,
  userSubscriptions: [],
  loading: false,
  error: null,
  success: false,
  filters: {
    status: 'all',
    plan: 'all',
    startDate: null,
    endDate: null
  }
};

// Slice
const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlan',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create subscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscriptions.push(action.payload.data);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // Get single subscription
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload.data;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // Get user subscriptions
      .addCase(getUserSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.userSubscriptions = action.payload.data;
      })
      .addCase(getUserSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // Update subscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscriptions = state.subscriptions.map(sub =>
          sub._id === action.payload.data._id ? action.payload.data : sub
        );
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // Cancel subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove the cancelled plan from the list
        state.subscriptions = state.subscriptions.filter(
          sub => sub._id !== action.payload.data._id
        );
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // Get all subscriptions
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.data;
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      });
  }
});

// Export actions
export const {
  setFilters,
  clearFilters,
  resetState,
  clearError,
  clearSuccess
} = subscriptionPlanSlice.actions;

// More robust selectors with safe checks
export const selectSubscriptions = (state) => state?.user?.subscriptionPlan?.subscriptions || [];
export const selectCurrentSubscription = (state) => state?.user?.subscriptionPlan?.currentSubscription || null;
export const selectUserSubscriptions = (state) => state?.user?.subscriptionPlan?.userSubscriptions || [];
export const selectLoading = (state) => state?.user?.subscriptionPlan?.loading || false;
export const selectError = (state) => state?.user?.subscriptionPlan?.error || null;
export const selectSuccess = (state) => state?.user?.subscriptionPlan?.success || false;
export const selectFilters = (state) => state?.user?.subscriptionPlan?.filters || initialState.filters;
// Export reducer
export default subscriptionPlanSlice.reducer;