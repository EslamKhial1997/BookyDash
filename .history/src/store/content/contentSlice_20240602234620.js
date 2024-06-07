import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/utils/axios";

let initialState = {
  isLoading: false,
  data: null,
  error: null,
}

export const getContent = createAsyncThunk(
  "content/getContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get(`/settings`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createContent = createAsyncThunk(
  "content/createContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(`/settings`, args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(`/settings`, args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(`/subcategory`, args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const contentSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContent.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })

      .addCase(updatContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatContent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;

      })
      .addCase(updatContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })
  }
});

export default contentSlice.reducer;