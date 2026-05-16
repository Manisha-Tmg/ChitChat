import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import useReducer from "./userSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: useReducer,
  },
});

export default store;
