import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7fc] dark:bg-[#130026] flex flex-col items-center justify-center px-6 text-center py-10 md:py-0">

      {/* Logo */}
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-violet-800 mb-6">
        KODA
      </h1>

      {/* Headline */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Project Management Dashboard
      </h2>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-8">
        Manage projects, track tasks, and visualize progress with a modern dashboard
        built using Next.js, TypeScript, and Tailwind CSS.
      </p>

      {/* CTA */}
      <Link
        href="/dashboard"
        className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
      >
        View Dashboard
      </Link>
      <Link
        href="https://github.com/SouravDaroch/koda-dashboard"
        target="_blank"
        className="px-4.5 mt-3 py-3 rounded-xl border border-violet-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-[#1c0333] transition"
      >
        View Source Code
      </Link>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl border border-violet-100 dark:border-neutral-800">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Project Management
          </h3>
          <p className="text-sm text-gray-500">
            Create and manage multiple projects with ease.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl border border-violet-100 dark:border-neutral-800">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Task Tracking
          </h3>
          <p className="text-sm text-gray-500">
            Track task progress from planning to completion.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl border border-violet-100 dark:border-neutral-800">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Analytics Dashboard
          </h3>
          <p className="text-sm text-gray-500">
            Visualize progress with charts and project insights.
          </p>
        </div>

      </div>

    </main>
  );
}
