"use client";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

export default function DeleteProjectModal({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}: DeleteProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1c0333] rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Delete Project
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">
            {projectName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}