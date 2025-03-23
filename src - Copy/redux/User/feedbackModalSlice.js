import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";



export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_API_URL}/user/feedback`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to submit feedback");
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async ({ feedbackId, formData }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.put(`${BASE_API_URL}/user/feedback/${feedbackId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update feedback");
    }
  }
);

const feedbackModalSlice = createSlice({
  name: "feedbackModal",
  initialState: {
    formData: {
      userId: "",
      feedbackCategory: "",
      feedbackMessage: "",
      rating: 0,
      recommend: false,
      suggestions: "",
    },
    loading: false,
    error: null,
    isSuccess: false,
  },
  reducers: {
    setFeedbackFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFeedbackForm: (state) => {
      state.formData = {
        userId: "",
        feedbackCategory: "",
        feedbackMessage: "",
        rating: 0,
        recommend: false,
        suggestions: "",
      };
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeedback.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFeedbackFormData, resetFeedbackForm } = feedbackModalSlice.actions;
export default feedbackModalSlice.reducer;
