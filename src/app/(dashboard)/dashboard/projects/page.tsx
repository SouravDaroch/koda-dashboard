"use client";

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
  const addProject = useProjectStore((state) => state.addProject);
  const removeProject = useProjectStore((state) => state.deleteProject);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Planning" | "In Progress" | "Completed"
  >("All");

  const handleAddProject = (project: Project) => {
    addProject(project);
  };

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

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Projects
          </h1>
          <p className="text-gray-500 mt-1">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDeleteClick(project)}
            />
          ))}
        </AnimatePresence>
      </div>

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