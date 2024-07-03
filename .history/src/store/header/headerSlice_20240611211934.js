import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
};

export const getheader = createAsyncThunk(
  "header/getHeader",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3006/api/v1/header/${args}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateHeader = createAsyncThunk(
  "header/updateHeader",
  async (args, thunkApi) => {
    console.log(args);
    const { id } = args.id;
    try {
      const { data } = await axios.put(
        `http://localhost:3006/api/v1/header/${id}`,
        args.data,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const updateHeaderImage = createAsyncThunk(
  "header/updateHeaderImage",
  async (args, thunkApi) => {
    const { id } = args.id;
    try {
      const { data } = await axios.put(
        `http://localhost:3006/api/v1/header/${id}`,
         { image: args.data.image[0] },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const updateHeaderLogo = createAsyncThunk(
  "header/updateHeaderLogo",
  async (args, thunkApi) => {
    const { id } = args.id;
    try {
      const { data } = await axios.put(
        `http://localhost:3006/api/v1/header/${id}`,
         { logo: args.data.logo[0] },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const headerSlice = createSlice({
  name: "header",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getheader.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getheader.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;

        state.error = null;
      })
      .addCase(getheader.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })
      .addCase(updateHeader.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHeader.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.data = payload.data;
        state.error = null;
      })
      .addCase(updateHeader.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })
      .addCase(updateHeaderImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHeaderImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.data = payload.data;
        state.error = null;
      })
      .addCase(updateHeaderImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })
      .addCase(updateHeaderLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHeaderLogo.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.data = payload.data;
        state.error = null;
      })
      .addCase(updateHeaderLogo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })
  },
});

export default headerSlice.reducer;
