import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import themeReducer from "./slices/themeSlice"; // Import themeReducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer, // Add themeReducer
  },
});

export default store;
