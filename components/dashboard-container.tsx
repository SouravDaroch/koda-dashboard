"use client"

export default function DashboardContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-neutral-950 transition-colors">
      {children}
    </main>
  )
}