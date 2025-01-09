import Category from "../../category/models/categoryModel.js";
import Product from "../../product/models/productModel.js";
import { errorResponse } from "../../../utils/errorResponse/errorResponse.js";
import { successResponse } from "../../../utils/successResponse/successResponse.js";
import { MESSAGES } from "../utils/messages/messages.js";
import { STATUS_CODES } from "../utils/statusCodes/statusCodes.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { productName, categoryId } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.CATEGORY_NOT_FOUND
      );
    }

    const product = await Product.create({ productName, categoryId });
    successResponse(
      res,
      STATUS_CODES.CREATED,
      "Product created successfully",
      product
    );
  } catch (error) {
    console.error("Error creating product:", error);
    errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_CREATING_PRODUCT,
      error
    );
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["categoryName", "categoryId"],
      },
    });

    if (products.length === 0) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.NO_PRODUCTS_FOUND
      );
    }

    successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Products fetched successfully",
      products
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_FETCHING_PRODUCTS,
      error
    );
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, categoryId } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.CATEGORY_NOT_FOUND
      );
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    product.productName = productName || product.productName;
    product.categoryId = categoryId || product.categoryId;
    await product.save();

    successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Product updated successfully",
      product
    );
  } catch (error) {
    console.error("Error updating product:", error);
    errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_UPDATING_PRODUCT,
      error
    );
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    await product.destroy();
    successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCT_DELETED_SUCCESSFULLY
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_DELETING_PRODUCT,
      error
    );
  }
};

// GET PRODUCTS WITH PAGINATION
export const getProductsWithPagination = async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    if (isNaN(page) || isNaN(pageSize)) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.INVALID_PAGE_SIZE
      );
    }

    const offset = (page - 1) * pageSize;

    const products = await Product.findAll({
      offset,
      limit: pageSize,
      include: {
        model: Category,
        attributes: ["categoryName", "categoryId"],
      },
    });

    if (products.length === 0) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.NO_PRODUCTS_FOUND
      );
    }

    successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Products fetched with pagination",
      products
    );
  } catch (error) {
    console.error("Error fetching products with pagination:", error);
    errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_FETCHING_PRODUCTS_PAGINATION,
      error
    );
  }
};
