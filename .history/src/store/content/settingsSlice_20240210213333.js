import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/utils/axios";

let initialState = {
  isLoading: false,
  data: null,
  error: null,
}

export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get(`/settings`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateSetting = createAsyncThunk(
  "settings/updateSetting",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(`/settings`, args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSettings.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getSettings.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })

      .addCase(updateSetting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSetting.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;

      })
      .addCase(updateSetting.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })
  }
});

export default settingsSlice.reducer;