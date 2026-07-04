import { openDB } from "idb";
import { Task } from "@/types/task";

const DB_NAME = "annotation-console";
const STORE_NAME = "tasks";

async function getDb() {
  if (typeof window === "undefined") {
    return null;
  }

  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    },
  });
}

export async function saveTasks(tasks: Task[]) {
  const db = await getDb();

  if (!db) return;

  const tx = db.transaction(STORE_NAME, "readwrite");

  for (const task of tasks) {
    tx.store.put(task);
  }

  await tx.done;
}

export async function getCachedTasks(): Promise<Task[]> {
  const db = await getDb();

  if (!db) return [];

  return db.getAll(STORE_NAME);
}

export async function clearCache() {
  const db = await getDb();

  if (!db) return;

  await db.clear(STORE_NAME);
}