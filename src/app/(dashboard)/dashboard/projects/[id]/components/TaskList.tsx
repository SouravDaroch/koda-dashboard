"use client";

import TaskCard from "./TaskCard";
import { Task } from "../types";

interface Props {
    tasks: Task[];
    onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onDelete }: Props) {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}