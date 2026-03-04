import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on small screens */}
  <SideBar/>

      {/* Main Content */}
    <main className="flex-1 bg-[#f8f7fc]">
  {/* Topbar */}
<TopBar/>

  {/* Page Content */}
  <div className="p-6 md:p-8">
    {children}
  </div>
</main>
    </div>
  );
}



