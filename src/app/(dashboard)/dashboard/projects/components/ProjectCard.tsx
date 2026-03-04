import { Project } from "../page";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-md transition space-y-4">
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
    </div>
  );
}