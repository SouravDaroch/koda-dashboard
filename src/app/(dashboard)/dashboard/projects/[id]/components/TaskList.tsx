"use client";

import TaskCard from "./TaskCard";
import { Task } from "../types";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}