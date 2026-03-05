"use client";
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import NewProjectModal from "./components/NewProjectModal"
import ProjectFilters from "./components/ProjectFilters";
import { AnimatePresence } from "framer-motion";

export interface Project {
  id: string;
  name: string;
  status: "Planning" | "In Progress" | "Completed";
  tasks: number;
  dueDate: string;
}

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "SaaS Dashboard",
      status: "In Progress",
      tasks: 24,
      dueDate: "12 Mar 2026",
    },
    {
      id: "2",
      name: "E-commerce Platform",
      status: "Completed",
      tasks: 40,
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

const handleDeleteProject = (id: string) => {
  setProjects((prev) => prev.filter((p) => p.id !== id));
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
          <ProjectCard key={project.id} project={project}  onDelete={handleDeleteProject}/>
        ))}
        </AnimatePresence>
      </div>

      <NewProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}