import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

// Asynchronous login thunk using axios
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH_LOGIN, { email, password });
      const { token } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid administrator email or password."
      );
    }
  }
);

const initialState = {
  isAdminLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.isAdminLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }
    },
    clearAuthError(state) {
      state.error = null;
    },
    checkAdminAuth(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");
        state.isAdminLoggedIn = !!token;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAdminLoggedIn = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authActions = { ...authSlice.actions, loginAdmin };
export default authSlice.reducer;
