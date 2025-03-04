import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { fetchOrganizations } from '../../Organization/auth/organizationAuthSlice';

// Async Thunks
export const registerOrganization = createAsyncThunk(
  'organizationRegistration/register',
  async (organizationData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/admin/OrgRegister`,
        organizationData
      );

      // toast.success('Organization registered successfully!');
      await dispatch(fetchOrganizations());
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return rejectWithValue(
        error.response?.data?.message || 
        'Registration failed'
      );
    }
  }
);

export const updateOrganization = createAsyncThunk(
  'organizationRegistration/update',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data)
          .filter(([key, value]) =>
            value !== undefined &&
            value !== '' &&
            !['_id', 'password', 'createDate', 'updateDate', '__v'].includes(key)
          )
      );

      const response = await axios.put(
        `${BASE_API_URL}/organization/${id}`,
        filteredData
      );

      // toast.success('Organization updated successfully!');
      await dispatch(fetchOrganizations());
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      console.error('Update error:', error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Update failed'
      );
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  'organizationRegistration/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/organization/${id}`
      );

      await dispatch(fetchOrganizations());
      toast.success('Organization deleted successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deletion failed');
      return rejectWithValue(
        error.response?.data?.message || 
        'Deletion failed'
      );
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  error: null,
  success: false,
  selectedOrg: null,
  notification: {
    message: null,
    type: null
  }
};

// Slice
const organizationRegistrationSlice = createSlice({
  name: 'organizationRegistration',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.error = null;
      state.success = false;
      state.notification.message = null;
      state.notification.type = null;
    },
    setSelectedOrg: (state, action) => {
      state.selectedOrg = action.payload;
    },
    clearNotification: (state) => {
      state.notification.message = null;
      state.notification.type = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register Organization
      .addCase(registerOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.notification.message = null;
        state.notification.type = null;
      })
      .addCase(registerOrganization.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.notification.message = 'Organization registered successfully. Welcome email sent with login credentials.';
        state.notification.type = 'success';
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.notification.message = action.payload;
        state.notification.type = 'error';
      })
      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.notification.message = null;
        state.notification.type = null;
      })
      .addCase(updateOrganization.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.notification.message = 'Organization updated successfully';
        state.notification.type = 'success';
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        state.notification.message = action.payload;
        state.notification.type = 'error';
      });
  }
});

// Actions
export const {
  resetForm,
  setSelectedOrg,
  clearNotification
} = organizationRegistrationSlice.actions;

// Base Selectors
const getOrganizationRegistrationState = state => state?.admin?.organizationRegistration;

// Derived Selectors
export const selectRegistrationLoading = state =>
  getOrganizationRegistrationState(state)?.isLoading ?? false;

export const selectRegistrationError = state =>
  getOrganizationRegistrationState(state)?.error ?? null;

export const selectRegistrationSuccess = state =>
  getOrganizationRegistrationState(state)?.success ?? false;

export const selectSelectedOrg = state =>
  getOrganizationRegistrationState(state)?.selectedOrg ?? null;

export const selectNotification = state =>
  getOrganizationRegistrationState(state)?.notification ?? {
    message: null,
    type: null
  };

// Combined Selectors
export const selectRegistrationState = state => ({
  isLoading: selectRegistrationLoading(state),
  error: selectRegistrationError(state),
  success: selectRegistrationSuccess(state),
  selectedOrg: selectSelectedOrg(state),
  notification: selectNotification(state)
});

// Helper Selectors
export const selectIsProcessing = state =>
  selectRegistrationLoading(state);

export const selectHasErrors = state =>
  !!selectRegistrationError(state);

export const selectIsSuccessful = state =>
  selectRegistrationSuccess(state);

export const selectNotificationStatus = state => ({
  message: selectNotification(state).message,
  type: selectNotification(state).type
});

export default organizationRegistrationSlice.reducer;