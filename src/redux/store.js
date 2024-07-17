import { configureStore } from "@reduxjs/toolkit";
import { comfySlice } from "./miniAppSlice";

export const store = configureStore({
  reducer: {
    comfy: comfySlice,
  },
});
