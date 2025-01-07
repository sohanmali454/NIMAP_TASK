import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../redux/category/categorySlice";

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName));
      setCategoryName("");
    }
  };

  return (
    <div className="flex items-center justify-center p-5 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="categoryName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
