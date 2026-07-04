import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import { TasksResponse } from "@/types/api";
import { normalizeTasks } from "@/utils/normalize";
import { saveTasks } from "@/db/indexedDb";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (
    {
      page,
      pageSize,
    }: {
      page: number;
      pageSize: number;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await api.get<TasksResponse>(
        `/api/tasks?page=${page}&pageSize=${pageSize}`
      );

      const normalizedTasks = normalizeTasks(data.items);

      // Save tasks to IndexedDB
      await saveTasks(normalizedTasks);

      return {
        ...data,
        items: normalizedTasks,
      };
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to fetch tasks"
      );
    }
  }
);