import Category from "../models/categoryModel.js";
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = await Category.create({ categoryName });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (categoryName) {
      category.categoryName = categoryName;
    }

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error.message);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

export const getCategoriesWithPagination = async (req, res) => {
  try {
    let { page = 1, pageSize = 10 } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    if (isNaN(page) || isNaN(pageSize)) {
      return res
        .status(400)
        .json({ message: "Page and pageSize must be valid numbers" });
    }

    const offset = (page - 1) * pageSize;

    console.log(
      `Fetching categories: page=${page}, pageSize=${pageSize}, offset=${offset}`
    );

    const categories = await Category.findAll({
      offset: offset,
      limit: pageSize,
    });

    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No categories found for the given page" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories with pagination:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};
