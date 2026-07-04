export interface RawTask {
  id: string;
  title: string;
  type: string;
  status: string;
  assignee: {
    id: string;
    name: string;
  } | null;
  annotationCount: number | string;
  updatedAt: number | string;
  meta?: Record<string, unknown>;
}

export interface TasksResponse {
  page: number;
  pageSize: number;
  total: number;
  items: RawTask[];
}