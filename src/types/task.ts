export enum TaskType {
  IMAGE = "image",
  AUDIO = "audio",
  TEXT = "text",
  UNKNOWN = "unknown",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  QA = "qa",
  BLOCKED = "blocked",
  UNKNOWN = "unknown",
}

export interface User {
  id: string;
  name: string;
}

/**
 * Backend sends a free-form meta object.
 * We know about priority and note, but allow additional fields.
 */
export interface TaskMeta {
  priority?: string;
  note?: string;
  [key: string]: unknown;
}

export interface Task {
  id: string;
  title: string;

  /**
   * Normalized values used throughout the app.
   */
  type: TaskType;
  status: TaskStatus;

  assignee: User | null;

  annotationCount: number;

  /**
   * Stored as epoch milliseconds.
   */
  updatedAt: number;

  meta: TaskMeta;
}