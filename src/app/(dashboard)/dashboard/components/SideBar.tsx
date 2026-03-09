
"use client";
import SidebarItem from "./SideBarItems";


const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/dashboard/projects" },
    { label: "Settings", href: "/dashboard/settings" },
];

export default function SideBar() {
    return <aside className="hidden md:flex w-64 bg-white dark:bg-[#130026] border-r border-violet-100 dark:border-neutral-800 flex-col justify-between p-6">
        <div>
            {/* Logo */}
            <h2 className="text-2xl font-bold text-violet-600 mb-10 ">
                KODA
            </h2>

            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                    />
                ))}
            </nav>
        </div>

        {/* Bottom */}
        <button className="mt-10 text-sm text-gray-500 hover:text-violet-600 transition">
            Logout
        </button>
    </aside>
}