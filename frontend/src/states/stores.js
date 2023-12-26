import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar_states";
import featuresReducer from "./features_state";

export default configureStore({
  reducer: {
    showSidebar: sidebarReducer,
    featureName: featuresReducer,
  },
});
