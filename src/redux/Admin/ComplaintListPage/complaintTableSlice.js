import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { toast } from 'react-hot-toast';

// Async thunks
export const fetchComplaints = createAsyncThunk(
  'admin/complaintTable/fetchComplaints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/complaint/admin`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch complaints';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteComplaint = createAsyncThunk(
  'admin/complaintTable/deleteComplaint',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_API_URL}/user/complaint/admin/${id}`);
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete complaint';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateComplaintStatus = createAsyncThunk(
  'admin/complaintTable/updateComplaintStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/user/complaint/admin/${id}/status`,
        { status }
      );
      return { id, updatedComplaint: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update status';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const filterComplaints = (complaints, filters) => {
  return complaints.filter(complaint => {
    if (filters.status && filters.status !== 'all') {
      if (complaint.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    if (filters.type && filters.type !== 'all') {
      if (complaint.type?.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchFields = [
        complaint.userId?.name,
        complaint.userId?.email,
        complaint.message,
        complaint.status,
        complaint.type
      ].filter(Boolean);

      return searchFields.some(field =>
        field.toString().toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

const initialState = {
  complaints: [],
  filteredComplaints: [],
  filters: {
    status: 'all',
    type: 'all',
    search: ''
  },
  loading: false,
  error: null,
  isDeleting: false,
  isUpdating: false,
  lastUpdated: null
};

const complaintTableSlice = createSlice({
  name: 'admin/complaintTable',
  initialState,
  reducers: {
    setComplaintFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredComplaints = filterComplaints(state.complaints, state.filters);
    },
    clearComplaintFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredComplaints = state.complaints;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data;
        state.filteredComplaints = filterComplaints(action.payload.data, state.filters);
        state.lastUpdated = Date.now();
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComplaint.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.complaints = state.complaints.filter(
          complaint => complaint._id !== action.payload
        );
        state.filteredComplaints = filterComplaints(state.complaints, state.filters);
      })
      .addCase(deleteComplaint.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(updateComplaintStatus.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.complaints.findIndex(
          c => c._id === action.payload.id
        );
        if (index !== -1) {
          state.complaints[index] = action.payload.updatedComplaint;
          state.filteredComplaints = filterComplaints(state.complaints, state.filters);
        }
      })
      .addCase(updateComplaintStatus.rejected, (state) => {
        state.isUpdating = false;
      });
  }
});

export const {
  setComplaintFilters,
  clearComplaintFilters
} = complaintTableSlice.actions;

export const selectComplaints = state => state.admin.complaintTable.filteredComplaints;
export const selectAllComplaints = state => state.admin.complaintTable.complaints;
export const selectComplaintLoading = state => state.admin.complaintTable.loading;
export const selectComplaintError = state => state.admin.complaintTable.error;
export const selectComplaintDeleting = state => state.admin.complaintTable.isDeleting;
export const selectComplaintUpdating = state => state.admin.complaintTable.isUpdating;
export const selectComplaintFilters = state => state.admin.complaintTable.filters;

export default complaintTableSlice.reducer;
