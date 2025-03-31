import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCart: (state, action) => {
      
      state.items = action.payload;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    applyCoupon: (state, action) => {
      if (action.payload === "roiser20") {
        state.discount = 10;
      } else {
        state.discount = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
    },
  },
});

export const { addToCart, updateQuantity, updateCart, removeFromCart, applyCoupon, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;