import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  currentUser: null,
  loading: false,
  error: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem("token");
      localStorage.removeItem("detail");
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  userSlice.actions;

export default userSlice.reducer;
