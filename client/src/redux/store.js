import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/category/categorySlice";
import productReducer from "../redux/product/productSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
  },
});
