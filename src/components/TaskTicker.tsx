"use client";

import { useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  updatedAt: number;
};

interface Props {
  apiBase: string;
}

export default function TaskTicker({
  apiBase,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    null
  );

  // force re-render every second
  const [, setTick] = useState(0);

  /**
   * Running clock
   */
  useEffect(() => {
    const id = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  /**
   * Fetch selected task
   */
  useEffect(() => {
    if (!selectedId) return;

    let cancelled = false;

    fetch(`${apiBase}/api/tasks/${selectedId}`)
      .then((r) => r.json())
      .then((task) => {
        if (cancelled) return;

        setTasks((prev) => {
          const exists = prev.some(
            (t) => t.id === task.id
          );

          if (exists) {
            return prev.map((t) =>
              t.id === task.id ? task : t
            );
          }

          return [...prev, task];
        });
      });

    return () => {
      cancelled = true;
    };
  }, [apiBase, selectedId]);

  /**
   * newest first
   */
  const sorted = useMemo(() => {
    return [...tasks].sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
  }, [tasks]);

  return (
    <ul className="space-y-2">
      {sorted.map((task) => (
        <li
          key={task.id}
          onClick={() => setSelectedId(task.id)}
          className="cursor-pointer rounded border p-3 hover:bg-gray-100"
        >
          <div className="font-semibold">
            {task.title}
          </div>

          <div className="text-sm text-gray-500">
            Updated{" "}
            {Math.floor(
              (Date.now() - task.updatedAt) / 1000
            )}
            s ago
          </div>
        </li>
      ))}
    </ul>
  );
}