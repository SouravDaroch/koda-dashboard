import { motion } from "framer-motion"
import StatusBadge from "../../../../../components/StatusBadge"
import Link from "next/link"

interface DashboardProject {
    id: string
    name: string
    status: "Planning" | "In Progress" | "Completed"
    tasks: number
    dueDate: string
    progress: number;
}

export default function TableRow({
    id,
    name,
    status,
    tasks,
    dueDate,
    progress
}: DashboardProject) {
    return (
        <motion.tr
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3 }}
            className=" border-b border-violet-50 dark:border-neutral-700 last:border-none hover:bg-violet-50/40 dark:hover:bg-[#110121] transition "
        >
            <td className="py-4 pr-2 font-medium text-violet-600">
                <Link href={`/dashboard/projects/${id}`}>{name}</Link>
            </td>
            <td className="py-4 px-2">
                <StatusBadge status={status} progress={progress} />
            </td>
            <td className="dark:text-gray-300 py-4 px-2">{tasks}</td>
            <td className="dark:text-gray-300 py-4 px-2">{dueDate}</td>
            <td className="w-40 py-4 px-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </td>
        </motion.tr>
    );
}