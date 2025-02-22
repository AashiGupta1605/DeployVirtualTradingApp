import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/BaseUrl';
export const fetchOrganizations = createAsyncThunk('organizations/fetchOrganizations', async () => {
  const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
  return response.data;
});

const orgSlice = createSlice({
  name: 'organizations',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orgSlice.reducer;