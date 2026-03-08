"use client";

import { Task } from "@/types/task";

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
    return (
        <div className="bg-white dark:bg-[#1c0333] border border-gray-100 dark:border-neutral-800 rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-start justify-between gap-4">

            {/* Task Title */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300 break-all">
                    {task.title}
                </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 shrink-0">

                {/* Status Badge */}
                <button
                    onClick={() => onToggle(task.id)}
                    className={`text-xs px-3 py-1 rounded-full cursor-pointer ${task.status === "Done"
                        ? "bg-green-100 text-green-600 dark:bg-green-600 dark:text-white"
                        : task.status === "In Progress"
                            ? "bg-violet-100 dark:bg-neutral-800 text-violet-500"
                            : "bg-gray-100 dark:bg-neutral-200 text-gray-600 dark:text-gray-900"
                        }`}
                >
                    {task.status}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-sm text-red-500 cursor-pointer hover:text-red-600 transition"
                >
                    Delete
                </button>

            </div>
        </div>
    );
}