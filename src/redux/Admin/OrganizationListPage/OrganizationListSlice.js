// src/redux/Admin/OrganizationList/OrganizationListSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async Thunks
export const fetchOrganizations = createAsyncThunk(
  'organizationList/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/organization/display-all-org`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch organizations');
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  'organizationList/deleteOrganization',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_API_URL}/organization/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete organization');
    }
  }
);

export const updateOrganizationStatus = createAsyncThunk(
  'organizationList/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axios.put(`${BASE_API_URL}/organization/${id}/approval-status`, { status });
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update status');
    }
  }
);

// Initial State
const initialState = {
  organizations: [],
  filteredOrganizations: [],
  isLoading: false,
  error: null,
  filters: {
    status: "all",
    startDate: null,
    endDate: null,
    city: "all"
  },
  activeFilters: {
    status: false,
    dateRange: false,
    search: false,
    city: false
  },
  searchQuery: "",
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1
  },
  modals: {
    isFormOpen: false,
    selectedOrg: null
  }
};

// Slice
const organizationListSlice = createSlice({
  name: 'organizationList',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setActiveFilters: (state, action) => {
      state.activeFilters = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setModal: (state, action) => {
      state.modals = { ...state.modals, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.activeFilters = initialState.activeFilters;
      state.searchQuery = "";
      state.pagination.currentPage = 1;
    },
    filterOrganizations: (state) => {
      let filtered = [...state.organizations];

      // Status Filter
      if (state.filters.status !== "all") {
        filtered = filtered.filter(org => 
          org.approvalStatus?.toLowerCase() === state.filters.status.toLowerCase()
        );
      }

      // Date Filter
      if (state.filters.startDate && state.filters.endDate) {
        filtered = filtered.filter(org => {
          const orgDate = new Date(org.createDate);
          return orgDate >= state.filters.startDate && orgDate <= state.filters.endDate;
        });
      }

      // Search Filter
      if (state.searchQuery) {
        const searchLower = state.searchQuery.toLowerCase();
        filtered = filtered.filter(org =>
          org.name?.toLowerCase().includes(searchLower) ||
          org.contactPerson?.toLowerCase().includes(searchLower) ||
          org.email?.toLowerCase().includes(searchLower) ||
          org.mobile?.toLowerCase().includes(searchLower)
        );
      }

      state.filteredOrganizations = filtered;
      state.pagination.totalPages = Math.ceil(
        filtered.length / state.pagination.itemsPerPage
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizations = action.payload;
        state.filteredOrganizations = action.payload;
        state.error = null;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Organization
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.organizations = state.organizations.filter(
          org => org._id !== action.payload
        );
        state.filteredOrganizations = state.filteredOrganizations.filter(
          org => org._id !== action.payload
        );
      })

      // Update Organization Status
      .addCase(updateOrganizationStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.organizations = state.organizations.map(org =>
          org._id === id ? { ...org, approvalStatus: status } : org
        );
        state.filteredOrganizations = state.filteredOrganizations.map(org =>
          org._id === id ? { ...org, approvalStatus: status } : org
        );
      });
  }
});

export const {
  setFilters,
  setActiveFilters,
  setSearchQuery,
  setPagination,
  setModal,
  clearFilters,
  filterOrganizations
} = organizationListSlice.actions;

export default organizationListSlice.reducer;