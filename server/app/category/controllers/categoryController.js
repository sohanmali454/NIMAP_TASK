import Category from "../models/categoryModel.js";
import { errorResponse } from "../../../utils/errorResponse/errorResponse.js";
import { successResponse } from "../../../utils/successResponse/successResponse.js";
import { STATUS_CODES } from "../utils/statusCodes/statusCodes.js";
import { MESSAGES } from "../utils/messages/messages.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.CATEGORY_NAME_REQUIRED
      );
    }

    const newCategory = await Category.create({ categoryName });
    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.CATEGORY_CREATED_SUCCESS,
      newCategory
    );
  } catch (error) {
    console.error("Error creating category:", error.message);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_CREATING_CATEGORY,
      error.message
    );
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return successResponse(
      res,
      STATUS_CODES.OK,
      MESSAGES.CATEGORIES_FETCHED_SUCCESS,
      categories
    );
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_FETCHING_CATEGORIES,
      error.message
    );
  }
};

// GET CATEGORIES WITH PAGINATION
export const getCategoriesWithPagination = async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    if (isNaN(page) || isNaN(pageSize)) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.INVALID_PAGINATION_PARAMS
      );
    }

    const offset = (page - 1) * pageSize;

    const categories = await Category.findAndCountAll({
      offset,
      limit: pageSize,
    });

    const response = {
      totalRecords: categories.count,
      totalPages: Math.ceil(categories.count / pageSize),
      currentPage: page,
      pageSize,
      categories: categories.rows,
    };

    return successResponse(
      res,
      STATUS_CODES.OK,
      MESSAGES.CATEGORIES_FETCHED_SUCCESS,
      response
    );
  } catch (error) {
    console.error("Error fetching categories with pagination:", error.message);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_FETCHING_CATEGORIES,
      error.message
    );
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.CATEGORY_NOT_FOUND
      );
    }

    category.categoryName = categoryName;
    await category.save();

    return successResponse(
      res,
      STATUS_CODES.OK,
      MESSAGES.CATEGORY_UPDATED_SUCCESS,
      category
    );
  } catch (error) {
    console.error("Error updating category:", error.message);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_UPDATING_CATEGORY,
      error.message
    );
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        MESSAGES.CATEGORY_NOT_FOUND
      );
    }

    await category.destroy();

    return successResponse(
      res,
      STATUS_CODES.OK,
      MESSAGES.CATEGORY_DELETED_SUCCESS
    );
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.ERROR_DELETING_CATEGORY,
      error.message
    );
  }
};
