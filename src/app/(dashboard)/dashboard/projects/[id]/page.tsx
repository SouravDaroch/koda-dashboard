"use client"
interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

import { useState } from "react";
import TaskList from "./components/TaskList";
import { Task } from "./types";
import AddTaskModal from "./components/AddTaskModal";

const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Setup authentication", status: "Done" },
    { id: "2", title: "Build dashboard UI", status: "In Progress" },
    { id: "3", title: "Connect API", status: "Todo" },
]);

const [isOpen, setIsOpen] = useState(false);

const handleAddTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
};

export default async function ProjectDetails({ params }: PageProps) {
    const { id } = await params;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Project {id}
                </h1>
                <p className="text-gray-500 mt-1">
                    Detailed overview of this project.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Status</h3>
                    <p className="text-lg font-semibold mt-1">In Progress</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Tasks</h3>
                    <p className="text-lg font-semibold mt-1">24 Tasks</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Due Date</h3>
                    <p className="text-lg font-semibold mt-1">12 Mar 2026</p>
                </div>
            </div>

            {/* Task list  */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Tasks
                </h2>

                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700"
                >
                    + Add Task
                </button>
            </div>
            <AddTaskModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onAdd={handleAddTask}
            />
        </div>
    );
}