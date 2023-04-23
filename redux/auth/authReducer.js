import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  stateChange: false,
  email: null,
  avatarImage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatarImage: payload.avatarImage,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
