import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    removeTask: (state, action) => {
      state.loading = false;
      state.tasks = [];
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFail,
  addTask,
  deleteTask,
  updateTask,
  removeTask,
} = taskSlice.actions;

export default taskSlice.reducer;
