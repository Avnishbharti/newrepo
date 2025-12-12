import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllRating = createAsyncThunk("getAllRating", async () => {
  const response = await api.get(`/api/platform-ratings`);
  return response.data;
});

export const addRating = createAsyncThunk(
  "addRating",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/platform-ratings?userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateRating = createAsyncThunk(
  "updateRating",
  async ({ id, userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/platform-ratings/${id}?userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteRating = createAsyncThunk(
  "updateRating",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/platform-ratings/${id}?userId=${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addEnquiry = createAsyncThunk("addEnquiry", async (data) => {
  try {
    const response = await api.post(`/api/enquiries`, data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const getAllEnquiryList = createAsyncThunk(
  "getAllEnquiryList",
  async () => {
    try {
      const response = await api.get(`/api/enquiries`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "deleteEnquiry",
  async ({ id, userId }) => {
    try {
      const response = await api.delete(
        `/api/enquiries/${id}?userId=${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    loading: "",
    ratingList: [],
    enquiryList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRating.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllRating.fulfilled, (state, action) => {
      state.loading = "success";
      state.ratingList = action.payload;
    });
    builder.addCase(getAllRating.rejected, (state) => {
      state.loading = "error";
    });

    builder.addCase(getAllEnquiryList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllEnquiryList.fulfilled, (state, action) => {
      state.loading = "success";
      state.enquiryList = action.payload;
    });
    builder.addCase(getAllEnquiryList.rejected, (state) => {
      state.loading = "error";
    });
  },
});

export default settingSlice.reducer;
