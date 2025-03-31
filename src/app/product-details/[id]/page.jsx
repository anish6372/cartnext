"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { addToCart } from "../../slices/cartSlice";
import Layout from "../../components/Layout";
import { FaShareAlt, FaQuestionCircle, FaBalanceScale, FaPlay, FaArrowDown } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      }
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    router.push("/cart");
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} of "${product.title}"!`);
  };

  return (
    <Layout>
      <motion.div
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <motion.div
            className="p-4 border rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="h-96 w-full object-contain"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

         
          <motion.div
            className="p-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-yellow-500 mb-2">★★★★☆ (4.5)</p>
            <p className="text-xl font-semibold text-red-500 mb-2">${product.price}</p>
            <p className="text-black text-sm mb-3">{product.description}</p>
            <p className="text-gray-600 mb-2">20 people viewing this right now</p>
            <div className="border-b mb-4"></div>
            <p className="text-gray-600 flex items-center gap-2 mb-2">
              <FaArrowDown className="text-red-500" />
              15 items left in stock
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <ul className="text-gray-600 space-y-2 mb-4">
              <li>✅ Free returns</li>
              <li>✅ Free delivery with DHL</li>
              <li>✅ All taxes included</li>
            </ul>

          
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <motion.button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <span>{quantity}</span>
              <motion.button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-amber-100 text-black rounded w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </div>

            
            <motion.div
              className="flex flex-wrap gap-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-red-500 text-white rounded w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy this item Now
              </motion.button>
            </motion.div>

           
            <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <FaShareAlt />
                <span>Share</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <FaQuestionCircle />
                <span>Ask a Question</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <FaBalanceScale />
                <span>Compare</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

     
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap space-x-4 border-b pb-2 mb-4">
            <button
              className={`text-sm font-semibold ${
                activeTab === "description" ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === "additional" ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("additional")}
            >
              Additional Information
            </button>
          </div>
          {activeTab === "description" && (
            <motion.div
              className="flex flex-col md:flex-row gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1">
                <p className="text-gray-600">
                  This is a detailed description of the product. It provides all the necessary
                  information about the product, including its features, benefits, and usage.
                </p>
              </div>
              <div className="flex items-center justify-center border rounded-lg h-40 w-full md:w-100 bg-gray-100">
                <button className="text-4xl text-gray-500">
                  <FaPlay />
                </button>
              </div>
            </motion.div>
          )}
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600">This is the reviews section. Customers can leave their feedback here.</p>
            </motion.div>
          )}
          {activeTab === "additional" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600">This is the additional information section about the product.</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ProductDetails;