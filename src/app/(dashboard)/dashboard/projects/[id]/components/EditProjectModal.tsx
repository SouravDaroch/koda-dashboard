"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import {motion} from "framer-motion"

export default function EditProjectModal({
  id,
  currentName,
  currentDueDate,
  onClose,
}: {
  id: string;
  currentName: string;
  currentDueDate: string;
  onClose: () => void;
}) {
  const updateProject = useProjectStore((s) => s.updateProject);

  const [name, setName] = useState(currentName);
  const [dueDate, setDueDate] = useState(currentDueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProject(id, name, dueDate);
    onClose();
  };

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
 className="fixed inset-0 bg-black/40  backdrop-blur-sm flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1c0333] p-6 rounded-2xl w-md space-y-4"
      >
        <h2 className="text-lg font-semibold">Edit Project</h2>

        <input
          className="w-full border dark:border-neutral-500 rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded-lg dark:border-neutral-500 p-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500"
          >
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
    </motion.div>
  );
}