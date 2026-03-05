"use client";

import { Task } from "../types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
      
      <p className="text-sm font-medium text-gray-700">
        {task.title}
      </p>

      <span
        className={`text-xs px-3 py-1 rounded-full ${
          task.status === "Done"
            ? "bg-green-100 text-green-600"
            : task.status === "In Progress"
            ? "bg-violet-100 text-violet-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {task.status}
      </span>

    </div>
  );
}