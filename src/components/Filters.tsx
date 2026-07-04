"use client";

import { TaskStatus, TaskType } from "@/types/task";

interface Props {
  status: string;
  type: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function Filters({
  status,
  type,
  onStatusChange,
  onTypeChange,
}: Props) {
  return (
    <div className="flex gap-4">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Status</option>
        <option value={TaskStatus.TODO}>Todo</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
        <option value={TaskStatus.QA}>QA</option>
        <option value={TaskStatus.BLOCKED}>Blocked</option>
      </select>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Types</option>
        <option value={TaskType.IMAGE}>Image</option>
        <option value={TaskType.TEXT}>Text</option>
        <option value={TaskType.AUDIO}>Audio</option>
        <option value={TaskType.UNKNOWN}>Unknown</option>
      </select>
    </div>
  );
}