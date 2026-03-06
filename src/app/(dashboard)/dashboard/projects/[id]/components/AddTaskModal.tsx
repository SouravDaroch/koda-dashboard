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
  const [status, setStatus] = useState<Task["status"]>("Planning");
  const addTask = useProjectStore((state) => state.addTask);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status,
    };

    addTask(projectId, newTask);
    setTitle("");
    setStatus("Planning");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">

        <h2 className="text-lg font-semibold text-gray-800">
          Add Task
        </h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
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