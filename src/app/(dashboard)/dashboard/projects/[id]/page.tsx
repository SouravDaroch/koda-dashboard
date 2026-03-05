"use client";

import { use, useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import { Task } from "./types";

interface ProjectDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProjectDetails({ params }: ProjectDetailsProps) {
    const { id } = use(params);



    // Task state 
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Setup authenticationdewrthyuesrtertefrtwer5rrww4e5efwrtefrtsrdtryereteretrdtghjfghfgvudfgcufuhifghijfgiojxfgchvudfghudfcgvhijdfgyhugvhsadfghdsrdgtfdfsdsfrdf", status: "Done" },
        { id: "2", title: "Build dashboard UI", status: "In Progress" },
        { id: "3", title: "Connect API", status: "Todo" },
    ]);
    // filter state 
    const [filter, setFilter] = useState<"All" | "Todo" | "In Progress" | "Done">("All");
    // open add task modal 
    const [isOpen, setIsOpen] = useState(false);
// FIltered tasks  
    const filteredTasks =
  filter === "All"
    ? tasks
    : tasks.filter((task) => task.status === filter);

    // Add task 
    const handleAddTask = (task: Task) => {
        setTasks((prev) => [task, ...prev]);
    };
    // Delete Task 
    const handleDeleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Toggle status 
    const handleToggleStatus = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status:
                            task.status === "Todo"
                                ? "In Progress"
                                : task.status === "In Progress"
                                    ? "Done"
                                    : "Todo",
                    }
                    : task
            )
        );
    };


    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Done"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const todoTasks = tasks.filter(
        (task) => task.status === "Todo"
    ).length;
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
                    <h3 className="text-sm text-gray-500">Todo</h3>
                    <p className="text-2xl font-bold text-gray-600 mt-2">
                        {todoTasks}
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

  {["All", "Todo", "In Progress", "Done"].map((status) => (
    <button
      key={status}
      onClick={() => setFilter(status as any)}
      className={`px-3 py-1 rounded-lg text-sm transition
        ${
          filter === status
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
                onAdd={handleAddTask}
            />
        </div>
    );
}