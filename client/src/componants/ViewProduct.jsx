import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../redux/product/productSlice";

const ViewProduct = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({ id: editProduct.productId, productData: editProduct })
    );
    setEditProduct(null);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">View Products</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">#</th>
            <th className="border border-gray-400 p-2">Product ID</th>
            <th className="border border-gray-400 p-2">Product Name</th>
            <th className="border border-gray-400 p-2">Category ID</th>
            <th className="border border-gray-400 p-2">Category Name</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, ind) => (
              <tr
                key={product.productId}
                className="bg-white border border-gray-300"
              >
                <td className="border border-gray-400 p-2">{ind + 1}</td>
                <td className="border border-gray-400 p-2">
                  {product.productId}
                </td>
                <td className="border border-gray-400 p-2">
                  {product.productName}
                </td>
                <td className="border border-gray-400 p-2">
                  {product.categoryId}
                </td>
                <td className="border border-gray-400 p-2">
                  {product.Category?.categoryName}
                </td>
                <td className="border border-gray-400 p-2">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full"
                  value={editProduct.productName}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      productName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full"
                  value={editProduct.Category?.categoryName}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      Category: {
                        ...editProduct.Category,
                        categoryName: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
