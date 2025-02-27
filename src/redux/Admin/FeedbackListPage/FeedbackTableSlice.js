// redux/Admin/FeedbackPage/FeedbackTableSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Update the API endpoints to match your backend routes
export const fetchFeedbacks = createAsyncThunk(
  'feedbackTable/fetchFeedbacks',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.rating) queryParams.append('rating', filters.rating);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.recommend !== undefined) queryParams.append('recommend', filters.recommend);
      if (filters.search) queryParams.append('search', filters.search);

      // Update the URL to match your backend route
      const url = `${BASE_API_URL}/admin/feedbacks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('Fetching feedbacks from:', url);
      const response = await axios.get(url);
      
      return response.data;
    } catch (error) {
      console.error('Fetch feedbacks error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch feedbacks');
    }
  }
);

// Update other API endpoints
export const deleteFeedback = createAsyncThunk(
  'feedbackTable/deleteFeedback',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_API_URL}/admin/feedbacks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete feedback');
    }
  }
);

export const updateFeedbackStatus = createAsyncThunk(
    'feedbackTable/updateFeedbackStatus',
    async ({ id, status }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`${BASE_API_URL}/admin/feedbacks/${id}/status`, { 
          status 
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update feedback status');
      }
    }
  );

export const fetchFeedbackStats = createAsyncThunk(
  'feedbackTable/fetchFeedbackStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admin/feedbacks/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch feedback statistics');
    }
  }
);

// Rest of your slice code remains the same...

  const initialState = {
    feedbacks: [],
    stats: {
      total: 0,
      positive: 0,
      negative: 0,
      recommended: 0,
      categoryDistribution: {},
      averageRating: 0,
      recommendationRate: 0
    },
    loading: false,
    error: null,
    isDeleting: false,
    deleteError: null,
    isUpdating: false,
    updateError: null
  };

  const feedbackTableSlice = createSlice({
    name: 'feedbackTable',
    initialState: {
        feedbacks: [],
        loading: false,
        error: null,
        isDeleting: false,
        isUpdating: false,
        },
    reducers: {
      resetFeedbackState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        // Fetch Feedbacks
        .addCase(fetchFeedbacks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFeedbacks.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = action.payload.data;
          state.stats = action.payload.stats;
          state.error = null;
        })
        .addCase(fetchFeedbacks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Delete Feedback
        .addCase(deleteFeedback.pending, (state) => {
          state.isDeleting = true;
          state.deleteError = null;
        })
        .addCase(deleteFeedback.fulfilled, (state, action) => {
          state.isDeleting = false;
          state.feedbacks = state.feedbacks.filter(
            feedback => feedback._id !== action.payload
          );
          state.deleteError = null;
        })
        .addCase(deleteFeedback.rejected, (state, action) => {
          state.isDeleting = false;
          state.deleteError = action.payload;
        })
  
        // Update Feedback Status
        .addCase(updateFeedbackStatus.pending, (state) => {
            state.isUpdating = true;
          })
          .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
            state.isUpdating = false;
            // Update the feedback in the existing array
            const index = state.feedbacks.findIndex(f => f._id === action.payload.data._id);
            if (index !== -1) {
              state.feedbacks[index] = action.payload.data;
            }
          })
          .addCase(updateFeedbackStatus.rejected, (state, action) => {
            state.isUpdating = false;
            state.error = action.payload;
          })
  
        // Fetch Statistics
        .addCase(fetchFeedbackStats.fulfilled, (state, action) => {
          state.stats = action.payload.data;
        });
    }
  });
  
  export const { resetFeedbackState } = feedbackTableSlice.actions;
  
  // Selectors
  export const selectFeedbacks = (state) => state.admin.feedbackTable.feedbacks;
  export const selectFeedbackStats = (state) => state.admin.feedbackTable.stats;
  export const selectFeedbackLoading = (state) => state.admin.feedbackTable.loading;
  export const selectFeedbackError = (state) => state.admin.feedbackTable.error;
  export const selectIsDeleting = (state) => state.admin.feedbackTable.isDeleting;
  export const selectIsUpdating = (state) => state.admin.feedbackTable.isUpdating;
  
  export default feedbackTableSlice.reducer;