import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../../../lib/prisma";
import ProjectsClient from "./components/ProjectsClient";
import { Project as UIProject } from "@/types/project";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dbProjects = await prisma.project.findMany({
    where: { userId },
    include: { tasks: true },
    orderBy: { createdAt: "desc" },
  });

  const projects: UIProject[] = dbProjects.map((p) => {
    const completedCount = p.tasks.filter((t) => t.status === "Done").length;
    const status =
      p.tasks.length === 0
        ? "Planning"
        : completedCount === p.tasks.length
          ? "Completed"
          : "In Progress";

    return {
      id: p.id,
      name: p.name,
      status,
      dueDate: p.dueDate || new Date(p.createdAt).toLocaleDateString(), // Use createdAt as fallback for dueDate
      tasks: p.tasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status as any || "Todo",
      })),
    };
  });

  return <ProjectsClient initialProjects={projects} />;
}
