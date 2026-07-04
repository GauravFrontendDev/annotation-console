import { createEntityAdapter } from "@reduxjs/toolkit";
import { Task } from "@/types/task";

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => b.updatedAt - a.updatedAt,
});