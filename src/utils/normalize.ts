import { RawTask } from "@/types/api";
import { Task, TaskStatus, TaskType } from "@/types/task";

/**
 * Maps backend task types to internal enum values.
 */
const TYPE_MAP: Record<string, TaskType> = {
  image: TaskType.IMAGE,
  audio: TaskType.AUDIO,
  text: TaskType.TEXT,
};

/**
 * Maps backend status values to internal enum values.
 */
const STATUS_MAP: Record<string, TaskStatus> = {
  todo: TaskStatus.TODO,
  inprogress: TaskStatus.IN_PROGRESS,
  in_progress: TaskStatus.IN_PROGRESS,
  done: TaskStatus.DONE,
  qa: TaskStatus.QA,
  blocked: TaskStatus.BLOCKED,
};

/**
 * Normalize task type.
 * Unknown values are mapped to UNKNOWN.
 */
function normalizeTaskType(type?: string): TaskType {
  if (!type) {
    return TaskType.UNKNOWN;
  }

  return TYPE_MAP[type.toLowerCase()] ?? TaskType.UNKNOWN;
}

/**
 * Normalize task status.
 * Handles inconsistent casing and naming.
 */
function normalizeTaskStatus(status?: string): TaskStatus {
  if (!status) {
    return TaskStatus.UNKNOWN;
  }

  return STATUS_MAP[status.toLowerCase()] ?? TaskStatus.UNKNOWN;
}

/**
 * Normalize timestamps.
 * Supports:
 * - Epoch milliseconds
 * - ISO date strings
 *
 * Invalid dates become 0.
 */
function normalizeTimestamp(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Date.parse(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Normalize annotation count.
 */
function normalizeAnnotationCount(value: string | number): number {
  const count = Number(value);

  return Number.isFinite(count) ? count : 0;
}

/**
 * Normalize a single task.
 */
export function normalizeTask(raw: RawTask): Task {
  return {
    id: raw.id,

    title: raw.title,

    type: normalizeTaskType(raw.type),

    status: normalizeTaskStatus(raw.status),

    assignee: raw.assignee,

    annotationCount: normalizeAnnotationCount(raw.annotationCount),

    updatedAt: normalizeTimestamp(raw.updatedAt),

    meta:
      raw.meta && typeof raw.meta === "object"
        ? raw.meta
        : {},
  };
}

/**
 * Normalize an array of tasks.
 */
export function normalizeTasks(rawTasks: RawTask[]): Task[] {
  return rawTasks.map(normalizeTask);
}