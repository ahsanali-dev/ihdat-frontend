import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

// Async thunks for orders operations
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.ORDERS}/${orderId}`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order status");
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((ord) => ord.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
  },
});

export const orderActions = {
  ...orderSlice.actions,
  fetchOrders,
  createOrder,
  updateOrderStatus,
};
export default orderSlice.reducer;
