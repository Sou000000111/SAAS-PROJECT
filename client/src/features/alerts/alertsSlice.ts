import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
  name: "alerts",
  initialState: [] as string[],
  reducers: {
    addAlert: (state, action) => {
      state.push(action.payload);
    },
    clearAlerts: () => [],
  },
});

export const { addAlert, clearAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;
