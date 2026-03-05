"use client";
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import NewProjectModal from "./components/NewProjectModal"
import ProjectFilters from "./components/ProjectFilters";
import { AnimatePresence } from "framer-motion";
import DeleteProjectModal from "./components/DeleteProjectModal";

import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "SaaS Dashboard",
      status: "In Progress",
      tasks: [],
      dueDate: "12 Mar 2026",
    },
    {
      id: "2",
      name: "E-commerce Platform",
      status: "Completed",
      tasks: [],
      dueDate: "02 Feb 2026",
    },
  ]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Planning" | "In Progress" | "Completed"
  >("All");

  const handleAddProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteProject(project);
  };

  const confirmDelete = () => {
    if (!deleteProject) return;

    setProjects((prev) =>
      prev.filter((p) => p.id !== deleteProject.id)
    );

    setDeleteProject(null);
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
      {/* Projects grid  */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={() => handleDeleteClick(project)} />
          ))}
        </AnimatePresence>
      </div>
      <DeleteProjectModal
        isOpen={!!deleteProject}
        onClose={() => setDeleteProject(null)}
        onConfirm={confirmDelete}
        projectName={deleteProject?.name || ""}
      />

      <NewProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}