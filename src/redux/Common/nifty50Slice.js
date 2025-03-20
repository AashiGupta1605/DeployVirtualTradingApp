// src/redux/Common/nifty50Slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/BaseUrl';

// Async thunks
export const fetchNiftyData = createAsyncThunk(
  'nifty50/fetchNiftyData',
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admin/nifty/data`, {
        params: { page, limit, search },
        timeout: 5000
      });
      
      const stocks = response.data.data[0]?.stocks || [];
      return stocks;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch data');
    }
  }
);

export const fetchCompanyDetails = createAsyncThunk(
  'nifty50/fetchCompanyDetails',
  async ({ symbol, type = 'nifty50' }, { rejectWithValue }) => {
    // Validate symbol
    if (!symbol || symbol === 'null' || symbol.toString().trim() === '') {
      return rejectWithValue('Invalid symbol provided');
    }

    // Ensure symbol is a string and sanitized
    const sanitizedSymbol = symbol.toString().trim().toUpperCase().replace('&', 'AND');

    try {
      // Determine appropriate endpoint based on type
      const endpoints = type === 'nifty50'
        ? [
            `${BASE_API_URL}/admin/nifty/company/${sanitizedSymbol}`,
            `${BASE_API_URL}/user/trading/stock/${sanitizedSymbol}`
          ]
        : type === 'nifty500'
          ? [
              `${BASE_API_URL}/admin/nifty500/company/${sanitizedSymbol}`,
              `${BASE_API_URL}/user/trading/stock/${sanitizedSymbol}`
            ]
          : [
              `${BASE_API_URL}/admin/etf/${sanitizedSymbol}`,
              `${BASE_API_URL}/user/trading/stock/${sanitizedSymbol}`
            ];

      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(endpoint);
          if (response.data) {
            return {
              stockData: response.data,
              chartData: null
            };
          }
        } catch (error) {
          console.warn(`Failed to fetch from ${endpoint}:`, error.message);
          continue;
        }
      }

      // If all endpoints fail
      return rejectWithValue(`Could not find details for symbol: ${sanitizedSymbol}`);
    } catch (error) {
      console.error('Error fetching company details:', error);
      return rejectWithValue(error.message || `Failed to fetch details for ${sanitizedSymbol}`);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  companyDetails: {
    stockData: null,
    chartData: null,
    loading: false,
    error: null
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  },
  sortConfig: {
    key: null,
    direction: 'none'
  },
  searchTerm: '',
  selectedSymbol: null
};

const nifty50Slice = createSlice({
  name: 'nifty50',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.pagination.currentPage = 1;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },
    setSelectedSymbol: (state, action) => {
      state.selectedSymbol = action.payload;
    },
    resetCompanyDetails: (state) => {
      state.companyDetails = initialState.companyDetails;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNiftyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNiftyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.pagination.totalItems = action.payload.length || 0;
      })
      .addCase(fetchNiftyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.companyDetails.loading = true;
        state.companyDetails.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.companyDetails.loading = false;
        state.companyDetails.stockData = action.payload.stockData;
        state.companyDetails.chartData = action.payload.chartData;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.companyDetails.loading = false;
        state.companyDetails.error = action.payload;
      });
  }
});

export const {
  setSearchTerm,
  setSortConfig,
  setCurrentPage,
  setItemsPerPage,
  setSelectedSymbol,
  resetCompanyDetails
} = nifty50Slice.actions;

export default nifty50Slice.reducer;