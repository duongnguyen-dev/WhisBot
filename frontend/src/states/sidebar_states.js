import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "showSidebar",
  initialState: {
    value: false,
  },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
