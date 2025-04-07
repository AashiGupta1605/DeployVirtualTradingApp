import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

// Async thunks
export const fetchUserEvents = createAsyncThunk(
  'events/fetchUserEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/my-events`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchEventPerformance = createAsyncThunk(
  'events/fetchEventPerformance',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/events/${eventId}/performance`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchEventSpecificTransactions = createAsyncThunk(
  'events/fetchEventSpecificTransactions',
  async ({ eventId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/${eventId}/transactions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  events: [],
  selectedEvent: null,
  activeEvent: null,
  eventPerformance: null,
  eventTransactions: [],
  status: 'idle',
  error: null,
  filters: {
    status: 'all',
    sortBy: 'startDate'
  },
  statistics: {
    activeEvents: 0,
    totalInvested: 0,
    completedEvents: 0,
    totalReturns: 0
  }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      if (!action.payload) {
        state.eventPerformance = null;
        state.eventTransactions = [];
      }
    },
    setActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
      if (action.payload) {
        localStorage.setItem('activeEvent', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('activeEvent');
      }
    },
    clearActiveEvent: (state) => {
      state.activeEvent = null;
      localStorage.removeItem('activeEvent');
    },
    setFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    updateEventStats: (state, action) => {
      const { eventId, stats } = action.payload;
      const eventIndex = state.events.findIndex(e => e._id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex] = {
          ...state.events[eventIndex],
          ...stats
        };
      }
    },
    calculateStatistics: (state) => {
      const now = new Date();
      state.statistics = {
        activeEvents: state.events.filter(e => 
          new Date(e.endDate) >= now && new Date(e.startDate) <= now
        ).length,
        totalInvested: state.events.reduce((sum, event) => 
          sum + (event.entryFee || 0), 0
        ),
        completedEvents: state.events.filter(e => 
          new Date(e.endDate) < now
        ).length,
        totalReturns: state.events.reduce((sum, event) => 
          sum + (event.currentPnL || 0), 0
        )
      };
    },
    loadActiveEventFromStorage: (state) => {
      const storedEvent = localStorage.getItem('activeEvent');
      if (storedEvent) {
        state.activeEvent = JSON.parse(storedEvent);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload.events || [];
        state.error = null;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEventPerformance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventPerformance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventPerformance = action.payload;
        state.error = null;
      })
      .addCase(fetchEventPerformance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEventSpecificTransactions.fulfilled, (state, action) => {
        state.eventTransactions = action.payload.transactions || [];
      });
  }
});

// Export actions
export const {
  setSelectedEvent,
  setActiveEvent,
  clearActiveEvent,
  setFilter,
  setSortBy,
  updateEventStats,
  calculateStatistics,
  loadActiveEventFromStorage
} = eventsSlice.actions;

// Export selectors
export const selectAllEvents = (state) => state.user.events?.events || [];
export const selectActiveEvents = createSelector(
  [(state) => state.user.events?.events || []],
  (events) => {
    const now = new Date();
    return events.filter(event => 
      new Date(event.endDate) >= now && 
      new Date(event.startDate) <= now
    );
  }
);
export const selectActiveEvent = (state) => state.user.events?.activeEvent;
export const selectSelectedEvent = (state) => state.user.events?.selectedEvent;
export const selectEventPerformance = (state) => state.user.events?.eventPerformance;
export const selectEventTransactions = (state) => state.user.events?.eventTransactions || [];
export const selectEventStatus = (state) => state.user.events?.status || 'idle';
export const selectEventError = (state) => state.user.events?.error;
export const selectEventFilters = (state) => state.user.events?.filters || initialState.filters;
export const selectEventStatistics = (state) => state.user.events?.statistics || initialState.statistics;

export default eventsSlice.reducer;