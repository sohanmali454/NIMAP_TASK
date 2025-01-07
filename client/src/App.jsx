import React, { useState } from "react";
import CategoryForm from "./componants/CategoryForm";
import ProductForm from "./componants/ProductForm";
import ViewCategory from "./componants/ViewCategory";
import ViewProduct from "./componants/ViewProduct";

export default function App() {
  const [activeCategoryComponent, setActiveCategoryComponent] = useState("");
  const [activeProductComponent, setActiveProductComponent] = useState("");

  const toggleCategoryComponent = (componentName) => {
    setActiveCategoryComponent((prev) =>
      prev === componentName ? "" : componentName
    );
  };

  const toggleProductComponent = (componentName) => {
    setActiveProductComponent((prev) =>
      prev === componentName ? "" : componentName
    );
  };

  return (
    <div className="flex justify-center flex-col text-center w-full bg-[#021317]">
      <div className="w-screen flex justify-center bg-[#05262E]  text-white font-bold">
        <h1 className="text-3xl py-3">Product Category Manager</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 h-24 w-full bg-[#021317]">
        <div className="w-full flex items-center justify-center gap-10">
          <button
            className="bg-[#05262E] h-16 w-56 p-3 font-bold rounded-bl-2xl rounded-tr-2xl text-white"
            onClick={() => toggleCategoryComponent("CategoryForm")}
          >
            Add Category
          </button>
          <button
            className="bg-[#05262E] h-16 w-56 p-3 font-bold rounded-bl-2xl rounded-tr-2xl text-white"
            onClick={() => toggleCategoryComponent("ViewCategory")}
          >
            View Category
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-10">
          <button
            className="bg-[#05262E] h-16 w-56 p-3 font-bold rounded-br-2xl rounded-tl-2xl text-white"
            onClick={() => toggleProductComponent("ProductForm")}
          >
            Add Product
          </button>
          <button
            className="bg-[#05262E] h-16 w-56 p-3 font-bold rounded-br-2xl rounded-tl-2xl text-white"
            onClick={() => toggleProductComponent("ViewProduct")}
          >
            View Product
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center bg-[#021317] p-5 h-[100vh] relative">
        <div className="grid grid-cols-2 gap-5 w-full absolute ">
          <div className="bg-[#05262E] p-5 ">
            {activeCategoryComponent === "CategoryForm" && <CategoryForm />}
            {activeCategoryComponent === "ViewCategory" && <ViewCategory />}
          </div>

          <div className="bg-[#05262E] p-5">
            {activeProductComponent === "ProductForm" && <ProductForm />}
            {activeProductComponent === "ViewProduct" && <ViewProduct />}
          </div>
        </div>
      </div>
    </div>
  );
}
