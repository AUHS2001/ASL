import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/features/counterSlice";
import userSlice from "./features/userSlice";
import aiTypeSlice from "./features/aiTypeSlice";

export const store = configureStore({
  reducer: {
    // counterReducer,
    aiType:aiTypeSlice,
    auth:userSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});
