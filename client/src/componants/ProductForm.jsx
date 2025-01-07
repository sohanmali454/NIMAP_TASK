// src/components/ProductForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/product/productSlice";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { productName, categoryId };

    try {
      const response = await dispatch(addProduct(productData));

      if (response.payload) {
        console.log("Product added successfully:", response.payload);
        setShowPopup(true);

        setProductName("");
        setCategoryId("");

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="categoryId"
              className="block text-gray-700 font-semibold mb-1"
            >
              Category ID
            </label>
            <input
              type="text"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter category ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed top-10 right-10 bg-green-500 text-white rounded-lg shadow-lg p-4 flex items-center space-x-3 animate-fade-in">
          <span className="text-lg font-semibold">
            ✅ Product Added Successfully!
          </span>
          <button
            className="bg-white text-green-500 p-1 rounded-full hover:bg-green-700 hover:text-white transition"
            onClick={() => setShowPopup(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
