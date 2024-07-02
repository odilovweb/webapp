import { configureStore } from "@reduxjs/toolkit";
import solanaXi from "./solanaXi";

export const store = configureStore({
  reducer: {
    solanaxi: solanaXi,
  },
});
