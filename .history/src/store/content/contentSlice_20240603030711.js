import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { filterRequest } from "@/utils/apiManager";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
};

export const getContent = createAsyncThunk(
  "Content/getContent",
  async (args, thunkApi) => {
    console.log(args);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/subcategory/${args}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createContent = createAsyncThunk(
  "Content/createContent",
  async (args, thunkApi) => {
    console.log(args.image[0]);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/category/${}`,
        {
          title: args.title,
          subtitle: args.subtitle,
          image: args.image[0],
          logo: args.logo[0],
        },
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

export const updateContent = createAsyncThunk(
  "Content/updateContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/subcategory/${args.id}`,
        {
          title: args.values.title,
        },
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
export const updateContentImage = createAsyncThunk(
  "Content/updateContentImage",
  async (args, thunkApi) => {
    console.log(args);
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/subcategory/${args.id}`,
        {
          image: args.values.image[0],
        },
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

export const deleteContent = createAsyncThunk(
  "Content/deleteContent",
  async (args, thunkApi) => {
    console.log(args);
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/header/${args._id}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const ContentSlice = createSlice({
  name: "Content",
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
        state.data = payload.data;
        state.itemsCount = payload.itemsCount;
        state.pages = payload.pages;
        state.error = null;
      })
      .addCase(getContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.push(payload.Content);
        state.itemsCount++;
        state.error = null;
      })
      .addCase(createContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(updateContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;
        state.error = null;
      })
      .addCase(updateContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })
      .addCase(updateContentImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContentImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;
        state.error = null;
      })
      .addCase(updateContentImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(deleteContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;
        state.itemsCount--;
        state.error = null;
      })
      .addCase(deleteContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      });
  },
});

export default ContentSlice.reducer;
