"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";

export default function EditTaskModal({
  projectId,
  task,
  onClose,
}: any) {
  const editTask = useProjectStore((s) => s.editTask);
  const [title, setTitle] = useState(task.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTask(projectId, task.id, title);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-[320px]"
      >
        <h2 className="text-lg font-semibold mb-4">
          Edit Task
        </h2>

        <input
          className="w-full border rounded p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}