"use client"

import { useState } from "react"
import SideBar from "./SideBar"
import TopBar from "./TopBar"

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">

      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 bg-[#f8f7fc] dark:bg-[#130026]">

        <TopBar toggleSidebar={() => setSidebarOpen((p) => !p)} />

        <div className="p-6 md:p-8">
          {children}
        </div>

      </main>
    </div>
  )
}