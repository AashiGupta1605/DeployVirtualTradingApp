import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/BaseUrl';
import toast from 'react-hot-toast';

// Async Thunk for fetching users
// export const fetchUsers = createAsyncThunk(
//   'users/fetchUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/user/display-users`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch users');
//     }
//   }
// );

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const [usersRes, maleCountRes, femaleCountRes, activeCountRes, inactiveCountRes, averageAgeRes, totalCountRes,  totalOrganizationRes, totalEventsRes] = await Promise.all([
        axios.get(`${BASE_API_URL}/user/display-users`),
        axios.get(`${BASE_API_URL}/user/userCount/male`),
        axios.get(`${BASE_API_URL}/user/userCount/female`),
        axios.get(`${BASE_API_URL}/user/userCount/active`),
        axios.get(`${BASE_API_URL}/user/userCount/deactive`),
        axios.get(`${BASE_API_URL}/user/userCount/averageAge`),
        axios.get(`${BASE_API_URL}/user/userCount/total`),
        axios.get(`${BASE_API_URL}/organization/organizationCount/total`),
        axios.get(`${BASE_API_URL}/admin/events/eventCount/total`),
      ]);

      return {
        users: usersRes.data,
        maleCount: maleCountRes.data.count,
        femaleCount: femaleCountRes.data.count,
        activeCount: activeCountRes.data.count,
        inactiveCount: inactiveCountRes.data.count,
        averageAge: averageAgeRes.data.averageAge,
        totalUserCount:totalCountRes.data.count,
        totalOrganizations:totalOrganizationRes.data.count,
        totalEvents:totalEventsRes.data.count
      };
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to fetch users');
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Initial state
const initialState = {
  list: [],
  status: 'idle',
  error: null,
  // totalUsers: 0,
  // activeUsers: 0,
  // maleUsers: 0,
  // femaleUsers: 0
  totalUsers: 0,
  totalOrganizations:0,
  totalEvents:0,
  activeUsers: 0,
  inactiveUsers: 0,
  maleUsers: 0,
  femaleUsers: 0,
  averageUserAge: 0
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
        state.inactiveUsers = state.list.filter(u => u.status === 'inactive').length;
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
        // state.totalUsers = action.payload.length;
        // state.activeUsers = action.payload.filter(user => user.status === 'active').length;
        // added by abhishek
        state.activeUsers = action.payload.activeCount;
        state.inactiveUsers = action.payload.inactiveCount;
        state.maleUsers = action.payload.maleCount;
        state.femaleUsers = action.payload.femaleCount;
        state.averageUserAge = action.payload.averageAge;
        state.totalUsers = action.payload.totalUserCount
        state.totalOrganizations = action.payload.totalOrganizations;
        state.totalEvents = action.payload.totalEvents;
        // till this point

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

// added by me ----
export const selectActiveUserCounts = (state) => state.user?.activeUsers || 0;
export const selectInactiveUserCount = (state) => state.user?.inactiveUsers || 0;
export const selectMaleUserCount = (state) => state.user?.maleUsers || 0;
export const selectFemaleUserCount = (state) => state.user?.femaleUsers || 0;
export const selectAverageUserAge = (state) => state.user?.averageUserAge || 0;
export const selectTotalUser = (state) => state.user?.totalUsers ?? 0;
export const selectTotalOrganization = (state) => state.user?.totalOrganizations ?? 0;
export const selectTotalEvent = (state) => state.user?.totalEvents ?? 0;




export const selectUsers = state => state.user?.list ?? [];
export const selectUserStatus = state => state.user?.status ?? 'idle';
export const selectUserError = state => state.user?.error ?? null;
export const selectTotalUsers = state => state.user?.totalUsers ?? 0;

// Export actions
export const { addUser, updateUserStatus, clearError } = userSlice.actions;

export default userSlice.reducer;