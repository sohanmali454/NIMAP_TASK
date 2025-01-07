import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  getCategoriesWithPagination,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getCategories", getCategories);
router.get("/getCategoriesWithPagination", getCategoriesWithPagination);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;
