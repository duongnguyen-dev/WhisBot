import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "featurename",
  initialState: {
    value: "communicate",
  },
  reducers: {
    changeFeatures: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeFeatures } = featuresSlice.actions;

export default featuresSlice.reducer;
