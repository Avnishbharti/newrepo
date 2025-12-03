import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/categories?userId=${userId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add categories"
      );
    }
  }
);

export const updateCategories = createAsyncThunk(
  "categories/updateCategories",
  async ({ id, userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/categories/${id}?userId=${userId}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update categories"
      );
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/categories/${id}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete categories"
      );
    }
  }
);

export const getAllSubCategoriesByCategoryId = createAsyncThunk(
  "getAllSubCategoriesByCategoryId",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/subcategories/category/${categoryId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to get subcategories"
      );
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "addSubCategory",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/subcategories?userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to add subcategories"
      );
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "updateSubCategory",
  async ({ id, userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/subcategories/${id}?userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to update subcategories"
      );
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/subcategories/${id}?userId=${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to delete subcategories"
      );
    }
  }
);

export const getServiceListBySubCategoryId = createAsyncThunk(
  "getServiceListBySubCategoryId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/services/public/subcategory/${id}/services`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch service"
      );
    }
  }
);

export const addService = createAsyncThunk(
  "addService",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/services?userId=${userId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to add service"
      );
    }
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async ({ id, userId, data }) => {
    try {
      const response = await api.put(
        `/api/services/${id}?userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "deleteService",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/services/${id}?userId=${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loading: "",
    categoryList: [],
    subcategoryList: [],
    serviceList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = "success";
      state.categoryList = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllSubCategoriesByCategoryId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getAllSubCategoriesByCategoryId.fulfilled,
      (state, action) => {
        state.loading = "success";
        state.subcategoryList = action.payload;
      }
    );
    builder.addCase(getAllSubCategoriesByCategoryId.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getServiceListBySubCategoryId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getServiceListBySubCategoryId.fulfilled,
      (state, action) => {
        state.loading = "success";
        state.serviceList = action.payload;
      }
    );
    builder.addCase(getServiceListBySubCategoryId.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default serviceSlice.reducer;
