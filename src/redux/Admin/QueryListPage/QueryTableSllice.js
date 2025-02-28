import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Centralized API calls
const contactService = {
  fetchAll: async () => {
    const [contacts, orgs, users] = await Promise.all([
      axios.get(`${BASE_API_URL}/contact`),
      axios.get(`${BASE_API_URL}/organization/display-all-org`),
      axios.get(`${BASE_API_URL}/user/display-users`),
    ]);

    return {
      contacts: contacts.data,
      orgCount: orgs.data.length,
      userCount: users.data.length
    };
  },

  delete: (contactId) =>
    axios.delete(`${BASE_API_URL}/contact/${contactId}`)
};

// Async Thunks with simplified error handling
export const fetchContacts = createAsyncThunk(
  'adminQueryTable/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await contactService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Data fetch failed");
    }
  }
);

export const deleteContact = createAsyncThunk(
  'adminQueryTable/deleteContact',
  async (contactId, { dispatch, rejectWithValue }) => {
    try {
      await contactService.delete(contactId);
      await dispatch(fetchContacts());
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// Simplified Slice
const adminQueryTableSlice = createSlice({
  name: 'adminQueryTable',
  initialState: {
    contacts: [],
    orgCount: 0,
    userCount: 0,
    status: 'idle',
    error: null,
    isDeleting: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const { contacts, orgCount, userCount } = action.payload;
        state.status = 'succeeded';
        state.contacts = contacts;
        state.orgCount = orgCount;
        state.userCount = userCount;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.isDeleting = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectContacts = (state) => state.adminQueryTable.contacts;
export const selectOrgCount = (state) => state.adminQueryTable.orgCount;
export const selectUserCount = (state) => state.adminQueryTable.userCount;
export const selectStatus = (state) => state.adminQueryTable.status;
export const selectError = (state) => state.adminQueryTable.error;
export const selectIsDeleting = (state) => state.adminQueryTable.isDeleting;

export const { clearError } = adminQueryTableSlice.actions;
export default adminQueryTableSlice.reducer;