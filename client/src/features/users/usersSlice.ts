// src/features/users/usersSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "./userTypes";
import { fetchUsers } from "./usersAPI";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetch",
  async () => {
    const res = await fetchUsers(1);
    return res.data.data as User[];
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [] as User[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default usersSlice.reducer;
