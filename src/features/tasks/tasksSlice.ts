import {
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

import { Task } from "@/types/task";
import { tasksAdapter } from "./adapter";
import { fetchTasks } from "./thunks";

const initialState = tasksAdapter.getInitialState({
  loading: false,
  error: null as string | null,

  page: 1,
  pageSize: 20,
  total: 0,
});

const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    /**
     * Used by WebSocket later
     */
    upsertTask: tasksAdapter.upsertOne,

    /**
     * Used by WebSocket updates
     */
    updateTask(
      state,
      action: PayloadAction<Update<Task, string>>
    ) {
      tasksAdapter.updateOne(state, action.payload);
    },

    removeTask: tasksAdapter.removeOne,

    clearTasks(state) {
      tasksAdapter.removeAll(state);
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        tasksAdapter.setAll(state, action.payload.items);

        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.total;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ??
          "Something went wrong";
      });
  },
});

export const {
  upsertTask,
  updateTask,
  removeTask,
  clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;