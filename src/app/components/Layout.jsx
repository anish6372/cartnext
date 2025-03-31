"use client";
import { usePathname } from "next/navigation";
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
} from "react-icons/fa";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  const isProductDetailsPage = pathname.includes("/product");

  return (
    <div className="bg-white text-black min-h-screen">
      <header className="w-full shadow-md">
      
        <div className="bg-red-600 text-white text-sm py-2 px-4 flex flex-wrap justify-between items-center">
          <div className="flex gap-4 flex-wrap">
            <span>About</span>
            <span>My Account</span>
            <span>Wishlist</span>
            <span>Checkout</span>
          </div>
          <span className="text-center hidden sm:block">
            Free shipping for all orders of $50+
          </span>
          <div className="flex gap-4 flex-wrap">
            <span>Store Location</span>
            <span>Language ▼</span>
            <span>Currency ▼</span>
          </div>
        </div>

      
        <div className="flex flex-wrap justify-between items-center p-4 bg-white">
          <h1 className="text-xl font-bold text-red-600">ROISER</h1>
          <div className="flex border rounded overflow-hidden w-full sm:w-auto mt-2 sm:mt-0">
            <select className="border-r px-2 py-2 bg-gray-100">
              <option>All Categories</option>
            </select>
            <input
              type="text"
              placeholder="Search Keywords..."
              className="px-2 py-2 focus:outline-none flex-grow"
            />
            <button className="bg-red-600 text-white px-4 py-2">SEARCH HERE</button>
          </div>
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-500" />
              <span className="text-gray-600 hidden sm:block">Call Us Now:</span>
              <span className="font-bold">+258 2159-2159</span>
            </div>
            <div className="flex items-center">
              <FaHeart className="text-gray-500 text-lg" />
            </div>
            <div className="flex items-center gap-2 relative">
              <FaShoppingCart className="text-gray-500 text-lg" />
              <span className="font-bold">$1280.00</span>
            </div>
          </div>
        </div>

      
        <nav className="bg-black text-white py-3">
          <div className="flex justify-between items-center">
            <div className="container mx-auto flex flex-wrap justify-start gap-6 ms-4 text-sm sm:text-base">
              <span>HOME</span>
              <span>SHOP</span>
              <span>WOMEN</span>
              <span>MEN</span>
              <span>PAGES</span>
              <span>BLOG</span>
              <span>CONTACT</span>
            </div>

            <div className="flex items-center bg-red-600 text-white px-6 py-2 rounded mr-4 sm:mr-20 gap-2">
              <span className="whitespace-nowrap text-xs sm:text-sm">
                Get 30% Discount Now
              </span>
              <span className="bg-amber-100 text-black px-2 py-1 rounded-xl text-xs sm:text-sm">
                SALE
              </span>
            </div>
          </div>
        </nav>

     
        {(isCartPage || isProductDetailsPage) && (
          <section className="bg-pink-100 py-10 sm:py-20">
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

      <main>{children}</main>

     
      <footer className="bg-gray-100 text-gray-700 py-10 border-t w-full mt-12">
        <div className="px-6 lg:px-20">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center pb-6 mb-6 bg-gray-200">
            <div className="flex items-center space-x-2">
              <FaShippingFast className="text-red-500 text-2xl" />
              <div>
                <h4 className="font-bold">Free Shipping</h4>
                <p className="text-sm">Free shipping on orders over $65.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaUndoAlt className="text-red-500 text-2xl" />
              <div>
                <h4 className="font-bold">Free Returns</h4>
                <p className="text-sm">30-days free return policy.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaLock className="text-red-500 text-2xl" />
              <div>
                <h4 className="font-bold">Secured Payments</h4>
                <p className="text-sm">We accept all major credit cards.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeadset className="text-red-500 text-2xl" />
              <div>
                <h4 className="font-bold">Customer Service</h4>
                <p className="text-sm">Top-notch customer service.</p>
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bold mb-3">About Store</h4>
              <p className="text-red-500 font-bold text-lg">+258 3692 2569</p>
              <p>Monday - Friday: 8:00am - 8:00pm</p>
              <p>Saturday: 9:00am - 6:00pm</p>
              <p>Sunday: Service Close</p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Shop Categories</h4>
              <p>New Arrivals</p>
              <p>Best Selling</p>
              <p>Vegetables</p>
              <p>Fresh Meat</p>
              <p>Fresh Seafoods</p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Useful Links</h4>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>Contact Us</p>
              <p>Latest News</p>
              <p>Our Sitemap</p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Our Newsletter</h4>
              <p>Subscribe to receive updates on new arrivals and discounts.</p>
              <div className="mt-3 flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="p-2 border border-gray-400 rounded-l-md flex-grow focus:outline-none"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-r-md">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

        
          <div className="mt-8 text-center flex flex-col sm:flex-row justify-between border-t pt-4">
            <div className="flex justify-center sm:justify-start items-center mb-4 sm:mb-0">
              <p className="text-sm me-4">Payment System:</p>
              <div className="flex space-x-2">
                <FaCcVisa className="text-blue-600 text-2xl" />
                <FaCcMastercard className="text-red-600 text-2xl" />
                <FaCcPaypal className="text-blue-500 text-2xl" />
                <FaCcAmex className="text-indigo-600 text-2xl" />
              </div>
            </div>

            <div className="text-sm">
              <p>Copyright © 2024 eStore. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;