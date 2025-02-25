
// // new one separate:

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';

// // Async Thunk for Fetching Organizations
// export const fetchOrganizations = createAsyncThunk(
//   'organizations/fetchOrganizations',
//   async () => {
//     const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
//     return response.data;
//   }
// );

// // Async Thunk for Organization Login
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

// // Async Thunk for Organization Registration
// export const registerOrganization = createAsyncThunk(
//   'organizations/register',
//   async (organizationData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_API_URL}/organization/register`, organizationData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const organizationAuthSlice = createSlice({
//   name: 'organizationAuth',
//   initialState: {
//     list: [], // For fetched organizations
//     status: 'idle', // For fetchOrganizations
//     error: null, // For fetchOrganizations
//     orgName: null, // For login/register
//     loading: false, // For login/register
//     authError: null, // For login/register
//     success: false, // For login/register
//   },
//   reducers: {
//     resetAuthState: (state) => {
//       state.orgName = null;
//       state.loading = false;
//       state.authError = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Organizations Reducers
//       .addCase(fetchOrganizations.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOrganizations.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload;
//       })
//       .addCase(fetchOrganizations.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Login Organization Reducers
//       .addCase(loginOrganization.pending, (state) => {
//         state.loading = true;
//         state.authError = null;
//       })
//       .addCase(loginOrganization.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orgName = action.payload.orgName;
//         state.success = true;
//       })
//       .addCase(loginOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.authError = action.payload.message;
//       })
//       // Register Organization Reducers
//       .addCase(registerOrganization.pending, (state) => {
//         state.loading = true;
//         state.authError = null;
//       })
//       .addCase(registerOrganization.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(registerOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.authError = action.payload.message;
//       });
//   },
// });

// export const { resetAuthState } = organizationAuthSlice.actions;
// export default organizationAuthSlice.reducer;













// adding logout functionality


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async Thunk for Fetching Organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
    return response.data;
  }
);

// Async Thunk for Organization Login
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

// Async Thunk for Organization Registration
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
    // Reset authentication state
    resetAuthState: (state) => {
      state.orgName = null;
      state.loading = false;
      state.authError = null;
      state.success = false;
    },
    // Logout organization
    logoutOrganization: (state) => {
      state.orgName = null;
      state.success = false;
      localStorage.removeItem('orgName'); // Clear orgName from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organizations Reducers
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
      })
      // Login Organization Reducers
      .addCase(loginOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.orgName = action.payload.orgName;
        state.success = true;
        localStorage.setItem('orgName', action.payload.orgName); // Save orgName to localStorage
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      })
      // Register Organization Reducers
      .addCase(registerOrganization.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })
      .addCase(registerOrganization.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      });
  },
});

export const { resetAuthState, logoutOrganization } = organizationAuthSlice.actions;
export default organizationAuthSlice.reducer;