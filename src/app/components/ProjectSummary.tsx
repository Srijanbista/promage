import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ProjectWithManager } from "../utils/types";
import { dateFormatter } from "../utils/helpers";
import { ProjectStatus } from "@prisma/client";
import CircularProgress from "./CircularProgress";

const ProjectSummary = ({ projects }: { projects: ProjectWithManager[] }) => {
  console.log("projects", projects);

  const getColorAndBackgroundColorByStatus = (status: ProjectStatus) => {
    let color = "";
    let bgColor = "";
    switch (status) {
      case "ONGOING":
        color = "text-sky-500";
        bgColor = "bg-sky-100";
        break;
      case "DELAYED":
        color = "text-orange-500";
        bgColor = "bg-orange-100";
        break;
      case "ATRISK":
        color = "text-red-500";
        bgColor = "bg-red-100";
        break;
      case "COMPLETED":
        color = "text-green-500";
        bgColor = "bg-green-100";
        break;
      default:
        color = "text-neutral-500";
        bgColor = "bg-neutral-100";
        break;
    }
    return `${color} ${bgColor}`;
  };
  return (
    <div className="bg-white/35 rounded-2xl p-6 shadow-md flex flex-col gap-y-4 overflow-hidden">
      <div className="flex justify-between">
        <h1 className="font-semibold">Project Summary</h1>
        <div className="flex gap-x-2">
          <button className="bg-white text-slate-800 hidden md:flex gap-x-3 px-3 py-1 rounded-xl items-center ">
            <span className="text-xs lg:text-sm">Project</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="bg-white text-slate-800 hidden md:flex gap-x-3 px-3 py-1 rounded-xl items-center">
            <span className="text-xs lg:text-sm">Project Manager</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="bg-white text-slate-800 flex gap-x-3 px-3 py-1 rounded-xl items-center">
            <span className="text-xs lg:text-sm">Status</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {projects?.length > 0 ? (
        <div className="flex flex-col h-full overflow-x-auto">
          <div className="w-full text-base font-medium text-neutral-900">
            <div className="w-full px-4 py-2 border-b flex justify-center">
              <div className="grid grid-cols-10 gap-3 w-full text-sm">
                <div className="col-span-3 flex items-center gap-1">
                  <span className="truncate">Name</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="truncate">Project Manager</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="truncate">Due Date</p>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center">
                  <p className="truncate">Status</p>
                </div>
                <div className="hidden col-span-1 md:flex items-center">
                  <p className="truncate">Progress</p>
                </div>
              </div>
            </div>
          </div>

          {projects?.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="w-full p-2 border-b flex justify-center"
            >
              <div className="grid grid-cols-10 gap-3 w-full text-xs md:text-sm pl-2">
                <div className="col-span-3 flex items-center gap-1">
                  <span className="truncate">{project.title}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="truncate">{project.manager?.name}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="truncate">
                    {dateFormatter(project.dueDate as any) ?? "--"}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center">
                  <p
                    className={`truncate px-2 py-1 rounded-3xl ${getColorAndBackgroundColorByStatus(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </p>
                </div>
                <div className="hidden col-span-1 md:flex items-center">
                  <CircularProgress
                    completionPercentage={project.progress}
                    variant="progress"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500">
          No projects found
        </div>
      )}
    </div>
  );
};

export default ProjectSummary;
