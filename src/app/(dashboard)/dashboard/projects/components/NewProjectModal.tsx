import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewProjectModal({
    isOpen,
    onClose,
    onAdd
}: {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (project: {
        id: string;
        name: string;
        status: "Planning" | "In Progress" | "Completed";
        tasks: number;
        dueDate: string;
    }) => void;
}) {

    const [name, setName] = useState("");
    const [status, setStatus] = useState<
        "Planning" | "In Progress" | "Completed"
    >("Planning");
    // if (!isOpen) return null;

return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl space-y-5"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Create New Project
          </h2>


                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project Name"
                    className="w-full border border-violet-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <select className="w-full border border-violet-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value as any)
                    }
                >
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




                    <button
                        onClick={() => {
                            if (!name.trim()) return;

                            onAdd({
                                id: crypto.randomUUID(),
                                name,
                                status,
                                tasks: 0,
                                dueDate: new Date().toLocaleDateString(),
                            });

                            setName("");
                            setStatus("Planning");
                            onClose();
                        }}
                        className="bg-linear-to-r from-violet-600 to-pink-400 text-white px-4 py-2 rounded-xl text-sm hover:bg-violet-700 transition"
                    >
                        Create
                    </button>
                </div>
          </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);}