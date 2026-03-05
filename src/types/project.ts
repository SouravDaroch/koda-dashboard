import { Task } from "./task";

export type ProjectStatus = "Planning" | "In Progress" | "Completed";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  tasks: Task[];
  dueDate: string;
}