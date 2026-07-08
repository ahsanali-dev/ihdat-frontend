import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

export const fetchCustomOrders = createAsyncThunk(
  "customOrders/fetchCustomOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.CUSTOM_ORDERS);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch bespoke orders");
    }
  }
);

export const updateCustomOrderStatus = createAsyncThunk(
  "customOrders/updateCustomOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.CUSTOM_ORDERS}/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update bespoke order status");
    }
  }
);

export const deleteCustomOrder = createAsyncThunk(
  "customOrders/deleteCustomOrder",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_ENDPOINTS.CUSTOM_ORDERS}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete bespoke order request");
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const customOrderSlice = createSlice({
  name: "customOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchCustomOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orders.findIndex((o) => (o.id || o._id) === (updated.id || updated._id));
        if (index !== -1) {
          state.orders[index] = updated;
        }
      })
      .addCase(deleteCustomOrder.fulfilled, (state, action) => {
        const id = action.payload;
        state.orders = state.orders.filter((o) => (o.id || o._id) !== id);
      });
  },
});

export const customOrderActions = {
  ...customOrderSlice.actions,
  fetchCustomOrders,
  updateCustomOrderStatus,
  deleteCustomOrder,
};

export default customOrderSlice.reducer;
