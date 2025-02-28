import { combineReducers, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { logoutUser } from '../../Admin/Auth/LogoutSlice';
import { deleteOrganization } from '../../Admin/OrganizationListPage/OrganizationListSlice';

// Import existing reducers
import adminQueryTableReducer from '../../Admin/QueryListPage/QueryTableSllice';
import registeredUsersReducer from "../../Admin/RegisteredUsersPage/RegisteredUserListSlice";
import organizationListReducer from '../../Admin/OrganizationListPage/OrganizationListSlice';
import organizationRegistrationReducer from '../../Admin/OrganizationListPage/OrganizationRegisterSlice';
import userRegistrationReducer from '../../Admin/RegisteredUsersPage/UserRegisterSlice';

// Async Thunks for Organization
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch organizations');
    }
  }
);

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

// Initial state for organization auth
const initialState = {
  organizations: [],
  status: 'idle',
  error: null,
  orgName: null,
  loading: false,
  authError: null,
  success: false,
  totalOrganizations: 0
};

// Organization Auth Slice
const organizationAuthSlice = createSlice({
  name: 'organizationAuth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.orgName = null;
      state.loading = false;
      state.authError = null;
      state.success = false;
    },
    logoutOrganization: (state) => {
      state.orgName = null;
      state.success = false;
      localStorage.removeItem('orgName');
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
        state.totalOrganizations = action.payload.length;
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
        localStorage.setItem('orgName', action.payload.orgName);
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
        state.status = 'idle';
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload.message;
      });
  }
});

// Create a custom reducer to handle logout across admin slices
const createLogoutReducer = (reducer) => {
  return (state, action) => {
    if (action.type === logoutUser.fulfilled.type) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
};

// Create a reset action for the entire admin reducer
const resetAdminState = () => ({
  type: 'RESET_ADMIN_STATE'
});

// Apply logout handling to each reducer
const adminReducer = combineReducers({
  queryTable: createLogoutReducer(adminQueryTableReducer),
  registeredUsersTable: createLogoutReducer(registeredUsersReducer),
  organizationList: createLogoutReducer(organizationListReducer),
  organizationRegistration: createLogoutReducer(organizationRegistrationReducer),
  userRegistration: createLogoutReducer(userRegistrationReducer),
});

const rootAdminReducer = (state, action) => {
  if (action.type === 'RESET_ADMIN_STATE') {
    return adminReducer(undefined, action);
  }
  return adminReducer(state, action);
};

// Selectors
export const selectOrganizations = state => state?.organization?.auth?.organizations ?? [];
export const selectOrganizationStatus = state => state?.organization?.auth?.status ?? 'idle';
export const selectOrganizationError = state => state?.organization?.auth?.error ?? null;
export const selectOrganizationLoading = state => state?.organization?.auth?.loading ?? false;
export const selectOrganizationSuccess = state => state?.organization?.auth?.success ?? false;
export const selectOrganizationName = state => state?.organization?.auth?.orgName ?? null;
export const selectOrganizationCount = state => {
  const listCount = state.admin?.organizationList?.organizations?.length || 0;
  const authCount = state.organization?.auth?.organizations?.length || 0;
  return Math.max(listCount, authCount);
};

// Export actions
export const {
  resetAuthState,
  logoutOrganization,
  addOrganization,
  removeOrganization
} = organizationAuthSlice.actions;

export { resetAdminState };
export default rootAdminReducer;