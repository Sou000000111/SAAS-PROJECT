import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

/* ✅ TYPE */
export interface AnalyticsStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  churnRate: number;
}

/* ✅ STATE TYPE */
interface AnalyticsState {
  stats: AnalyticsStats | null;
  loading: boolean;
}

const initialState: AnalyticsState = {
  stats: null,
  loading: false,
};

/* ✅ ASYNC THUNK */
export const fetchAnalytics = createAsyncThunk<AnalyticsStats>(
  "analytics/fetch",
  async () => {
    const res = await api.get("/dashboard/stats");
    return res.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default analyticsSlice.reducer;
