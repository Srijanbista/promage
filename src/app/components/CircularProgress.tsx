import { ProjectStatus } from "@prisma/client";

type CircularProgressProps = {
  completionPercentage?: number;
  size?: "xs" | "sm";
  title?: string;
  variant?: "report" | "progress";
  achievedScore?: number;
  totalScore?: number;
  riskRating?: ProjectStatus;
};
const CircularProgress = ({
  completionPercentage,
  size = "xs",
  title = "Progress",
  variant = "progress",
  achievedScore = 200,
  totalScore = 400,
  riskRating = ProjectStatus.ONGOING,
}: CircularProgressProps) => {
  let start = 0;
  let end = (completionPercentage ?? 0) * 3.6;

  if (completionPercentage === undefined || completionPercentage === null) {
    completionPercentage = 0;
  } else if (completionPercentage < 0) {
    completionPercentage = 0;
  } else if (completionPercentage > 100) {
    completionPercentage = 100;
  }
  completionPercentage = Math.round(completionPercentage);

  const colorSwitcher = (riskRating: ProjectStatus) => {
    if (riskRating == ProjectStatus.COMPLETED) return "#22c55e";
    else if (riskRating == ProjectStatus.ONGOING) return "#0ea5e9";
    else if (riskRating == ProjectStatus.DELAYED) return "#f97316";
    else if (riskRating == ProjectStatus.ATRISK) return "#ef4444";
  };

  return (
    <div className={`flex gap-2 items-center `}>
      {
        <span className={`text-${size} text-neutral-700 font-normal`}>
          {title}
        </span>
      }
      <div
        className={` ${
          variant == "report" ? "w-20 h-20 " : "w-12 h-12"
        } rounded-full flex  items-center justify-center`}
        style={{
          backgroundImage: `conic-gradient(${
            variant == "report" ? colorSwitcher(riskRating) : "#6B06EF"
          } ${start}deg ${end}deg,#DBDBDB ${end}deg)`,
        }}
      >
        <div
          className={`flex ${
            variant == "report" ? "w-[70px] h-[70px] " : "w-10 h-10"
          } text-neutral-600 text-xs bg-white rounded-full text-center items-center justify-center`}
        >
          <span className="font-medium">{`${completionPercentage || 0}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
