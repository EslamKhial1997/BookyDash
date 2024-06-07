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

export const getheader = createAsyncThunk(
  "header/getheader",
  async (args, thunkApi) => {
    try {
      const { page = 1, size = 10, search = "" } = args;
      const filter = filterRequest(args.filter);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/header`
        // ?page=${page}&size=${size}&search=${search}${filter}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);



export const updateChallenge = createAsyncThunk(
  "challenges/updateChallenge",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/v1/challenges/${args.id}`,
        args.values
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);



const challengesSlice = createSlice({
  name: "challenges",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChallenges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
   

      .addCase(createChallenge.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChallenge.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.push(payload.challenge);
        state.itemsCount++;
        state.error = null;
      })
      .addCase(createChallenge.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(updateChallenge.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChallenge.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(
          (el) => el._id === payload.challenge._id
        );
        state.data[indexAt] = payload.challenge;
        state.error = null;
      })
      .addCase(updateChallenge.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(deleteChallenge.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteChallenge.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (el) => el._id !== payload.challenge._id
        );
        state.itemsCount--;
        state.error = null;
      })
      .addCase(deleteChallenge.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      });
  },
});

export default challengesSlice.reducer;
