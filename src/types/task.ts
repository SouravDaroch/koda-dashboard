export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}