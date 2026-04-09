import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardShell from "./components/DashboardShell";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { prisma } from "../../../../lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authenticate the session 
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Sync user to your Postgres Database
  // We check if they exist; if not, we create them using data from Clerk
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    const user = await currentUser();

    if (user) {
      await prisma.user.create({
        data: {
          clerkId: userId,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }
  }
  return <DashboardShell>{children}
    <SpeedInsights /></DashboardShell>;
}