"use client";

import { useSelector, useDispatch } from "react-redux";
import { updateCart, applyCoupon, clearCart } from "../slices/cartSlice";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);
  const dispatch = useDispatch();

  const [tempCart, setTempCart] = useState([]);

  useEffect(() => {
    setTempCart([...cart]);
  }, [cart]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - (subtotal * discount) / 100;
  const freeShippingThreshold = 50;

  const remainingAmount = Math.max(0, freeShippingThreshold - total);

  const handleQuantityChange = (productId, quantity) => {
    setTempCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleRemove = (productId) => {
    setTempCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleApplyCoupon = (couponCode) => {
    dispatch(applyCoupon(couponCode));
  };

  const handleUpdateCart = () => {
    dispatch(updateCart(tempCart));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setTempCart([]);
  };

  return (
    <Layout>
      <motion.div
        className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
       
        <motion.div
          className="col-span-2 border p-4 rounded bg-white shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
         
          <div className="border-b py-2 text-red-500 text-sm">
            Add <span className="font-bold">${remainingAmount.toFixed(2)}</span> to cart and get free shipping
            <div className="w-full bg-gray-200 rounded h-2 mt-2">
              <motion.div
                className="bg-red-500 h-2 rounded"
                style={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

   
          <div className="grid grid-cols-5 text-gray-600 font-semibold border-b py-2 mt-4 hidden sm:grid">
            <p className="col-span-2">Products</p>
            <p>Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Subtotal</p>
          </div>

       
          {tempCart.map((item) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-5 items-center border-b py-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
            
              <div className="flex items-center col-span-2 gap-4">
                <motion.img
                  src={item.image || "/images/placeholder.png"}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="font-semibold text-sm sm:text-base">{item.title}</p>
              </div>

             
              <p className="text-gray-600 hidden sm:block">
                <span className="line-through text-gray-400">${item.originalPrice}</span>{' '}
                <span className="text-black font-bold">${item.price}</span>
              </p>

             
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <span>{item.quantity}</span>
                <motion.button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>

             
              <p className="font-semibold hidden sm:block">${(item.price * item.quantity).toFixed(2)}</p>

             
              <motion.button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 font-bold text-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                X
              </motion.button>
            </motion.div>
          ))}

          
          <div className="flex flex-wrap mt-4 gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-grow p-2 border rounded w-full sm:w-auto"
            />
            <motion.button
              onClick={() => handleApplyCoupon("roiser20")}
              className="px-4 py-2 bg-black text-white rounded w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Coupon
            </motion.button>
            <motion.button
              onClick={handleUpdateCart}
              className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Cart
            </motion.button>
          </div>
        </motion.div>

       
        <motion.div
          className="border p-4 rounded bg-white shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Discount</p>
              <p>{discount}%</p>
            </div>
            <div className="border-t pt-4 flex flex-col gap-2">
              <p className="font-semibold mb-2">Shipping</p>
              <label className="flex items-center">
                <input type="radio" name="shipping" defaultChecked className="mr-2" /> Free Shipping
              </label>
              <label className="flex items-center">
                <input type="radio" name="shipping" className="mr-2" /> Flat Rate
              </label>
              <label className="flex items-center">
                <input type="radio" name="shipping" className="mr-2" /> Local Pickup
              </label>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
            <motion.button
              className="w-full py-2 bg-red-500 text-white rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Cart;