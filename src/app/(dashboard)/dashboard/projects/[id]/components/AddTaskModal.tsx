"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { Task } from "@/types/task";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string
}

export default function AddTaskModal({ isOpen, onClose, projectId }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Todo");
  const addTask = useProjectStore((state) => state.addTask);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status,
    };

    addTask(projectId, newTask);
    setTitle("");
    setStatus("Todo");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white dark:bg-[#1c0333] rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">

        <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 ">
          Add Task
        </h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="Todo" className="dark:bg-neutral-900">Todo</option>
          <option value="In Progress" className="dark:bg-neutral-900">In Progress</option>
          <option value="Done" className="dark:bg-neutral-900">Done</option>
        </select>

        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-700"
          >
            Add Task
          </button>

        </div>

      </div>
    </div>
  );
}