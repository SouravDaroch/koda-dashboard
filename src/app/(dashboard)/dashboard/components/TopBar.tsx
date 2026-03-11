"use client"

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import ThemeToggle from "../../../../../components/theme-toggle"

interface Props {
  toggleSidebar: () => void
}

export default function TopBar({ toggleSidebar }: Props) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#130026] dark:border-b dark:border-neutral-800 px-6 py-4 shadow-sm">

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-xl mr-3"
      >
        ☰
      </button>

      <h1 className="text-xl font-semibold md:hidden text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-violet-800">
        KODA
      </h1>

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />

        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  )
}