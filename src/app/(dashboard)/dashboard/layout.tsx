import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar - hidden on small screens */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 bg-[#f8f7fc] dark:bg-[#130026]">
        {/* Topbar */}
        <TopBar />

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}



