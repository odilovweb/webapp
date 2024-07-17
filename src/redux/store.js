import { configureStore } from "@reduxjs/toolkit";
import { comfySlice } from "./comfySlice";

export const store = configureStore({
  reducer: {
    comfy: comfySlice,
  },
});
