import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "product_id", 
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name", 
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id", 
      },
      onDelete: "CASCADE",
      field: "category_id", 
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  }
);

export default Product;
