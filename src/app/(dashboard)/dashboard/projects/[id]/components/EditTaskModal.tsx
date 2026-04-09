"use client";

import { useState } from "react";
import { editTaskAction } from "@/app/actions/projectActions";

export default function EditTaskModal({
  projectId,
  task,
  onClose,
}: {
  projectId: string;
  task: { id: string; title: string };
  onClose: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isPending) return;

    setIsPending(true);
    try {
      await editTaskAction(projectId, task.id, title);
      onClose();
    } catch (error) {
      console.error("Failed to edit task:", error);
    } finally {
      setIsPending(false);
    }
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
            disabled={isPending || !title.trim()}
            className="bg-violet-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}