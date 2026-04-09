import { use } from "react";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../../../../lib/prisma";
import ProjectDetailsClient from "./components/ProjectDetailsClient";
import { Project as UIProject } from "@/types/project";
import { redirect } from "next/navigation";

interface ProjectDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsProps) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const dbProject = await prisma.project.findUnique({
        where: {
            id,
            userId,
        },
        include: {
            tasks: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!dbProject) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1c0333] border border-violet-100 dark:border-neutral-800 rounded-2xl shadow-sm text-center">
                <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Project not found
                </h3>
                <p className="text-gray-500 mt-1">
                    The project you are looking for does not exist or you don't have access.
                </p>
            </div>
        );
    }

    const completedCount = dbProject.tasks.filter((t) => t.status === "Done").length;
    const status =
        dbProject.tasks.length === 0
            ? "Planning"
            : completedCount === dbProject.tasks.length
                ? "Completed"
                : "In Progress";

    const project: UIProject = {
        id: dbProject.id,
        name: dbProject.name,
        status,
        dueDate: dbProject.dueDate || new Date(dbProject.createdAt).toLocaleDateString(),
        tasks: dbProject.tasks.map((t) => ({
            id: t.id,
            title: t.title,
            status: t.status as any || "Todo",
        })),
    };

    return <ProjectDetailsClient project={project} />;
}
