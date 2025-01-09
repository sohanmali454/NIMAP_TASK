import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductsWithPagination,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getProductsWithPagination", getProductsWithPagination);
router.get("/getProducts", getProducts);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
