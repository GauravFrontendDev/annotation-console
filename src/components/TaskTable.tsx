import { Task } from "@/types/task";
import StatusBadge from "./StatusBadge";

interface Props {
  tasks: Task[];
  selectedTaskId?: string;
  onSelect: (task: Task) => void;
}

export default function TaskTable({ tasks, selectedTaskId, onSelect }: Props) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-3">Title</th>
          <th className="border p-3">Type</th>
          <th className="border p-3">Status</th>
          <th className="border p-3">Assignee</th>
          <th className="border p-3">Annotations</th>
          <th className="border p-3">Updated</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.id}
            onClick={() => onSelect(task)}
            className={`cursor-pointer hover:bg-gray-100 ${
              selectedTaskId === task.id ? "bg-blue-50" : ""
            }`}
          >
            <td className="border p-3">{task.title}</td>

            <td className="border p-3 uppercase">{task.type}</td>

            <td className="border p-3">
              <StatusBadge status={task.status} />
            </td>

            <td className="border p-3">{task.assignee?.name ?? "-"}</td>

            <td className="border p-3">{task.annotationCount}</td>

            <td className="border p-3">
              {new Date(task.updatedAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
