import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarItemProps {
  label: string;
  href: string;
}


export default function SidebarItem({
  label,
  href,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}
      className={`block px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition
        ${
           isActive
            ? "bg-linear-to-r from-violet-600 to-pink-400 text-white"
            : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
        }
      `}
    >
      {label}
    </Link>
  );
}