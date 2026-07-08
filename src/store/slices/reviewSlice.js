import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.REVIEWS, {
        params: productId ? { productId } : {}
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// Async thunk to submit a review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.REVIEWS, reviewData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
  }
);

// Async thunk to fetch all reviews for admin
export const fetchAdminReviews = createAsyncThunk(
  "reviews/fetchAdminReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.REVIEWS}/admin`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admin reviews");
    }
  }
);

// Async thunk to toggle review approval
export const toggleReviewApproval = createAsyncThunk(
  "reviews/toggleReviewApproval",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.REVIEWS}/${id}/toggle-approve`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to toggle review approval");
    }
  }
);

// Async thunk to delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_ENDPOINTS.REVIEWS}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete review");
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  submitSuccess: false,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetSubmitStatus(state) {
      state.submitSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload || [];
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
        state.reviews.unshift(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.submitSuccess = false;
        state.error = action.payload;
      })
      // Fetch Admin Reviews
      .addCase(fetchAdminReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload || [];
      })
      .addCase(fetchAdminReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Review Approval
      .addCase(toggleReviewApproval.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.reviews.findIndex((rev) => (rev.id || rev._id) === (updated.id || updated._id));
        if (index !== -1) {
          state.reviews[index] = updated;
        }
      })
      // Delete Review
      .addCase(deleteReview.fulfilled, (state, action) => {
        const id = action.payload;
        state.reviews = state.reviews.filter((rev) => (rev.id || rev._id) !== id);
      });
  },
});

export const reviewActions = {
  ...reviewSlice.actions,
  fetchReviews,
  addReview,
  fetchAdminReviews,
  toggleReviewApproval,
  deleteReview,
};

export default reviewSlice.reducer;
