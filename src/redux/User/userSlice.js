import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/BaseUrl';

// Async Thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/display-users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Initial state
const initialState = {
  list: [],
  status: 'idle',
  error: null,
  totalUsers: 0,
  activeUsers: 0
};

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
      state.totalUsers = state.list.length;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const user = state.list.find(u => u._id === userId);
      if (user) {
        user.status = status;
        state.activeUsers = state.list.filter(u => u.status === 'active').length;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.totalUsers = action.payload.length;
        state.activeUsers = action.payload.filter(user => user.status === 'active').length;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectUserCount = (state) => {
  const listCount = state.admin?.registeredUsersTable?.list?.length || 0;
  const userCount = state.user?.list?.length || 0;
  return Math.max(listCount, userCount);
};

export const selectActiveUserCount = (state) => {
  const adminUsers = state.admin?.registeredUsersTable?.list || [];
  const users = state.user?.list || [];
  const adminActiveCount = adminUsers.filter(user => user.status === 'active').length;
  const userActiveCount = users.filter(user => user.status === 'active').length;
  return Math.max(adminActiveCount, userActiveCount);
};

export const selectUsers = state => state.user?.list ?? [];
export const selectUserStatus = state => state.user?.status ?? 'idle';
export const selectUserError = state => state.user?.error ?? null;
export const selectTotalUsers = state => state.user?.totalUsers ?? 0;

// Export actions
export const { addUser, updateUserStatus, clearError } = userSlice.actions;

export default userSlice.reducer;