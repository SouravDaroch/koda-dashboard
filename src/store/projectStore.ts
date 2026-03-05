import { create } from "zustand";

export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  status: "Planning" | "In Progress" | "Completed";
  tasks: Task[];
}

interface ProjectStore {
  projects: Project[];

  addTask: (projectId: string, task: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [
    {
      id: "1",
      name: "SaaS Dashboard",
      status: "In Progress",
      tasks: [
        { id: "1", title: "Setup authentication", status: "Done" },
        { id: "2", title: "Build dashboard UI", status: "In Progress" },
        { id: "3", title: "Connect API", status: "Todo" },
      ],
    },
  ],

  addTask: (projectId, task) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [task, ...project.tasks] }
          : project
      ),
    })),

  deleteTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== taskId),
            }
          : project
      ),
    })),

  toggleTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      status:
                        task.status === "Todo"
                          ? "In Progress"
                          : task.status === "In Progress"
                          ? "Done"
                          : "Todo",
                    }
                  : task
              ),
            }
          : project
      ),
    })),
}));