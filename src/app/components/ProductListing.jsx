"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 
import Layout from "./Layout";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = ["all", ...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter((p) => p.category === selectedCategory);
    }
    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else {
      updatedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductClick = (productId) => {
    router.push(`/product-details/${productId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <main>
          <h1 className="text-2xl font-bold mb-4 mt-6 text-center">Product Listing</h1>
          <div className="flex flex-wrap gap-4 mb-4 justify-center">
            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

         
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentItems.map((product) => (
              <motion.div
                key={product.id}
                className="border p-4 rounded shadow cursor-pointer"
                onClick={() => handleProductClick(product.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-2"
                  loading="lazy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-lg font-semibold truncate">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
              </motion.div>
            ))}
          </motion.div>

        
          <div className="flex justify-center mt-4 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ProductListing;