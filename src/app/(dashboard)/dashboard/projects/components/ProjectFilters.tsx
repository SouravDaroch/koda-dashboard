"use client";
import { ProjectStatus } from "@/types/project";

type FilterStatus = "All" | ProjectStatus;

type ProjectFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (value: FilterStatus) => void;
};

export default function ProjectFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border border-violet-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-neutral-700"
      />

      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as FilterStatus)
        }
        className="border border-violet-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-neutral-800"
      >
        <option value="All">All</option>
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}