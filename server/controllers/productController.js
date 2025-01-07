import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

//CREATE   PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { productName, categoryId } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const product = await Product.create({ productName, categoryId });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

//GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["categoryName"],
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//UPDATE PRODUCTS
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, categoryId } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productName = productName || product.productName;
    product.categoryId = categoryId || product.categoryId;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

//DELETE PRODUCTS
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

//GET PRODUCTS WITH PAGINATION
export const getProductsWithPagination = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

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

    const product = await Product.findAll({
      offset: offset,
      limit: pageSize,
    });

    if (product.length === 0) {
      return res
        .status(404)
        .json({ message: "No categories found for the given page" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching categories with pagination:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};
