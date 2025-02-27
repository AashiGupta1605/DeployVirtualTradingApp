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
      await dispatch(fetchUsers());
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
      await dispatch(fetchUsers());
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
      await dispatch(fetchUsers());
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

// Initial State
const initialState = {
  list: [],
  totalUsers: 0,
  selectedUser: null,
  status: 'idle',
  error: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false
};

// Slice
const RegisteredUserListSlice = createSlice({
  name: 'registeredUsers',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    addUserToList: (state, action) => {
      state.list.unshift(action.payload);
      state.totalUsers = state.list.length;
    },
    updateUserInList: (state, action) => {
      const index = state.list.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.list = action.payload;
        state.totalUsers = action.payload.length;
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
        state.error = null;
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
        state.error = null;
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
        state.list = state.list.filter(user => user._id !== action.payload);
        state.totalUsers = state.list.length;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectUsers = (state) => state.admin?.registeredUsersTable?.list || [];
export const selectTotalUsers = (state) => state.admin?.registeredUsersTable?.totalUsers || 0;
export const selectUserStatus = (state) => state.admin?.registeredUsersTable?.status || 'idle';
export const selectUserError = (state) => state.admin?.registeredUsersTable?.error || null;
export const selectIsLoading = (state) => state.admin?.registeredUsersTable?.isLoading || false;
export const selectIsCreating = (state) => state.admin?.registeredUsersTable?.isCreating || false;
export const selectIsUpdating = (state) => state.admin?.registeredUsersTable?.isUpdating || false;
export const selectIsDeleting = (state) => state.admin?.registeredUsersTable?.isDeleting || false;
export const selectSelectedUser = (state) => state.admin?.registeredUsersTable?.selectedUser || null;
export const selectActiveUsers = (state) => {
  const users = selectUsers(state);
  return users.filter(user => user.status === 'active').length;
};

// Export actions
export const {
  setSelectedUser,
  clearSelectedUser,
  addUserToList,
  updateUserInList,
  clearError
} = RegisteredUserListSlice.actions;

export default RegisteredUserListSlice.reducer;