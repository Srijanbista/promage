import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { ProjectStatus } from "@prisma/client";

const StatusPills = ({
  status = ProjectStatus.ONGOING,
}: {
  status: ProjectStatus;
}) => {
  const getStatusIcon = (status: ProjectStatus) => {
    if (status === ProjectStatus.ATRISK) {
      return <ShieldExclamationIcon className="w-4" />;
    } else if (status === ProjectStatus.COMPLETED) {
      return <CheckBadgeIcon className="w-4" />;
    } else if (status === ProjectStatus.ONGOING) {
      return <ArrowPathIcon className="w-4" />;
    } else if (status === ProjectStatus.DELAYED) {
      return <ArchiveBoxArrowDownIcon className="w-4" />;
    }

    return null;
  };
  const getClassByState = (state: ProjectStatus) => {
    if (state == ProjectStatus.ONGOING) {
      return "bg-sky-50 text-sky-500 shadow-sm shadow-sky-400";
    } else if (state == ProjectStatus.ATRISK) {
      return "bg-red-50 text-red-500 shadow-sm shadow-red-400";
    } else if (state == ProjectStatus.COMPLETED) {
      return "bg-green-50 text-green-500 shadow-sm shadow-green-400";
    } else if (state == ProjectStatus.DELAYED) {
      return "bg-orange-50 text-orange-500 shadow-sm shadow-orange-400";
    }
  };
  return (
    <div className="flex items-center gap-1 " title="Status">
      <span
        className={`flex gap-x-2 items-center rounded-full px-3 py-1.5 text-xs font-medium max-w-xs ${getClassByState(
          status
        )}`}
      >
        <span className={`text-xs`}>
          {status.slice(0, 1).toUpperCase() + status.slice(1).toLowerCase()}
        </span>
        {getStatusIcon(status)}
      </span>
    </div>
  );
};

export default StatusPills;
