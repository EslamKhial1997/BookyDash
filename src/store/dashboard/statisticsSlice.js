import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/utils/axios";

let initialState = {
  isLoading: false,
  users: 0,
  paymentMethods: 0,
  points: 0,
  errors: [],
}

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get("/statistics");
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const statistics = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getStatistics.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload.users;
        state.points = payload.points;
        state.paymentMethods = payload.paymentMethods;
        state.errors = [];
      })
      .addCase(getStatistics.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errors = payload.errors;
      })

  }
});

export default statistics.reducer;