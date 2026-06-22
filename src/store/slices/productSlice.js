import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

// Async thunks for catalog operations
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product");
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { id, ...updatedFields } = productData;
      const response = await api.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, updatedFields);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to edit product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex((prod) => prod.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        state.products = state.products.filter((prod) => prod.id !== id);
      });
  },
});

export const productActions = {
  ...productSlice.actions,
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
export default productSlice.reducer;
