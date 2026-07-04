import { normalizeTask } from "../normalize";

describe("normalizeTask", () => {
  it("normalizes task correctly", () => {
    const task = normalizeTask({
      id: "1",
      title: "Test",
      type: "image",
      status: "InProgress",
      assignee: null,
      annotationCount: "10",
      updatedAt: "2024-01-01T00:00:00Z",
      meta: {},
    });

    expect(task.type).toBe("image");
    expect(task.status).toBe("in_progress");
    expect(task.annotationCount).toBe(10);
    expect(typeof task.updatedAt).toBe("number");
  });

  it("handles unknown task type", () => {
    const task = normalizeTask({
      id: "1",
      title: "Unknown",
      type: "video",
      status: "todo",
      assignee: null,
      annotationCount: 0,
      updatedAt: Date.now(),
      meta: {},
    });

    expect(task.type).toBe("unknown");
  });
});