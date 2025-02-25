import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";

// Thunk to fetch stock data
export const fetchStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admin/etfdata`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        return rejectWithValue("Invalid data format received");
      }
    } catch (error) {
      return rejectWithValue("Error fetching stock data");
    }
  }
);

const etfSlice = createSlice({
  name: "stock",
  initialState: {
    stockData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default etfSlice.reducer;
