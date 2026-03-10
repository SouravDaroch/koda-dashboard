"use client"
import { useProjectStore } from "@/store/projectStore";
import StatCard from "./components/StatCard";
import ProjectTable from "./components/ProjectTable";
import TaskStatusChart from "../../../../components/task-status-chart";
import ProjectProgressChart from "../../../../components/project-progress-chart";
import { getProjectProgress } from "../../../../lib/getProjectProgress";
import Link from "next/link";
interface Stat {
  title: string;
  value: number;
}

export default function DashboardPage() {
  // Projects from zustand state 
  const projects = useProjectStore((state) => state.projects);

  // Tasks from zustand state 
  const allTasks = projects.flatMap((p) => p.tasks);

  const completedTasks = allTasks.filter(
    (t) => t.status === "Done"
  ).length;

  const inProgressTasks = allTasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const planningTasks = allTasks.filter(
    (t) => t.status === "Todo"
  ).length;

  // stats 
  const stats: Stat[] = [
    { title: "Total Projects", value: projects.length },
    { title: "Active Tasks", value: allTasks.filter(t => t.status === "In Progress").length },
    { title: "Completed Tasks", value: allTasks.filter(t => t.status === "Done").length },
    { title: "Total Tasks", value: allTasks.length },
  ];


  const projectProgressData = projects.slice(0, 6).map((p) => ({
    name: p.name,
    progress: getProjectProgress(p)
  }));

  return (
    <div className="space-y-8">
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

      {/* Charts  */}
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-[#1c0333] rounded-2xl border border-violet-100 dark:border-neutral-800 p-10 text-center">

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              No project data yet
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Create your first project to see analytics
            </p>
            <Link
              href="/dashboard/projects"
              className="inline-block mt-4 text-sm font-medium px-4 py-2 rounded-lg text-white bg-violet-600 hover:bg-violet-700"
            >
             + Create Project
            </Link>

          </div>
        ) : (<>
          <TaskStatusChart
            completed={completedTasks}
            inProgress={inProgressTasks}
            planning={planningTasks}
          />
          <ProjectProgressChart
            data={projectProgressData}
          />
        </>
        )}
      </div>

      <ProjectTable />
    </div>
  );
}




