"use client"
import { useProjectStore } from "@/store/projectStore";
import StatCard from "./components/StatCard";
import ProjectTable from "./components/ProjectTable";
import TaskStatusChart from "../../../../components/task-status-chart";
import ProjectProgressChart from "../../../../components/project-progress-chart";
import { getProjectProgress } from "../../../../lib/getProjectProgress";
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


  const projectProgressData = projects.map((p) => ({
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
      <div className="grid lg:grid-cols-2 gap-6">
        <TaskStatusChart
          completed={completedTasks}
          inProgress={inProgressTasks}
          planning={planningTasks}
        />
        <ProjectProgressChart
          data={projectProgressData}
        />
      </div>

      <ProjectTable />
    </div>
  );
}




