import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "../redux/category/categorySlice";

export default function ViewCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteCategory(id));
    setShowDeleteModal(false);
  };

  const handleUpdate = (id) => {
    setSelectedCategoryId(id);
    setShowUpdateModal(true);
  };

  const handleConfirmUpdate = () => {
    if (newCategoryName.trim()) {
      dispatch(
        updateCategory({ id: selectedCategoryId, updatedName: newCategoryName })
      );
      setShowUpdateModal(false);
      setNewCategoryName("");
    } else {
      alert("Category name cannot be empty");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-200">
        View Categories
      </h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">#</th>
            <th className="border border-gray-400 p-2">Category ID</th>
            <th className="border border-gray-400 p-2">Category Name</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, ind) => (
            <tr
              key={categories.categoryId}
              className="bg-white border border-gray-300"
            >
              <td className="border border-gray-400 p-2">{ind + 1}</td>
              <td className="border border-gray-400 p-2">
                {category.categoryId}
              </td>
              <td className="border border-gray-400 p-2">
                {category.categoryName}
              </td>
              <td className="border border-gray-400 p-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleUpdate(category.categoryId)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(category.categoryId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(selectedCategoryId)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl mb-4">Update Category Name</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border border-gray-400 p-2 mb-4 w-full"
              placeholder="Enter new category name"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
