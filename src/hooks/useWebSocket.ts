"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTask } from "@/features/tasks/tasksSlice";

export default function useWebSocket() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/ws");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.kind) {
        case "task.updated":
          dispatch(
            updateTask({
              id: message.payload.id,
              changes: {
                status: message.payload.status.toLowerCase(),
                updatedAt: message.payload.updatedAt,
              },
            })
          );
          break;

        case "task.assigned":
          dispatch(
            updateTask({
              id: message.payload.id,
              changes: {
                assignee: message.payload.assignee,
              },
            })
          );
          break;

        default:
          break;
      }
    };

    return () => socket.close();
  }, [dispatch]);
}