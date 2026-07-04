import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { TaskStatus, TaskType } from "@/types/task";
import { tasksAdapter } from "./adapter";

const adapterSelectors = tasksAdapter.getSelectors<RootState>(
  (state) => state.tasks
);

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTaskCount,
} = adapterSelectors;

/**
 * Loading & Error
 */
export const selectTaskLoading = (state: RootState) =>
  state.tasks.loading;

export const selectTaskError = (state: RootState) =>
  state.tasks.error;

/**
 * Pagination
 */
export const selectPage = (state: RootState) =>
  state.tasks.page;

export const selectPageSize = (state: RootState) =>
  state.tasks.pageSize;

export const selectTotal = (state: RootState) =>
  state.tasks.total;

export const selectPagination = createSelector(
  [selectPage, selectPageSize, selectTotal],
  (page, pageSize, total) => ({
    page,
    pageSize,
    total,
  })
);

/**
 * Derived selectors
 */
export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) =>
    tasks.filter(
      (task) => task.status === TaskStatus.DONE
    )
);

export const selectBlockedTasks = createSelector(
  [selectAllTasks],
  (tasks) =>
    tasks.filter(
      (task) => task.status === TaskStatus.BLOCKED
    )
);

export const selectImageTasks = createSelector(
  [selectAllTasks],
  (tasks) =>
    tasks.filter(
      (task) => task.type === TaskType.IMAGE
    )
);

export const selectRecentTasks = createSelector(
  [selectAllTasks],
  (tasks) =>
    [...tasks].sort(
      (a, b) => b.updatedAt - a.updatedAt
    )
);