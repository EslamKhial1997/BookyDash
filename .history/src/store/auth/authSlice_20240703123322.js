import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import cookie from "@/utils/cookie";

let initialState = {
  isLoading: false,
  isAuth: false,
  token: cookie.getData("token") ?? null,
  user: null,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (args, thunkApi) => {
  console.log(args);
  try {
    const { data } = await axios.post("http://178.62.205.20:3006/apiv1/login", args);
    return thunkApi.fulfillWithValue(data);
  } catch (e) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post("/check_auth");
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.user = null;
      state.error = null;
      cookie.removeData("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.user = payload.user;
        state.token = payload.token;
        cookie.setData("token", payload.token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
        state.isAuth = false;
        state.user = null;
        state.token = null;
        cookie.removeData("token");
      })

      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
        state.isAuth = false;
        state.user = null;
        state.token = null;
        cookie.removeData("token");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
