import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";

const Category = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "category_id",
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "category_name",
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
  }
);

export default Category;
