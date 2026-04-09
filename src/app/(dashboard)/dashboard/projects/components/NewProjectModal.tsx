
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectStatus } from "@/types/project";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/app/actions/projectActions";



export default function NewProjectModal({
    isOpen,
    onClose,

}: {
    isOpen: boolean;
    onClose: () => void;

}) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState<ProjectStatus>("Planning");
    const [dueDate, setDueDate] = useState("");
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const handleCreate = async () => {
        if (!name.trim() || isPending) return;

        setIsPending(true);
        try {
            const id = await createProjectAction(name, status, dueDate || new Date().toISOString().split('T')[0]);
            router.push(`/dashboard/projects/${id}`);
            setName("");
            setStatus("Planning");
            setDueDate("");
            onClose();
        } catch (error) {
            console.error("Failed to create project:", error);
            // You might want to show an error toast here
        } finally {
            setIsPending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-[#1c0333] w-full max-w-md rounded-2xl p-6 shadow-xl space-y-5"
                    >
                        <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 ">
                            Create New Project
                        </h2>


                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project Name"
                            className="w-full border border-violet-100  rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-neutral-700"
                        />

                        <select className="w-full border border-violet-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value as ProjectStatus
                                )
                            }
                        >
                            <option className="dark:bg-neutral-900">Planning</option>
                            <option className="dark:bg-neutral-900">In Progress</option>
                            <option className="dark:bg-neutral-900">Completed</option>
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full border border-violet-100 dark:border-neutral-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>




                            <button
                                disabled={!name.trim() || isPending}
                                onClick={handleCreate}
                                className="bg-linear-to-r from-violet-600 to-pink-400 text-white px-4 py-2 rounded-xl text-sm hover:bg-violet-700 transition disabled:opacity-50"
                            >
                                {isPending ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}