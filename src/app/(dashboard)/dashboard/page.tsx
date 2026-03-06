"use client"
import { useProjectStore } from "@/store/projectStore";
import Link from "next/link";
import { Project } from "@/types/project";
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
}



export default function DashboardPage() {
  const projects = useProjectStore((state) => state.projects);

  const allTasks = projects.flatMap((p) => p.tasks);

  const stats: Stat[] = [
    { title: "Total Projects", value: projects.length },
    { title: "Active Tasks", value: allTasks.filter(t => t.status === "In Progress").length },
    { title: "Completed Tasks", value: allTasks.filter(t => t.status === "Done").length },
    { title: "Total Tasks", value: allTasks.length },
  ];


  const dashboardProjects: DashboardProject[] = projects.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    tasks: p.tasks.length,
    dueDate: p.dueDate,
  }));

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
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
      <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Recent Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-violet-100">
                <th className="py-3">Project</th>
                <th>Status</th>
                <th>Tasks</th>
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {dashboardProjects.map((project) => (
                <TableRow key={project.id} {...project} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: Stat) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100 hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-violet-600 mt-2">
        {value}
      </h3>
    </div>
  );
}

function TableRow({
  id,
  name,
  status,
  tasks,
  dueDate,
}: DashboardProject) {
  return (
    <tr className="border-b border-violet-50 last:border-none hover:bg-violet-50/40 transition">
      <td className="py-4 font-medium text-violet-600">
        <Link href={`/dashboard/projects/${id}`}>{name}</Link>
      </td>
      <td>
        <StatusBadge status={status} />
      </td>
      <td>{tasks}</td>
      <td>{dueDate}</td>
    </tr>
  );
}

function StatusBadge({
  status,
}: {
  status: "Planning" | "In Progress" | "Completed";
}) {
  const base =
    "px-3 py-1 text-xs rounded-full font-medium";

  if (status === "Completed")
    return (
      <span className={`${base} bg-violet-100 text-violet-700`}>
        {status}
      </span>
    );

  if (status === "In Progress")
    return (
      <span className={`${base} bg-violet-50 text-violet-600`}>
        {status}
      </span>
    );

  return (
    <span className={`${base} bg-gray-100 text-gray-600`}>
      {status}
    </span>
  );
}