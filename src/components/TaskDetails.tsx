"use client";

import { Task } from "@/types/task";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

import { useTaskSummary } from "@/hooks/useTaskSummary";

interface Props {
  task: Task | null;
}

export default function TaskDetails({ task }: Props) {
  const { summary, loading } = useTaskSummary(task?.id);

  if (!task) {
    return (
      <div className="rounded border p-6 text-gray-500">
        Select a task
      </div>
    );
  }

  return (
    <div className="rounded border p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        {task.title}
      </h2>

      <div>
        <strong>ID:</strong> {task.id}
      </div>

      <div>
        <strong>Type:</strong> {task.type}
      </div>

      <div>
        <strong>Status:</strong> {task.status}
      </div>

      <div>
        <strong>Assignee:</strong>{" "}
        {task.assignee?.name ?? "Unassigned"}
      </div>

      <div>
        <strong>Annotations:</strong>{" "}
        {task.annotationCount}
      </div>

      <div>
        <strong>Updated:</strong>{" "}
        {new Date(task.updatedAt).toLocaleString()}
      </div>

      <div>
        <strong>Meta</strong>

        <pre className="mt-2 rounded bg-gray-100 p-2 text-sm">
          {JSON.stringify(task.meta, null, 2)}
        </pre>
      </div>

      <div className="border-t pt-4">
        <h3 className="mb-3 font-semibold">
          AI Summary
        </h3>

        {loading && summary.length === 0 ? (
          <div className="text-gray-500">
            Loading summary...
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {summary}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}