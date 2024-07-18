"use client";
import LoaderWithBackdrop from "@/app/components/LoaderWithBackdrop";
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
      <LoaderWithBackdrop isLoading={isLoading} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            managerName={project.manager.name ?? "No Manager"}
            dateCreated={project.createdAt}
            lastUpdated={project.updatedAt}
            progress={project.progress}
            budget={project.budget}
            status={project.status}
            projects={projects}
            setProjects={setProjects}
            setIsLoading={setIsLoading}
          />
        ))}
      </div>
    </>
  );
};
