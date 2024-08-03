"use client";
import { startLoading } from "@/app/(slice)/LoaderSlice";
import { setProjects } from "@/app/(slice)/ProjectSlice";
import ProjectCard from "@/app/components/ProjectCard";
import { RootState } from "@/app/store";
import { ProjectWithManager } from "@/app/utils/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ProjectBase = ({
  projectsData,
}: {
  projectsData: ProjectWithManager[];
}) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.data);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);

  useEffect(() => {
    dispatch(setProjects(projectsData));
  }, [projectsData, dispatch]);
  if (isLoading) {
    dispatch(startLoading());
    return null;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project: ProjectWithManager) => (
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
