// src/redux/Admin/RegisteredUsers/RegisteredUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async Thunks
export const fetchUsers = createAsyncThunk(
  'registeredUsers/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/display-users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk(
  'registeredUsers/createUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/user/register`, userData);
      // Refresh the user list after creating a new user
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

export const updateUser = createAsyncThunk(
  'registeredUsers/updateUser',
  async ({ userId, userData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/user/users/${userId}`, userData);
      // Refresh the user list after updating
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  'registeredUsers/deleteUser',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_API_URL}/user/users/${userId}`);
      // Refresh the user list after deletion
      dispatch(fetchUsers());
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

// Slice
const registeredUserSlice = createSlice({
  name: 'registeredUsers',
  initialState: {
    list: [],
    selectedUser: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false
  },
  reducers: {
    // Synchronous reducers if needed
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.payload;
      })

    // Create User
    .addCase(createUser.pending, (state) => {
      state.isCreating = true;
      state.error = null;
    })
    .addCase(createUser.fulfilled, (state) => {
      state.isCreating = false;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.isCreating = false;
      state.error = action.payload;
    })

    // Update User
    .addCase(updateUser.pending, (state) => {
      state.isUpdating = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state) => {
      state.isUpdating = false;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload;
    })

    // Delete User
    .addCase(deleteUser.pending, (state) => {
      state.isDeleting = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isDeleting = false;
      // Optional: Remove the deleted user from the list
      state.list = state.list.filter(user => user._id !== action.payload);
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload;
    });
  }
});

// Export actions and reducer
export const { 
  setSelectedUser, 
  clearSelectedUser 
} = registeredUserSlice.actions;

export default registeredUserSlice.reducer;