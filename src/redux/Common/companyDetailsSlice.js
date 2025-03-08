// src/redux/Common/companyDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../utils/BaseUrl';

// Helper function to calculate SMA
const calculateSMA = (data, period = 20) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push({ x: data[i].x, y: null });
      continue;
    }
    
    let sum = 0;
    let validPoints = 0;
    for (let j = 0; j < period; j++) {
      const price = data[i - j]?.y?.[3];
      if (typeof price === 'number' && !isNaN(price)) {
        sum += price;
        validPoints++;
      }
    }
    sma.push({ 
      x: data[i].x, 
      y: validPoints > 0 ? sum / validPoints : null 
    });
  }
  return sma;
};

// Async thunks
export const fetchCompanyDetails = createAsyncThunk(
  'companyDetails/fetchCompanyDetails',
  async ({ symbol, type }, { rejectWithValue }) => {
    try {
      const endpoint = type === 'nifty50' 
        ? `${BASE_API_URL}/admin/nifty/company/${symbol}`
        : `${BASE_API_URL}/admin/nifty500/company/${symbol}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch company details: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching company details:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
  'companyDetails/fetchHistoricalData',
  async ({ symbol, type, timeRange }, { rejectWithValue }) => {
    try {
      const endpoint = type === 'nifty50'
        ? `${BASE_API_URL}/admin/nifty/company/chart/${symbol}?timeRange=${timeRange}`
        : `${BASE_API_URL}/admin/nifty500/company/chart/${symbol}?timeRange=${timeRange}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch historical data: ${response.statusText}`);
      }
      
      const data = await response.json();
      return processChartData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to process chart data
const processChartData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid chart data format');
  }

  try {
    // Process candlestick data
    const candlestick = data.map(item => ({
      x: new Date(item.date).getTime(),
      y: [
        Number(item.open),
        Number(item.high),
        Number(item.low),
        Number(item.close)
      ]
    })).filter(item => 
      !item.y.some(val => isNaN(val)) && 
      !isNaN(item.x)
    );

    // Process volume data
    const volume = data.map(item => ({
      x: new Date(item.date).getTime(),
      y: Number(item.volume) || 0
    })).filter(item => !isNaN(item.x));

    // Calculate technical indicators
    const sma20 = calculateSMA(candlestick, 20);
    const sma50 = calculateSMA(candlestick, 50);
    const sma200 = calculateSMA(candlestick, 200);

    return {
      rawData: data,
      processedData: {
        candlestick,
        volume,
        technicalIndicators: {
          sma20,
          sma50,
          sma200
        }
      }
    };
  } catch (error) {
    console.error('Error processing chart data:', error);
    throw new Error('Failed to process chart data');
  }
};

const initialState = {
  data: null,
  historicalData: {
    rawData: [],
    processedData: {
      candlestick: [],
      volume: [],
      technicalIndicators: {
        sma20: [],
        sma50: [],
        sma200: []
      }
    }
  },
  loading: false,
  historicalLoading: false,
  error: null,
  activeTab: 'overview',
  activeFilter: '1D',
  currentPage: 1,
  itemsPerPage: 5,
  isRefreshing: false,
  chartSettings: {
    theme: 'light',
    showGrid: true,
    showVolume: true,
    showIndicators: true,
    showToolbar: true
  }
};

const companyDetailsSlice = createSlice({
  name: 'companyDetails',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
    updateChartSettings: (state, action) => {
      state.chartSettings = {
        ...state.chartSettings,
        ...action.payload
      };
    },
    resetCompanyDetails: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCompanyDetails
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchHistoricalData
      .addCase(fetchHistoricalData.pending, (state) => {
        state.historicalLoading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.historicalLoading = false;
        state.historicalData = action.payload;
        state.error = null;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.historicalLoading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  setActiveTab,
  setActiveFilter,
  setCurrentPage,
  setItemsPerPage,
  setIsRefreshing,
  updateChartSettings,
  resetCompanyDetails
} = companyDetailsSlice.actions;

// // Export selectors
// export const selectCompanyDetails = (state) => state.companyDetails;
// export const selectChartData = (state) => state.companyDetails.historicalData.processedData;
// export const selectLoadingState = (state) => ({
//   loading: state.companyDetails.loading,
//   historicalLoading: state.companyDetails.historicalLoading,
//   isRefreshing: state.companyDetails.isRefreshing
// });
// export const selectChartSettings = (state) => state.companyDetails.chartSettings;

// src/redux/Common/companyDetailsSlice.js

// Update the selectors to access the nested state
export const selectCompanyDetails = (state) => state.common.companyDetails || initialState;
export const selectChartData = (state) => state.common.companyDetails?.historicalData.processedData;
export const selectLoadingState = (state) => ({
  loading: state.common.companyDetails?.loading || false,
  historicalLoading: state.common.companyDetails?.historicalLoading || false,
  isRefreshing: state.common.companyDetails?.isRefreshing || false
});
export const selectChartSettings = (state) => state.common.companyDetails?.chartSettings || initialState.chartSettings;

export default companyDetailsSlice.reducer;