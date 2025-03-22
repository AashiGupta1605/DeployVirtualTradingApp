
// new refresh vesion


// organizationDashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import toast from "react-hot-toast";

// Async Thunk for Fetching Dashboard Data
export const fetchDashboardData = createAsyncThunk(
  "organizationDashboard/fetchDashboardData",
  async (orgName, { rejectWithValue }) => {
    try {
      const [
        totalUsersRes,
        newUsersLastWeekRes,
        maleUsersRes,
        femaleUsersRes,
        activeUsersRes,
        deactiveUsersRes,
        averageUserAgeRes,
      ] = await Promise.all([
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/total`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/new-week`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/male`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/female`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/active`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/deactive`),
        axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/average-age`),
      ]);

      return {
        totalUsers: totalUsersRes.data.count,
        newUsersLastWeek: newUsersLastWeekRes.data.count,
        maleUsers: maleUsersRes.data.count,
        femaleUsers: femaleUsersRes.data.count,
        activeUsers: activeUsersRes.data.count,
        deactiveUsers: deactiveUsersRes.data.count,
        averageUserAge: averageUserAgeRes.data.averageAge,
      };
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to fetch dashboard data.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  totalUsers: 0,
  newUsersLastWeek: 0,
  maleUsers: 0,
  femaleUsers: 0,
  activeUsers: 0,
  deactiveUsers: 0,
  averageUserAge: 0,
  loading: false,
  error: null,
};

// Slice
const organizationDashboardSlice = createSlice({
  name: "organizationDashboard",
  initialState,
  reducers: {
    resetDashboardState: (state) => {
      state.totalUsers = 0;
      state.newUsersLastWeek = 0;
      state.maleUsers = 0;
      state.femaleUsers = 0;
      state.activeUsers = 0;
      state.deactiveUsers = 0;
      state.averageUserAge = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.newUsersLastWeek = action.payload.newUsersLastWeek;
        state.maleUsers = action.payload.maleUsers;
        state.femaleUsers = action.payload.femaleUsers;
        state.activeUsers = action.payload.activeUsers;
        state.deactiveUsers = action.payload.deactiveUsers;
        state.averageUserAge = action.payload.averageUserAge;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetDashboardState } = organizationDashboardSlice.actions;
export default organizationDashboardSlice.reducer;