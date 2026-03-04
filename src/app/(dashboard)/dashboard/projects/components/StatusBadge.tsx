export default function StatusBadge({
  status,
}: {
  status: "Planning" | "In Progress" | "Completed";
}) {
  const base =
    "px-3 py-1 text-xs rounded-full font-medium";

  if (status === "Completed")
    return (
      <span className={`${base} bg-violet-100 text-violet-700`}>
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