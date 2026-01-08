import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../users/userTypes";
import { loginAPI } from "./authAPI";

/* ✅ STATE TYPE */
interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

/* ✅ LOGIN THUNK */
export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  "auth/login",
  async (data) => {
    const res = await loginAPI(data);
    localStorage.setItem("token", res.data.token);
    return res.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
