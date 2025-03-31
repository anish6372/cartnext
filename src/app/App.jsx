import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./store"; 
import ProductListing from "./components/ProductListing";
import ProductDetails from "./product-details/[id]/page";
import Cart from "./cart/page";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;