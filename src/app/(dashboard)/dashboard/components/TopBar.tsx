"use client"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import ThemeToggle from "../../../../../components/theme-toggle"

export default function TopBar() {
  return <div className="flex items-center justify-between bg-white dark:bg-[#130026] border-b dark:border-neutral-800 px-6 py-4 shadow-sm">
    <h1 className="text-xl font-semibold md:hidden">Koda</h1>

    <div className="ml-auto flex items-center gap-4">
      <ThemeToggle />
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
      {/* <div className="h-8 w-8 rounded-full bg-gray-300" /> */}
    </div>
  </div>
}