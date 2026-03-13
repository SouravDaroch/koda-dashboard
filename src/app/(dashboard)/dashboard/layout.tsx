import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardShell from "./components/DashboardShell";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardShell>{children}
  <SpeedInsights/></DashboardShell>;
}