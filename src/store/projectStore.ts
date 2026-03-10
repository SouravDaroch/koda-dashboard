import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface ProjectStore {
  projects: Project[];

  addProject: (project: Omit<Project, "id" | "tasks">) => string;
  deleteProject: (projectId: string) => void;
  addTask: (projectId: string, task: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  updateProject: (id: string, name: string, dueDate: string) => void;
  editTask: (
    projectId: string,
    taskId: string,
    title: string
  ) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [
       {
    id: "1",
    name: "SaaS Dashboard",
    status: "In Progress",
    dueDate: "2026-04-10",
    tasks: [
      { id: "1", title: "Setup authentication", status: "Done" },
      { id: "2", title: "Build dashboard layout", status: "Done" },
      { id: "3", title: "Implement charts", status: "In Progress" },
      { id: "4", title: "Add project CRUD", status: "Todo" }
    ]
  },
  {
    id: "2",
    name: "Landing Page Redesign",
    status: "Planning",
    dueDate: "2026-05-01",
    tasks: [
      { id: "1", title: "Research competitors", status: "Done" },
      { id: "2", title: "Create wireframes", status: "In Progress" },
      { id: "3", title: "Design hero section", status: "Todo" }
    ]
  },
  {
    id: "3",
    name: "Mobile App MVP",
    status: "Completed",
    dueDate: "2026-03-15",
    tasks: [
      { id: "1", title: "User authentication", status: "Done" },
      { id: "2", title: "Task API integration", status: "Done" },
      { id: "3", title: "Deploy beta version", status: "Done" }
    ]
  }

      ],

      addProject: (project) => {
        const id = crypto.randomUUID();

        set((state) => ({
          projects: [
            {
              ...project,
              id,
              tasks: [],
            },
            ...state.projects,
          ],
        }));

        return id;
      },

      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
        })),

      updateProject: (id: string, name: string, dueDate: string) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, name, dueDate } : p
          ),
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

      editTask: (
        projectId: string,
        taskId: string,
        title: string
      ) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId
                    ? { ...task, title }
                    : task
                ),
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
    }),
    {
      name: "project-storage",
    })
);