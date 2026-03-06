"use client";

import { use, useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import { useProjectStore } from "@/store/projectStore";

interface ProjectDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProjectDetails({ params }: ProjectDetailsProps) {
    const { id } = use(params);
    //  get project from zustand 

    const project = useProjectStore((state) =>
        state.projects.find((p) => p.id === id)
    );

    if (!project) {
        return <p>Project not found</p>;
    }

    //  ZUSTAND ACTIONS
    const { addTask, deleteTask, toggleTask } = useProjectStore();

    //   task from zustand 
    const tasks = project.tasks;

    // filter state 
    const [filter, setFilter] = useState<"All" | "Todo" | "In Progress" | "Done">("All");
    // open add task modal 
    const [isOpen, setIsOpen] = useState(false);
    // FIltered tasks  
    const filteredTasks =
        filter === "All"
            ? tasks
            : tasks.filter((task) => task.status === filter);

    // handlers 

    const handleDeleteTask = (taskId: string) => {
        deleteTask(id, taskId);
    };

    const handleToggleStatus = (taskId: string) => {
        toggleTask(id, taskId);
    };

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Done"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const PlanningTasks = tasks.filter(
        (task) => task.status === "Todo"
    ).length;
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    {project.name}
                </h1>
                <p className="text-gray-500 mt-1">
                    Detailed overview of this project.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Total Tasks</h3>
                    <p className="text-2xl font-bold mt-2">{totalTasks}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Completed</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                        {completedTasks}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">In Progress</h3>
                    <p className="text-2xl font-bold text-violet-600 mt-2">
                        {inProgressTasks}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm text-gray-500">Planning</h3>
                    <p className="text-2xl font-bold text-gray-600 mt-2">
                        {PlanningTasks}
                    </p>
                </div>

            </div>

            {/* Task Section */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-sm space-y-4">
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

                {/* Filter Buttons UI */}
                <div className="flex gap-2">

                    {["All", "Planning", "In Progress", "Completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as "All" |"Todo" | "In Progress" | "Done")}
                            className={`px-3 py-1 rounded-lg text-sm transition
        ${filter === status
                                    ? "bg-violet-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {status}
                        </button>
                    ))}

                </div>

                <TaskList tasks={filteredTasks}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleStatus} />
            </div>

            <AddTaskModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                projectId={id}
            />
        </div>
    );
}