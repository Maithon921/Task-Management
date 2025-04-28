import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import taskRedcer from "./taskSlice.jsx";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskRedcer,
  },
});

export default appStore;
