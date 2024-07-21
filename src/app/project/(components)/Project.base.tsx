"use client";
import ProjectCard from "@/app/components/ProjectCard";
import { ProjectWithManager } from "@/app/utils/types";
import { useState } from "react";

export const ProjectBase = ({
  projectsData,
}: {
  projectsData: ProjectWithManager[];
}) => {
  const [projects, setProjects] = useState<ProjectWithManager[]>(projectsData);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description ?? ""}
            managerEmail={project.manager.email ?? ""}
            managerName={project.manager.name ?? ""}
            dateCreated={project.createdAt}
            lastUpdated={project.updatedAt}
            dueDate={project.dueDate as any}
            progress={project.progress}
            budget={project.budget}
            status={project.status}
            projects={projects}
            setProjects={setProjects}
          />
        ))}
      </div>
    </>
  );
};
