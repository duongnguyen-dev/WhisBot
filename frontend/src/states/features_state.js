import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "featureName",
  initialState: {
    value: null,
  },
  reducers: {
    changeFeatures: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeFeatures } = featuresSlice.actions;

export default featuresSlice.reducer;
