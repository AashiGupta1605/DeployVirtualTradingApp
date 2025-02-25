// src/Admin/adminQueryTableSlice.js
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
    // Fetch Contacts
    builder
      .addCase(fetchContacts.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const { contacts, orgCount, userCount } = action.payload;
        state.status = 'succeeded';
        state.contacts = contacts;
        state.orgCount = orgCount;
        state.userCount = userCount;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Contact
      .addCase(deleteContact.pending, (state) => { 
        state.isDeleting = true; 
      })
      .addCase(deleteContact.fulfilled, (state) => { 
        state.isDeleting = false; 
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = adminQueryTableSlice.actions;
export default adminQueryTableSlice.reducer;