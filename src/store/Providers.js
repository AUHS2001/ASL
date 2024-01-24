"use client";
import { store } from "./index";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
