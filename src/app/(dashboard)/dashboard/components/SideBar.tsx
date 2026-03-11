"use client";

import SidebarItem from "./SideBarItems";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Settings", href: "/dashboard/settings" },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function SideBar({ open, setOpen }: Props) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
        fixed md:sticky top-0 left-0 z-50
        w-64 min-h-full md:min-h-screen
        bg-white dark:bg-[#130026]
        border-r border-violet-100 dark:border-neutral-800
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col justify-between p-6
        `}
      >
        <div>
            <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-violet-800 mb-10">
            KODA
          </h2>
          <button onClick={()=> setOpen(false)} className="md:hidden">X</button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <SidebarItem
                key={item.href}
                label={item.label}
                href={item.href}
                closeBar = {()=> setOpen(false)}
              />
            ))}
          </nav>
        </div>

         <button className="mt-10 text-sm text-gray-500 hover:text-violet-600 transition">
          Logout
        </button> 
      </aside>
    </>
  );
}