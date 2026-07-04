import reducer, {
  upsertTask,
} from "../tasksSlice";

import { TaskStatus, TaskType } from "@/types/task";

describe("tasks reducer", () => {
  it("adds task", () => {
    const state = reducer(
      undefined,
      upsertTask({
        id: "1",
        title: "Demo",
        type: TaskType.TEXT,
        status: TaskStatus.TODO,
        assignee: null,
        annotationCount: 0,
        updatedAt: Date.now(),
        meta: {},
      })
    );

    expect(state.ids.length).toBe(1);
  });
}); 