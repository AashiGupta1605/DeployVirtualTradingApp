import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../utils/BaseUrl';
import axios from "axios";


const formatDateForDisplay = (dateString) => {
  if (!dateString) return null;
  
  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`).toISOString();
  }
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

// Enhanced helper function to normalize historical data
const normalizeHistoricalData = (data, symbol) => {
  console.log(`Normalizing data for ${symbol}, input data:`, data);
  
  if (!data) {
    console.warn('No data provided to normalize');
    return [];
  }

  // Handle both array response and object with data array
  let dataArray = Array.isArray(data) ? data : (data.data || []);
  
  if (!Array.isArray(dataArray)) {
    console.warn('Data is not an array:', dataArray);
    return [];
  }

  console.log(`Found ${dataArray.length} records for ${symbol}`);

  return dataArray.map(item => {
    // Handle different API response formats
    const open = Number(item.open) || Number(item.dayOpen) || 0;
    const high = Number(item.high) || Number(item.dayHigh) || 0;
    const low = Number(item.low) || Number(item.dayLow) || 0;
    const close = Number(item.close) || Number(item.lastPrice) || 0;
    const volume = Number(item.volume) || Number(item.totalTradedVolume) || 0;
    
    let date = item.fetchTime || item.date || item.lastUpdateTime;
    
    // Convert Indian date format (DD-MM-YYYY) to ISO format if needed
    if (date && date.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = date.split('-');
      date = `${year}-${month}-${day}T00:00:00`;
    }

    // Calculate percentage change if not provided
    let pChange = Number(item.pChange) || Number(item.changePercent) || 0;
    if (pChange === 0 && open !== 0) {
      pChange = ((close - open) / open) * 100;
    }

    // Calculate value if not provided
    let value = Number(item.value) || 0;
    if (value === 0 && close !== 0 && volume !== 0) {
      value = close * volume;
    }

    return {
      id: item._id || `${symbol}-${date}`,
      symbol: symbol,
      date: date,
      open: open,
      high: high,
      low: low,
      close: close,
      volume: volume,
      pChange: pChange,
      value: value
    };
  });
};

// Enhanced time range filtering
const filterDataByTimeRange = (data, timeRange) => {
  if (!Array.isArray(data)) {
    console.warn('Invalid data passed to filter:', data);
    return [];
  }

  if (data.length === 0) return [];

  // Get the most recent date in the data
  const dates = data.map(item => new Date(item.date));
  const lastDate = new Date(Math.max(...dates));
  console.log('Last date in data:', lastDate);

  let cutoffDate = new Date(lastDate);

  switch (timeRange) {
    case '1D':
      cutoffDate.setDate(cutoffDate.getDate() - 1);
      break;
    case '1W':
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      break;
    case '1M':
      cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      break;
    case '3M':
      cutoffDate.setMonth(cutoffDate.getMonth() - 3);
      break;
    case 'YTD':
      cutoffDate = new Date(cutoffDate.getFullYear(), 0, 1);
      break;
    default:
      return data;
  }

  console.log(`Filtering data from ${cutoffDate} to ${lastDate}`);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoffDate;
  });

  console.log(`Filtered ${filteredData.length} records for ${timeRange} range`);
  return filteredData;
};

// Calculate technical indicators
const calculateTechnicalIndicators = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      sma20: [],
      sma50: [],
      sma200: []
    };
  }

  const calculateSMA = (period) => {
    return data.map((_, index) => {
      if (index < period - 1) return null;
      const slice = data.slice(index - period + 1, index + 1);
      const sum = slice.reduce((acc, val) => acc + val.close, 0);
      return sum / period;
    });
  };

  return {
    sma20: calculateSMA(20),
    sma50: calculateSMA(50),
    sma200: calculateSMA(200)
  };
};

// Price analysis helper
const analyzePriceData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      currentPrice: 0,
      averagePrice: 0,
      percentageDiff: 0,
      recommendation: 'HOLD'
    };
  }

  const currentPrice = data[data.length - 1].close;
  const prices = data.map(item => item.close);
  const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const percentageDiff = ((currentPrice - averagePrice) / averagePrice) * 100;

  let recommendation = 'HOLD';
  if (percentageDiff > 5) recommendation = 'SELL';
  if (percentageDiff < -5) recommendation = 'BUY';

  return {
    currentPrice,
    averagePrice,
    percentageDiff,
    recommendation
  };
};

const initialState = {
  data: null,
  historicalData: {
    rawData: [],
    processedData: [],
    timeRange: '1D',
  },
  technicalIndicators: {
    sma20: [],
    sma50: [],
    sma200: []
  },
  priceAnalysis: {
    currentPrice: 0,
    averagePrice: 0,
    percentageDiff: 0,
    recommendation: 'HOLD'
  },
  loading: false,
  historicalLoading: false,
  error: null,
  activeTab: 'overview',
  activeFilter: '1D',
  currentPage: 1,
  itemsPerPage: 10,
  isRefreshing: false,
  lastUpdated: null
};

// Fetch company details thunk
export const fetchCompanyDetails = createAsyncThunk(
  'companyDetails/fetchCompanyDetails',
  async ({ symbol, type }, { rejectWithValue }) => {
    try {
      let endpoint;
      let response;
      
      switch (type) {
        case 'nifty50':
          endpoint = `${BASE_API_URL}/admin/nifty/company/${symbol}`;
          response = await axios.get(endpoint);
          break;
        case 'nifty500':
          endpoint = `${BASE_API_URL}/admin/nifty500/company/${symbol}`;
          response = await axios.get(endpoint);
          break;
        case 'etf':
          endpoint = `${BASE_API_URL}/admin/etf/${symbol}`;
          response = await axios.get(endpoint);
          break;
        default:
          // Try all endpoints if type is not specified
          try {
            endpoint = `${BASE_API_URL}/admin/nifty/company/${symbol}`;
            response = await axios.get(endpoint);
          } catch (nifty50Error) {
            try {
              endpoint = `${BASE_API_URL}/admin/nifty500/company/${symbol}`;
              response = await axios.get(endpoint);
            } catch (nifty500Error) {
              endpoint = `${BASE_API_URL}/admin/etf/${symbol}`;
              response = await axios.get(endpoint);
            }
          }
      }

      if (!response.data) {
        throw new Error(`No data found for symbol ${symbol} (type: ${type})`);
      }

      const normalizedData = {
        ...response.data,
        lastPrice: response.data.lastPrice || response.data.currentPrice || 0,
        currentPrice: response.data.currentPrice || response.data.lastPrice || 0,
        lastUpdateTime: formatDateForDisplay(response.data.lastUpdateTime) || new Date().toISOString(),
        dayHigh: response.data.dayHigh || response.data.high || 0,
        dayLow: response.data.dayLow || response.data.low || 0,
        totalTradedVolume: response.data.totalTradedVolume || response.data.volume || 0,
        changePercent: response.data.pChange || response.data.changePercent || 0
      };

      return normalizedData;
    } catch (error) {
      console.error(`Error fetching details for ${symbol} (type: ${type}):`, error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        `Failed to fetch details for ${symbol} (type: ${type})`
      );
    }
  }
);

// Helper function to format dates


// Fetch historical data thunk
export const fetchHistoricalData = createAsyncThunk(
  'companyDetails/fetchHistoricalData',
  async ({ symbol, type, timeRange = '1D' }, { rejectWithValue }) => {
    try {
      let endpoint;
      switch (type) {
        case 'nifty50':
          endpoint = `${BASE_API_URL}/admin/nifty/company/history/${symbol}`;
          break;
        case 'nifty500':
          endpoint = `${BASE_API_URL}/admin/nifty500/company/history/${symbol}`;
          break;
        case 'etf':
          endpoint = `${BASE_API_URL}/admin/etf/historical/${symbol}`;
          break;
        default:
          endpoint = `${BASE_API_URL}/admin/nifty500/company/history/${symbol}`;
      }

      const response = await axios.get(endpoint, {
        params: { timeRange }
      });

      return {
        rawData: response.data,
        processedData: response.data,
        timeRange
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Refresh market data thunk
export const refreshMarketData = createAsyncThunk(
  'companyDetails/refreshMarketData',
  async ({ symbol, type, timeRange = '1D' }, { dispatch }) => {
    try {
      const [companyDetails, historicalData] = await Promise.all([
        dispatch(fetchCompanyDetails({ symbol, type })).unwrap(),
        dispatch(fetchHistoricalData({ symbol, type, timeRange })).unwrap()
      ]);

      return {
        companyDetails,
        historicalData
      };
    } catch (error) {
      throw error;
    }
  }
);

const companyDetailsSlice = createSlice({
  name: 'companyDetails',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
      state.historicalData.processedData = filterDataByTimeRange(
        state.historicalData.rawData,
        action.payload
      );
      state.historicalData.timeRange = action.payload;
      state.priceAnalysis = analyzePriceData(state.historicalData.processedData);
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
    resetCompanyDetails: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHistoricalData.pending, (state) => {
        state.historicalLoading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.historicalLoading = false;
        state.historicalData = {
          rawData: action.payload.rawData,
          processedData: action.payload.processedData,
          timeRange: action.payload.timeRange
        };
        state.technicalIndicators = action.payload.technicalIndicators;
        state.priceAnalysis = action.payload.priceAnalysis;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.historicalLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshMarketData.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshMarketData.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.data = action.payload.companyDetails;
        state.historicalData = action.payload.historicalData;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(refreshMarketData.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectCompanyDetails = (state) => state.common.companyDetails;
export const selectHistoricalTimeRange = (state) => 
  state.common.companyDetails?.historicalData?.timeRange;
export const selectCurrentPrice = (state) => 
  state.common.companyDetails?.data?.lastPrice || 
  state.common.companyDetails?.data?.currentPrice || 0;
export const selectHistoricalData = (state) => 
  state.common.companyDetails?.historicalData?.processedData || [];
export const selectRawHistoricalData = (state) => 
  state.common.companyDetails?.historicalData?.rawData || [];
export const selectTechnicalIndicators = (state) => 
  state.common.companyDetails?.technicalIndicators;
export const selectPriceAnalysis = (state) => 
  state.common.companyDetails?.priceAnalysis;
export const selectLoadingState = (state) => ({
  loading: state.common.companyDetails?.loading || false,
  historicalLoading: state.common.companyDetails?.historicalLoading || false,
  isRefreshing: state.common.companyDetails?.isRefreshing || false
});
export const selectLastUpdated = (state) => 
  state.common.companyDetails?.lastUpdated;

export const selectLoadingStates = (state) => ({
  loading: state.common.companyDetails?.loading || false,
  historicalLoading: state.common.companyDetails?.historicalLoading || false,
  isRefreshing: state.common.companyDetails?.isRefreshing || false
});
 

export const {
  setActiveTab,
  setActiveFilter,
  setCurrentPage,
  setItemsPerPage,
  setIsRefreshing,
  resetCompanyDetails
} = companyDetailsSlice.actions;

export default companyDetailsSlice.reducer;