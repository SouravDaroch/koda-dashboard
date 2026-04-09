"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Server Action to create a new project.
 * Uses Clerk for auth and Prisma to create the record in Neon.
 */
export async function createProjectAction(name: string, status: string, dueDate?: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: You must be logged in to create a project.");
  }

  const project = await prisma.project.create({
    data: {
      name,
      status,
      userId,
      dueDate,
    },
  });

  // Automatically update the dashboard UI
  revalidatePath("/dashboard");

  return project.id;
}

/**
 * Server Action to delete a project.
 */
export async function deleteProjectAction(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.project.delete({
    where: {
      id,
      userId, // Ensure the user owns the project
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
}

/**
 * Server Action to update a project.
 */
export async function updateProjectAction(
  id: string,
  data: { name?: string; status?: string; dueDate?: string }
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const project = await prisma.project.update({
    where: {
      id,
      userId,
    },
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);

  return project;
}

/**
 * Server Action to add a task to a project.
 */
export async function addTaskAction(projectId: string, title: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.create({
    data: {
      title,
      projectId,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");

  return task;
}

/**
 * Server Action to delete a task.
 */
export async function deleteTaskAction(projectId: string, taskId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.task.delete({
    where: {
      id: taskId,
      projectId,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
}

/**
 * Server Action to edit a task's title.
 */
export async function editTaskAction(
  projectId: string,
  taskId: string,
  title: string
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.task.update({
    where: {
      id: taskId,
      projectId,
    },
    data: {
      title,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
}


/**
 * Server Action to update a task's status.
 */
export async function updateTaskStatusAction(
  projectId: string,
  taskId: string,
  status: string
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.task.update({
    where: {
      id: taskId,
      projectId,
    },
    data: {
      status,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
}


