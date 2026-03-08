"use client";

import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <p className="text-sm text-gray-500 text-center py-6">
                No tasks found.
            </p>
        );
    }
    return (<>
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </div>
    </>
    );
}