import Link from "next/link";
import { motion } from "framer-motion"
import { getProjectProgress } from "../../../../../lib/getProjectProgress";
import { useProjectStore } from "@/store/projectStore";
import TableRow from "./TableRow";

interface DashboardProject {
  id: string
  name: string
  status: "Planning" | "In Progress" | "Completed"
  tasks: number
  dueDate: string
  progress: number;
}

export default function ProjectTable() {
    const projects = useProjectStore((state) => state.projects);
    // dashboard projects to display 
    const dashboardProjects: DashboardProject[] = projects.map((p) => {

        const progress = getProjectProgress(p);

        return {
            id: p.id,
            name: p.name,
            status: p.status,
            tasks: p.tasks.length,
            dueDate: p.dueDate,
            progress
        };
    });


    return <>
        {/* Projects Table */}
        <div className="bg-white dark:bg-[#1c0333] rounded-2xl shadow-sm border border-violet-100 dark:border-neutral-800 p-6  ">
            <div className="flex justify-between text-lg font-semibold text-gray-700 dark:text-gray-300   mb-6">
                Recent Projects <Link href={"/dashboard/projects"} className="text-sm hover:text-violet-600 text-gray-700 dark:text-gray-400">View All</Link>
            </div>

            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 dark:text-gray-300 text-sm border-b border-violet-100 dark:border-neutral-700">
                            <th className="py-3">Project</th>
                            <th className="py-4 px-2">Status</th>
                            <th className="py-4 px-2">Tasks</th>
                            <th className="py-4 px-2">Due Date</th>
                            <th className="py-4 px-2">Progress</th>
                        </tr>
                    </thead>

                    <motion.tbody
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.07
                                }
                            }
                        }}
                        className="text-sm text-gray-700"
                    >
                        {dashboardProjects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className=" text-center py-10 text-gray-500 dark:text-gray-300">
                                    No projects yet. Create your first project 🚀
                                </td>
                            </tr>
                        ) : (
                            dashboardProjects.map((project) => (
                                <TableRow key={project.id} {...project} />
                            ))
                        )}
                    </motion.tbody>
                </table>
            </div>
        </div>
    </>
}