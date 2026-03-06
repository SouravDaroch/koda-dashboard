import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { create } from "zustand";



interface ProjectStore {
  projects: Project[];

  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
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
       dueDate: "2026-04-10",
      tasks: [
        { id: "1", title: "Setup authentication", status: "Done" },
        { id: "2", title: "Build dashboard UI", status: "In Progress" },
        { id: "3", title: "Connect API", status: "Todo" },
      ],
    },
  ],

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),

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