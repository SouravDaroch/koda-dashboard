"use client";

import { Project } from "@/types/project";
import StatusBadge from "./StatusBadge";
import { easeOut, motion } from "framer-motion";
import Link from "next/link";
type ProjectCardProps = {
    project: Project;
    onDelete: () => void;
}

export default function ProjectCard({
    project,
    onDelete
}:
    ProjectCardProps
) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
                duration: 0.4,
                ease: easeOut
                // ease: [0.22, 1, 1, 2], // smooth cubic-bezier
            }}
            whileHover={{
                y: -4,
                transition: {
                    duration: 0.2,
                    ease: easeOut
                },
            }}
            className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-lg transition space-y-4"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                    {project.name}
                </h3>
                <StatusBadge status={project.status} />
            </div>

            <div className="text-sm text-gray-500 space-y-1">
                <p>{project.tasks.length} Tasks</p>
                <p>Due: {project.dueDate}</p>
            </div>
            <div className="flex justify-between">
                <Link href={`/dashboard/projects/${project.id}`}
                    className="text-sm font-medium text-violet-600 hover:text-violet-700 transition">
                    View Details →

                </Link>

                <button
                    onClick={onDelete}
                    className="text-sm text-red-500 hover:text-red-600 transition cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </motion.div>

    );
}