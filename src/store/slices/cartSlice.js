import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false, // For controlling the slide-over cart drawer
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    addToCart(state, action) {
      const newItem = action.payload; // { id, name, price, color, size, quantity }
      const itemKey = `${newItem.id}-${newItem.color}-${newItem.size}`;
      const existingItem = state.items.find((item) => `${item.id}-${item.color}-${item.size}` === itemKey);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
      
      state.totalQuantity += newItem.quantity || 1;
      state.totalAmount += newItem.price * (newItem.quantity || 1);
    },
    removeFromCart(state, action) {
      const { id, color, size } = action.payload;
      const itemKey = `${id}-${color}-${size}`;
      const existingItem = state.items.find((item) => `${item.id}-${item.color}-${item.size}` === itemKey);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => `${item.id}-${item.color}-${item.size}` !== itemKey);
      }
    },
    updateQuantity(state, action) {
      const { id, color, size, quantity } = action.payload; // quantity should be final new quantity
      const itemKey = `${id}-${color}-${size}`;
      const existingItem = state.items.find((item) => `${item.id}-${item.color}-${item.size}` === itemKey);

      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
