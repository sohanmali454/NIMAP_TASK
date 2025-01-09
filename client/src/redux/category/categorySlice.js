import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(
      "http://localhost:3000/api/categories/getCategories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data.data; 
  }
);


export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryName) => {
    const response = await fetch(
      "http://localhost:3000/api/categories/createCategory",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    return response.json();
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    if (!id) {
      throw new Error("Category ID is missing");
    }
    const response = await fetch(
      `http://localhost:3000/api/categories/deleteCategory/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    return id;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedName }) => {
    if (!id || !updatedName) {
      throw new Error("Category ID or updated name is missing");
    }

    const response = await fetch(
      `http://localhost:3000/api/categories/updateCategory/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: updatedName }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    return { id, updatedName };
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add category";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete category";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index].categoryName = action.payload.updatedName;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update category";
      });
  },
});

export default categorySlice.reducer;
