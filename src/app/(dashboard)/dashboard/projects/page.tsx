"use client";
import { motion } from "framer-motion"
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import NewProjectModal from "./components/NewProjectModal";
import ProjectFilters from "./components/ProjectFilters";
import { AnimatePresence } from "framer-motion";
import DeleteProjectModal from "./components/DeleteProjectModal";

import { Project } from "@/types/project";
import { useProjectStore } from "@/store/projectStore";

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const projects = useProjectStore((state) => state.projects);
  const removeProject = useProjectStore((state) => state.deleteProject);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Planning" | "In Progress" | "Completed"
  >("All");


  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = () => {
    if (!projectToDelete) return;

    removeProject(projectToDelete.id);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const noProjects = projects.length === 0;
  const noResults = filteredProjects.length === 0;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 ">
            Projects
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track your ongoing work.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-violet-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 transition"
        >
          + New Project
        </button>
      </div>

      <ProjectFilters
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />



      {noResults ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1c0333] border border-violet-100 dark:border-neutral-800 rounded-2xl shadow-sm text-center"
        >

          <div className="text-5xl mb-4">
            {noProjects ? "📂" : "🔍"}
          </div>

          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 ">
            {noProjects ? "No Projects Yet" : "No Results Found"}
          </h3>

          <p className="text-gray-500 mt-1">
            {noProjects
              ? "Create your first project to start managing work."
              : "Try changing the search or filter."}
          </p>

          {noProjects && (
            <button
              onClick={() => setIsOpen(true)}
              className="mt-5 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
            >
              + Create Project
            </button>
          )}
        </motion.div>
      ) :
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDeleteClick(project)}
                />
              ))}
          </AnimatePresence>
        </div>
      }


      <DeleteProjectModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        projectName={projectToDelete?.name || ""}
      />

      <NewProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}

      />
    </div>
  );
}