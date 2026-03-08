"use client"
import { useProjectStore } from "@/store/projectStore";
import Link from "next/link";
import { Project } from "@/types/project";
import { motion } from "framer-motion"
import StatusBadge from "./components/StatusBadge";
interface Stat {
  title: string;
  value: number;
}

interface DashboardProject {
  id: string
  name: string
  status: "Planning" | "In Progress" | "Completed"
  tasks: number
  dueDate: string
  progress: number;
}



export default function DashboardPage() {
  // Projects from zustand state 
  const projects = useProjectStore((state) => state.projects);

  // Tasks from zustand state 
  const allTasks = projects.flatMap((p) => p.tasks);

  // stats 
  const stats: Stat[] = [
    { title: "Total Projects", value: projects.length },
    { title: "Active Tasks", value: allTasks.filter(t => t.status === "In Progress").length },
    { title: "Completed Tasks", value: allTasks.filter(t => t.status === "Done").length },
    { title: "Total Tasks", value: allTasks.length },
  ];


  // dashboard projects to display 
  const dashboardProjects: DashboardProject[] = projects.map((p) => {
    const total = p.tasks.length;

    const completed = p.tasks.filter(
      (t) => t.status === "Done"
    ).length;

    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return {
      id: p.id,
      name: p.name,
      status: p.status,
      tasks: total,
      dueDate: p.dueDate,
      progress
    };
  });

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 ">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back — here’s what’s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

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
                <th>Status</th>
                <th>Tasks</th>
                <th className="mx-2">Due Date</th>
                <th>Progress</th>
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
    </div>
  );
}

function StatCard({ title, value }: Stat) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#1c0333] rounded-2xl p-6 shadow-sm border border-violet-100 dark:border-neutral-800 hover:shadow-md transition"
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      <h3 className="text-3xl font-bold text-violet-600 mt-2">
        {value}
      </h3>
    </motion.div>
  );
}

function TableRow({
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
      <td className="py-4 font-medium text-violet-600">
        <Link href={`/dashboard/projects/${id}`}>{name}</Link>
      </td>
      <td>
        <StatusBadge status={status} progress={progress} />
      </td>
      <td className="dark:text-gray-300">{tasks}</td>
      <td className="dark:text-gray-300">{dueDate}</td>
      <td className="w-40">
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

