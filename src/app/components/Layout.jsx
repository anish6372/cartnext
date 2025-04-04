"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaPhoneAlt,
  FaHeart,
  FaShoppingCart,
  FaShippingFast,
  FaUndoAlt,
  FaLock,
  FaHeadset,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaMoon,FaSun
} from "react-icons/fa";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  const isProductDetailsPage = pathname.includes("/product");
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <header className="w-full shadow-md">
      
        
        <div className="bg-red-600 text-white text-xs sm:text-sm py-2 px-4 flex flex-wrap justify-between items-center">
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
            <span>About</span>
            <span>My Account</span>
            <span>Wishlist</span>
            <span>Checkout</span>
          </div>
          <span className="text-center hidden sm:block">Free shipping for all orders of $50+</span>
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
            <span>Store Location</span>
            <span>Language ▼</span>
            <span>Currency ▼</span>
          </div>
        </div>

        
        <div className="flex flex-wrap justify-between items-center p-4 bg-white">
          <h1 className="text-lg sm:text-xl font-bold text-red-600">ROISER</h1>

          <div className="flex border rounded overflow-hidden w-full sm:w-auto mt-2 sm:mt-0 text-sm">
            <select className="border-r px-2 py-1 sm:py-2 bg-gray-100 text-xs sm:text-sm">
              <option>All Categories</option>
            </select>
            <input
              type="text"
              placeholder="Search Keywords..."
              className="px-2 py-1 sm:py-2 focus:outline-none flex-grow text-xs sm:text-sm"
            />
            <button className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              SEARCH
            </button>
          </div>

        
          <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <FaPhoneAlt className="text-gray-500 text-sm sm:text-base" />
              <span className="text-gray-600 hidden sm:block">Call Us Now:</span>
              <span className="font-bold">+258 2159-2159</span>
            </div>
            <div className="flex items-center">
              <FaHeart className="text-gray-500 text-sm sm:text-lg" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 relative">
              <FaShoppingCart className="text-gray-500 text-sm sm:text-lg" />
              <span className="font-bold">$1280.00</span>
            </div>

           
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              {darkMode ? <FaSun className="text-yellow-500 text-lg" /> : <FaMoon className="text-gray-700 text-lg" />}
            </button>
          </div>
        </div>

       
        <nav className="bg-black text-white py-3">
          <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-base">
              <span>HOME</span>
              <span>SHOP</span>
              <span>WOMEN</span>
              <span>MEN</span>
              <span>PAGES</span>
              <span>BLOG</span>
              <span>CONTACT</span>
            </div>
            <div className="flex items-center bg-red-600 text-white px-4 sm:px-6 py-2 rounded mt-2 sm:mt-0 gap-2 text-xs sm:text-sm">
              <span className="whitespace-nowrap">Get 30% Discount Now</span>
              <span className="bg-amber-100 text-black px-2 py-1 rounded-xl">SALE</span>
            </div>
          </div>
        </nav>

       
        {(isCartPage || isProductDetailsPage) && (
          <section className={`py-10 sm:py-20 ${darkMode ? "bg-gray-900 text-white" : "bg-pink-100"}`}>
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-2 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {isCartPage ? "Cart Page" : "Product Details"}
              </h2>
              <p className="text-sm text-gray-700">
                Home &gt; {isCartPage ? "Cart Page" : "Product Details"}
              </p>
            </div>
          </section>
        )}
      </header>

      <main className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;