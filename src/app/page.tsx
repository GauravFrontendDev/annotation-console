"use client";

import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasks } from "@/features/tasks/thunks";
import TaskDetails from "@/components/TaskDetails";
import { Task } from "@/types/task";
import useWebSocket from "@/hooks/useWebSocket";
import { getCachedTasks } from "@/db/indexedDb";
import { upsertTask } from "@/features/tasks/tasksSlice";

import {
  selectAllTasks,
  selectTaskLoading,
  selectTaskError,
} from "@/features/tasks/selectors";
import {
  selectPage,
  selectPageSize,
  selectTotal,
} from "@/features/tasks/selectors";

import TaskTable from "@/components/TaskTable";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import SortSelect from "@/components/SortSelect";
import TaskTicker from "@/components/TaskTicker";

export default function Home() {
  const dispatch = useAppDispatch();
  useWebSocket();

  const tasks = useAppSelector(selectAllTasks);
  const loading = useAppSelector(selectTaskLoading);
  const error = useAppSelector(selectTaskError);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [type, setType] = useState("");
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const total = useAppSelector(selectTotal);

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = !status || task.status === status;

      const matchesType = !type || task.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });

    switch (sortBy) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "annotationCount":
        filtered.sort((a, b) => b.annotationCount - a.annotationCount);
        break;

      default:
        filtered.sort((a, b) => b.updatedAt - a.updatedAt);
    }

    return filtered;
  }, [tasks, search, status, type, sortBy]);

  useEffect(() => {
    if (filteredTasks.length > 0 && !selectedTask) {
      setSelectedTask(filteredTasks[0]);
    }
  }, [filteredTasks, selectedTask]);

  useEffect(() => {
    async function loadCache() {
      const cached = await getCachedTasks();

      cached.forEach((task) => {
        dispatch(upsertTask(task));
      });
    }

    loadCache();
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      fetchTasks({
        page,
        pageSize,
      }),
    );
  }, [dispatch, page, pageSize]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Annotation Console</h1>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <Filters
          status={status}
          type={type}
          onStatusChange={setStatus}
          onTypeChange={setType}
        />

        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TaskTable
            tasks={filteredTasks}
            selectedTaskId={selectedTask?.id}
            onSelect={setSelectedTask}
          />
        </div>

        <TaskDetails task={selectedTask} />
      </div>
      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={(newPage) =>
          dispatch(
            fetchTasks({
              page: newPage,
              pageSize,
            }),
          )
        }
      />
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Task Ticker (Part 2)</h2>

        <TaskTicker apiBase="http://localhost:4000" />
      </div>
    </main>
  );
}
