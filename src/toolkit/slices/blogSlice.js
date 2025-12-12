import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getBlogList = createAsyncThunk(
  "getBlogList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/blogs`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addBlog = createAsyncThunk(
  "addBlog",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/blogs?userId=${userId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "updateBlog",
  async ({ id, userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/blogs/${id}?userId=${userId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/blogs/${id}userId=${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getBlogDetailById = createAsyncThunk(
  "getBlogDetailById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/blogs/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    loading: "",
    blogList: [],
    blogDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogList.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogList = action.payload;
    });
    builder.addCase(getBlogList.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(getBlogDetailById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogDetailById.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogDetail = action.payload;
    });
    builder.addCase(getBlogDetailById.rejected, (state) => {
      state.loading = "error";
    });
  },
});

export default blogSlice.reducer;
