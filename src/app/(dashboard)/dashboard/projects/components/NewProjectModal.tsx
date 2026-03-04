export default function NewProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Create New Project
        </h2>

        <input
          type="text"
          placeholder="Project Name"
          className="w-full border border-violet-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select className="w-full border border-violet-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <button className="bg-linear-to-r from-violet-600 to-pink-400 text-white px-4 py-2 rounded-xl text-sm transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}