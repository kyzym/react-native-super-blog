import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { commentsSlice } from "./comments/commentsSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
