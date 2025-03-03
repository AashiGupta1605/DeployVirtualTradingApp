
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_API_URL } from "../../../utils/BaseUrl";

// // Fetch organization user feedbacks
// export const fetchOrganizationFeedbacks = createAsyncThunk(
//   "feedbacks/fetchOrganizationFeedbacks",
//   async ({ orgName, page, limit, search, startDate, endDate }) => {
//     const response = await axios.get(`${BASE_API_URL}/user/${orgName}/users/feedbacks`, {
//       params: { page, limit, search, startDate, endDate },
//     });
//     return response.data;
//   }
// );

// // Delete organization user feedback
// export const deleteOrganizationFeedback = createAsyncThunk(
//   "feedbacks/deleteOrganizationFeedback",
//   async (id) => {
//     await axios.delete(`${BASE_API_URL}/user/delete/feedbacks/${id}`);
//     return id; // Return the deleted feedback ID
//   }
// );

// const feedbacksSlice = createSlice({
//   name: "feedbacks",
//   initialState: {
//     feedbacks: [],
//     loading: false,
//     currentPage: 1,
//     totalPages: 1,
//     itemsPerPage: 10,
//     searchTerm: "",
//     startDate: null,
//     endDate: null,
//     error: null,
//   },
//   reducers: {
//     setCurrentPage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//     setItemsPerPage: (state, action) => {
//       state.itemsPerPage = action.payload;
//     },
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//     setStartDate: (state, action) => {
//       state.startDate = action.payload;
//     },
//     setEndDate: (state, action) => {
//       state.endDate = action.payload;
//     },
//     clearFilters: (state) => {
//       state.searchTerm = "";
//       state.startDate = null;
//       state.endDate = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrganizationFeedbacks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrganizationFeedbacks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.feedbacks = action.payload.feedbacks;
//         state.totalPages = action.payload.totalPages;
//         state.currentPage = action.payload.currentPage;
//       })
//       .addCase(fetchOrganizationFeedbacks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(deleteOrganizationFeedback.fulfilled, (state, action) => {
//         state.feedbacks = state.feedbacks.filter((feedback) => feedback._id !== action.payload);
//       });
//   },
// });

// export const {
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   clearFilters,
// } = feedbacksSlice.actions;

// export default feedbacksSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

// Fetch organization user feedbacks
export const fetchOrganizationFeedbacks = createAsyncThunk(
  "feedbacks/fetchOrganizationFeedbacks",
  async ({ orgName, page, limit, search, startDate, endDate }) => {
    const response = await axios.get(`${BASE_API_URL}/user/${orgName}/users/feedbacks`, {
      params: { page, limit, search, startDate, endDate },
    });
    return response.data;
  }
);

// Delete organization user feedback
export const deleteOrganizationFeedback = createAsyncThunk(
  "feedbacks/deleteOrganizationFeedback",
  async (id) => {
    await axios.delete(`${BASE_API_URL}/user/delete/feedbacks/${id}`);
    return id; // Return the deleted feedback ID
  }
);

export const updateFeedbackStatus = createAsyncThunk(
  "feedbacks/updateFeedbackStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/user/update/feedbacks/${id}`, { status });
      return response.data; // Return the updated feedback
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// organization feedback ---

export const registerOrganizationFeedback = createAsyncThunk(
  "feedbacks/registerOrganizationFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/user/feedback/register`, feedbackData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch organization feedback
export const fetchOrganizationFeedback = createAsyncThunk(
  "feedbacks/fetchOrganizationFeedback",
  async ({ orgName, page, limit, search, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/${orgName}/feedback`, {
        params: { page, limit, search, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbacks: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    searchTerm: "",
    startDate: null,
    endDate: null,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.startDate = null;
      state.endDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchOrganizationFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload.feedbacks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchOrganizationFeedbacks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrganizationFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter((feedback) => feedback._id !== action.payload);
      })
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        const updatedFeedback = action.payload.feedback;
        const index = state.feedbacks.findIndex((feedback) => feedback._id === updatedFeedback._id);
        if (index !== -1) {
          state.feedbacks[index] = updatedFeedback; // Update the feedback in the list
        }
      })
      .addCase(registerOrganizationFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerOrganizationFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.unshift(action.payload.feedback); // Add new feedback to the top
      })
      .addCase(registerOrganizationFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchOrganizationFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload.feedbacks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchOrganizationFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  clearFilters,
} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;