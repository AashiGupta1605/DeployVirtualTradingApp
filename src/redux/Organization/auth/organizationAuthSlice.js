import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// Import existing reducers

 
// Async Thunks for Organization
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
    return response.data;
  }
);


// mobile and jwt added

// export const loginOrganization = createAsyncThunk(
//   'organizations/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const loginOrganization = createAsyncThunk(
  'organizations/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerOrganization = createAsyncThunk(
  'organizations/register',
  async (organizationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/organization/register`, organizationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Organization Auth Slice
const organizationAuthSlice = createSlice({
  name: 'organizationAuth',
  initialState: {
    list: [], // For fetched organizations
    status: 'idle', // For fetchOrganizations
    error: null, // For fetchOrganizations
    orgName: null, // For login/register
    loading: false, // For login/register
    authError: null, // For login/register
    success: false, // For login/register
  },
  reducers: {
    resetAuthState: (state) => {
      state.orgName = null;
      state.loading = false;
      state.authError = null;
      state.success = false;
      state.token = null;
    },
    logoutOrganization: (state) => {
      state.orgName = null;
      state.success = false;
      state.token = null;
      localStorage.removeItem('orgName');
      localStorage.removeItem("token");
    },
    addOrganization: (state, action) => {
      state.organizations.push(action.payload);
      state.totalOrganizations += 1;
    },
    removeOrganization: (state, action) => {
      state.organizations = state.organizations.filter(org => org._id !== action.payload);
      state.totalOrganizations = Math.max(0, state.totalOrganizations - 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.organizations = state.organizations.filter(
          org => org._id !== action.payload
        );
      })
      .addCase(loginOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.orgName = action.payload.orgName;
        state.success = true;
        state.token = action.payload.token;
        localStorage.setItem('orgName', action.payload.orgName);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      })
      .addCase(registerOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(registerOrganization.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // state.status = 'idle';
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      });
  }
});

export const { resetAuthState, logoutOrganization } = organizationAuthSlice.actions;
export default organizationAuthSlice.reducer;




