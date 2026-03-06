export default function StatusBadge({
  status, progress
}: {
  status: "Planning" | "In Progress" | "Completed";
  progress: number
}) {
  const base =
    "px-3 py-1 text-xs rounded-full font-medium";

  if (status === "Completed" || progress == 100)
    return (
      <span className={`${base} bg-green-100 text-green-600`}>
        {status}
      </span>
    );

  if (status === "In Progress")
    return (
      <span className={`${base} bg-violet-50 text-violet-600`}>
        {status}
      </span>
    );

  return (
    <span className={`${base} bg-gray-100 text-gray-600`}>
      {status}
    </span>
  );
}