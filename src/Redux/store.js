import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./adminSlice";
export const store = configureStore({
  reducer: {
    Admin: AdminReducer,
  },
});

export default store;
