// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/BaseUrl';
// Admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123"
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      if (
        credentials.email === ADMIN_CREDENTIALS.email && 
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        const adminData = {
          user: {
            _id: "admin-id",
            name: "Admin",
            role: "admin"
          },
          token: "admin-token"
        };
        return adminData;
      }
      const response = await axios.post(`${BASE_API_URL}/user/auth/login`, credentials);
      return {
        user: {
          _id: response.data.user._id,
          name: response.data.user.name,
          role: response.data.user.role
        },
        token: response.data.token
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
         // Store user data properly in localStorage
         localStorage.setItem('token', action.payload.token);
         localStorage.setItem('user', JSON.stringify({
           _id: action.payload.user._id,  
           name: action.payload.user.name,
           role: action.payload.user.role
         }));
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectCurrentUser = (state) => state.user.auth;
export const selectAuthStatus = (state) => state.user?.auth?.status;
export const selectAuthError = (state) => state.user?.auth?.error;
export const selectIsAdmin = (state) => state.user.auth?.role === 'admin';

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;