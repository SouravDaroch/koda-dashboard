"use client";


import { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import EditTaskModal from "./EditTaskModal";

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    projectId: string;
}

export default function TaskList({ tasks, onDelete, onToggle, projectId }: TaskListProps) {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    if (tasks.length === 0) {
        return (
            <p className="text-sm text-gray-500 dark:text-gray-300 text-center py-6">
                No tasks found.
            </p>
        );
    }
    return (<>
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}
                    onEdit={() => setEditingTask(task)} />
            ))}
            {editingTask && (
                <EditTaskModal
                    projectId={projectId}
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </div>
    </>
    );
}