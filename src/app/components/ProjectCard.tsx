"use client";

import {
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { dateFormatter } from "../utils/helpers";
import { deleteProjectById } from "../project/(services)/project.service";
import { errorToast, successToast } from "../utils/Toaster";
import { ProjectWithManager } from "../utils/types";
import StatusPills from "./StatusPills";
import { ProjectStatus } from "@prisma/client";
import CircularProgress from "./CircularProgress";
import { EditProjectForm } from "./EditProjectForm";
import { Modal } from "./Modal";

export type ProjectCardProps = {
  status: ProjectStatus;
  id: string;
  title: string;
  description: string;
  managerName: string;
  managerEmail: string;
  dateCreated: Date;
  lastUpdated: Date;
  dueDate: Date;
  progress: number;
  budget?: number;
  projects: ProjectWithManager[];
  setProjects: CallableFunction;
};
const ProjectCard = ({
  status = "ONGOING",
  id,
  title,
  description,
  managerName,
  managerEmail,
  dateCreated,
  lastUpdated,
  dueDate,
  progress,
  budget = 0,
  projects,
  setProjects,
}: ProjectCardProps) => {
  let color = "";
  const styleSwitcher = () => {
    if (status == "ONGOING") color = "border-sky-500";
    else if (status == "DELAYED") color = "border-orange-500";
    else if (status == "ATRISK") color = "border-red-500";
    else if (status == "COMPLETED") color = "border-green-500";
    else color = "border-neutral-500";
  };
  styleSwitcher();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  const handleDeleteAppScoreCard = async (id: string) => {
    deleteProjectById(id)
      .then((resp) => {
        successToast("Project Deleted Successfully!");
        setProjects(projects.filter((project) => project.id !== id));
      })
      .catch((err) => {
        errorToast("Error Deleting Project");
      });
  };

  return (
    <>
      <div
        key={id}
        className={
          `relative bg-white/30 transition-all duration-300 ease-in-out group/project-card p-4 flex  flex-col items-stretch text-left gap-y-3 gap-x-1.5 max-w-screen-md shadow-md hover:shadow-lg rounded-lg cursor-pointer border-s-4 ` +
          color
        }
      >
        <div className="flex gap-5 relative items-center">
          <div className=" flex justify-between overflow-hidden grow">
            <div className="overflow-hidden grow">
              <div
                title={title}
                className="mb-0.5 text-neutral-900 text-lg font-medium w-11/12  truncate ..."
              >
                {title}
              </div>
              <button
                title={`Click to copy ID to Clipboard: ${id}`}
                className="text-neutral-800 text-xs font-light text-left cursor-copy w-11/12 truncate ..."
              >
                {`ID: `}
                {id}
              </button>
            </div>
            <span className="text-neutral-700 relative ">
              <span className="opacity-0 flex gap-x-2 items-center group-hover/project-card:opacity-100 group-hover/project-card:z-50 ">
                <button
                  title="Edit Project"
                  className="p-2 rounded-full text-left bg-white group/edit hover:bg-primary-50"
                  onClick={() => {
                    setIsEditProjectModalOpen(true);
                  }}
                >
                  <PencilIcon className="h-4 w-4 group-hover/edit:text-black text-neutral-800 transition-transform ease-in-out rotate-180 group-hover/project-card:rotate-0 duration-300 delay-100" />
                </button>
                <button
                  title="Delete Project"
                  className="p-2 rounded-full bg-white group/delete hover:bg-red-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDeleteConfirmationModal(true);
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDeleteConfirmationModal(true);
                  }}
                >
                  <TrashIcon className="w-4 h-4 text-neutral-800 group-hover/delete:text-red-500 transition-transform ease-in-out rotate-180 group-hover/project-card:rotate-0 duration-300 delay-100" />
                </button>
              </span>
              <EllipsisVerticalIcon className="absolute top-0 right-0 w-8 text-neutral-800 font-semibold group-hover/project-card:opacity-0 transition-transform -rotate-180 group-hover/project-card:-z-10 group-hover/project-card:rotate-0 duration-300 delay-100" />
            </span>
          </div>
        </div>
        <div className="flex ">
          <div className="flex-1 overflow-hidden">
            <p className="text-neutral-700 text-sm font-normal">Manager</p>
            <p
              className="text-neutral-800 text-base font-medium w-11/12 truncate ..."
              title={managerName}
            >
              {managerName}
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-neutral-700 text-sm font-normal">Due Date</p>
            <p
              className="text-neutral-800 text-base font-medium w-11/12 truncate ..."
              title={dateFormatter(new Date(dueDate)) ?? "Created Date"}
            >
              {dateFormatter(new Date(dueDate))}
            </p>
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <p className="text-neutral-700 text-sm font-normal">Date Created</p>
            <p
              className="text-neutral-800 text-base font-medium w-11/12 truncate ..."
              title={dateFormatter(new Date(dateCreated)) ?? "Created Date"}
            >
              {dateFormatter(new Date(dateCreated))}
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-neutral-700 text-sm font-normal">Last Updated</p>
            <p
              className=" text-neutral-800 text-base font-medium w-11/12 truncate ..."
              title={dateFormatter(new Date(dateCreated)) ?? "Updated Date"}
            >
              {dateFormatter(new Date(lastUpdated))}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between grow border-t pt-2 border-white">
          <StatusPills status={status} />
          <CircularProgress completionPercentage={progress} size="sm" />
        </div>
      </div>
      <ConfirmationModal
        title="Delete Project?"
        description="Are you sure you want to delete the Project? All of your data will be permanently removed. This action cannot be undone."
        isModalOpen={showDeleteConfirmationModal}
        setIsModalOpen={setShowDeleteConfirmationModal}
        handlePrimaryAction={() => handleDeleteAppScoreCard(id)}
        primaryButtonLabel="Delete"
        logo={<ExclamationTriangleIcon aria-hidden="true" />}
      />
      <Modal
        isModalOpen={isEditProjectModalOpen}
        setIsModalOpen={setIsEditProjectModalOpen}
      >
        <EditProjectForm
          setIsEditProjectModalOpen={setIsEditProjectModalOpen}
          projectData={{
            id,
            title,
            description,
            managerName,
            managerEmail,
            status,
            dueDate,
            progress,
            budget,
          }}
        />
      </Modal>
    </>
  );
};

export default ProjectCard;
