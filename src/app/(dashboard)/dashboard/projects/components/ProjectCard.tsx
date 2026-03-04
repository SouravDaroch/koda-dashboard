"use client";

import { Project } from "../page";
import StatusBadge from "./StatusBadge";
import { easeOut, motion } from "framer-motion";

export default function ProjectCard({
    project,
}: {
    project: Project;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
                duration: 0.3,
                ease:easeOut  
                
                // ease: [0.22, 1, 1, 2], // smooth cubic-bezier
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-md transition space-y-4"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                    {project.name}
                </h3>
                <StatusBadge status={project.status} />
            </div>

            <div className="text-sm text-gray-500 space-y-1">
                <p>{project.tasks} Tasks</p>
                <p>Due: {project.dueDate}</p>
            </div>

            <button className="text-sm font-medium text-violet-600 hover:text-violet-700 transition">
                View Details →
            </button>
        </motion.div>
    );
}