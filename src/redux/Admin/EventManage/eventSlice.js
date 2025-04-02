import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';
import { toast } from 'react-hot-toast';

// Centralized API calls
const eventService = {
  fetchAll: async () => {
    const response = await axios.get(`${BASE_API_URL}/admin/events`);
    return {
      events: response.data.events
    };
  },
  create: async (eventData) => {
    const response = await axios.post(`${BASE_API_URL}/admin/events`, eventData);
    return response.data.event;
  },
  update: async (eventId, eventData) => {
    const response = await axios.put(`${BASE_API_URL}/admin/events/${eventId}`, eventData);
    return response.data.event;
  },
  delete: async (eventId) => {
    await axios.delete(`${BASE_API_URL}/admin/events/${eventId}`);
    return eventId;
  }
};

// Async Thunks
export const fetchEvents = createAsyncThunk(
  'adminEventTable/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await eventService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Events fetch failed");
    }
  }
);

export const createEvent = createAsyncThunk(
  'adminEventTable/createEvent',
  async (eventData, { dispatch, rejectWithValue }) => {
    try {
      // Log the exact data being sent
      console.log('Creating event with data:', eventData);

      // Validate and prepare the data
      const preparedData = {
        title: eventData.title,
        type: eventData.type,
        description: eventData.description,
        startDate: new Date(eventData.startDate),
        endDate: new Date(eventData.endDate),
        prize: eventData.prize,
        difficulty: eventData.difficulty,
        entryFee: Number(eventData.entryFee) || 0,
        // Add other required fields with default values or validations
        participants: 0,
        cashbackPercentage: 0,
        rewards: [],
        prizeBreakdown: [],
        requirements: '',
        progress: 0,
        progressText: '',
        icon: 'Trophy',
        backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        highlight: '',
        // Add rewardTiers with default values if not provided
        rewardTiers: eventData.rewardTiers || [
          {
            tier: '5%+ Gain',
            description: '50% of entry fee returned'
          },
          {
            tier: '10%+ Gain',
            description: 'Full entry fee returned + bonus from prize pool'
          },
          {
            tier: '20%+ Gain',
            description: '200% of entry fee + larger bonus from prize pool'
          }
        ]
      };

      // Preserve any additional fields that might be in eventData
      const additionalFields = Object.keys(eventData).reduce((acc, key) => {
        if (!(key in preparedData)) {
          acc[key] = eventData[key];
        }
        return acc;
      }, {});

      const finalData = {
        ...preparedData,
        ...additionalFields
      };

      const response = await axios.post(`${BASE_API_URL}/admin/events`, finalData);
      
      toast.success('Event created successfully!');
      dispatch(fetchEvents());
      return response.data.event;
    } catch (error) {
      // Log the full error for debugging
      console.error('Event creation error:', error.response?.data || error.message);
      
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Event creation failed"
      );
      
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Event creation failed"
      );
    }
  }
);

export const updateEvent = createAsyncThunk(
  'adminEventTable/updateEvent',
  async ({ eventId, eventData }, { dispatch, rejectWithValue }) => {
    try {
      const updatedEvent = await eventService.update(eventId, eventData);
      toast.success('Event updated successfully!');
      dispatch(fetchEvents());
      return updatedEvent;
    } catch (error) {
      toast.error(error.response?.data?.message || "Event update failed");
      return rejectWithValue(error.response?.data?.message || "Event update failed");
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'adminEventTable/deleteEvent',
  async (eventId, { dispatch, rejectWithValue }) => {
    try {
      await eventService.delete(eventId);
      toast.success('Event deleted successfully!');
      dispatch(fetchEvents());
      return eventId;
    } catch (error) {
      toast.error(error.response?.data?.message || "Event deletion failed");
      return rejectWithValue(error.response?.data?.message || "Event deletion failed");
    }
  }
);

// Initial State
const initialState = {
  events: [],
  status: 'idle',
  error: null,
  isLoading: false
};

// Slice
const adminEventTableSlice = createSlice({
  name: 'adminEventTable',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload.events;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { clearError } = adminEventTableSlice.actions;

// Selectors
export const selectEvents = (state) => state.admin.eventTable.events;
export const selectEventsStatus = (state) => state.admin.eventTable.status;
export const selectEventsError = (state) => state.admin.eventTable.error;
export const selectEventsLoading = (state) => state.admin.eventTable.isLoading;

export default adminEventTableSlice.reducer;