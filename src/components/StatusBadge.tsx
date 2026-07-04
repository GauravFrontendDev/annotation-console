import { TaskStatus } from "@/types/task";

export default function StatusBadge({
  status,
}: {
  status: TaskStatus;
}) {
  const colors = {
    todo: "bg-gray-300",
    in_progress: "bg-blue-500",
    done: "bg-green-500",
    qa: "bg-yellow-500",
    blocked: "bg-red-500",
    unknown: "bg-black",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-white text-sm ${
        colors[status] ?? colors.unknown
      }`}
    >
      {status}
    </span>
  );
}