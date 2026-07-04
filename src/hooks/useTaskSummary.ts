"use client";

import { useEffect, useState } from "react";

export function useTaskSummary(taskId?: string) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!taskId) return;

    const controller = new AbortController();

    async function loadSummary() {
      try {
        setSummary("");
        setLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/tasks/${taskId}/summary`,
          {
            signal: controller.signal,
          }
        );

        const reader = response.body?.getReader();

        if (!reader) {
          setLoading(false);
          return;
        }

        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);

          chunk.split("\n\n").forEach((line) => {
            if (!line.startsWith("data:")) return;

            const payload = line.replace("data:", "").trim();

            try {
              const text = JSON.parse(payload);

              setSummary((prev) => prev + text);
            } catch {
              // Ignore invalid JSON chunks
            }
          });
        }
      } catch (error) {
        // Ignore abort errors
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();

    return () => {
      controller.abort("Task changed");
    };
  }, [taskId]);

  return {
    summary,
    loading,
  };
}