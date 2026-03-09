import { Project } from "@/types/project";

export function getProjectProgress(project: Project): number {
  const total = project.tasks.length;

  if (total === 0) return 0;

  const completed = project.tasks.filter(
    (t) => t.status === "Done"
  ).length;

  return Math.round((completed / total) * 100);
}