"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import EditProjectModal from "./EditProjectModal";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import {
  deleteTaskAction,
  updateTaskStatusAction,
  deleteProjectAction
} from "@/app/actions/projectActions";
import { useRouter } from "next/navigation";

interface ProjectDetailsClientProps {
  project: Project;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const router = useRouter();
  const tasks = project.tasks;
  const [filter, setFilter] = useState<"All" | "Todo" | "In Progress" | "Done">("All");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskAction(project.id, taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleStatus = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let nextStatus: Task["status"];
    if (task.status === "Todo") nextStatus = "In Progress";
    else if (task.status === "In Progress") nextStatus = "Done";
    else nextStatus = "Todo";

    try {
      await updateTaskStatusAction(project.id, taskId, nextStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const planningTasks = tasks.filter((task) => task.status === "Todo").length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200 ">
            {project.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Detailed overview of this project.
          </p>
          <p className="text-gray-400 dark:text-gray-300 mt-1">Due: {project.dueDate}</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-violet-600 hover:underline"
        >
          Edit Details
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-300">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">{totalTasks}</p>
        </div>

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-300">Completed</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{completedTasks}</p>
        </div>

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-300">In Progress</h3>
          <p className="text-2xl font-bold text-violet-600 mt-2">{inProgressTasks}</p>
        </div>

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-300">Planning</h3>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-2">{planningTasks}</p>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-[#1c0333] p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-300 ">
            Tasks
          </h2>

          <button
            onClick={() => setIsOpen(true)}
            className="text-sm bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700"
          >
            + Add Task
          </button>
        </div>

        <div className="flex gap-2">
          {["All", "Todo", "In Progress", "Done"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1 rounded-lg text-sm transition ${filter === status
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 dark:bg-[#110121] text-gray-600 dark:border dark:border-neutral-800 dark:text-gray-400 hover:bg-gray-200 hover:dark:bg-[#1c0333] cursor-pointer"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleStatus}
          projectId={project.id}
        />
      </div>

      <AddTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectId={project.id}
      />

      {isEditing && (
        <EditProjectModal
          id={project.id}
          currentName={project.name}
          currentDueDate={project.dueDate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
