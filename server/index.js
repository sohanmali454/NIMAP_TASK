import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import Category from "./models/categoryModel.js";
import Product from "./models/productModel.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "categoryId",
});
Category.hasMany(Product, {
  foreignKey: "categoryId",
  sourceKey: "categoryId",
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models synced successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
