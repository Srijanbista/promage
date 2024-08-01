"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { infoToast } from "../utils/Toaster";

const OverallProgressCard = ({
  total,
  totalCompleted,
  totalOngoing,
  totalAtRisk,
  totalDelayed,
}: {
  total: number;
  totalCompleted: number;
  totalOngoing: number;
  totalAtRisk: number;
  totalDelayed: number;
}) => {
  const getAnglesInDegrees = () => {
    const completedPercentage = (totalCompleted / total) * 360;
    const ongoingPercentage = (totalOngoing / total) * 360;
    const delayedPercentage = (totalDelayed / total) * 360;
    const atRiskPercentage = (totalAtRisk / total) * 360;

    return [
      completedPercentage,
      ongoingPercentage,
      delayedPercentage,
      atRiskPercentage,
    ];
  };

  const [completedAngle, ongoingAngle, delayedAngle, atRiskAngle] =
    getAnglesInDegrees();

  return (
    <div className="bg-white/35 rounded-2xl p-6 shadow-md flex flex-col gap-y-4 w-full items-center overflow-hidden">
      <div className="flex justify-between w-full">
        <h1 className="font-semibold">Overall Progress</h1>
        <button
          className="bg-white text-slate-800 flex gap-x-3 px-3 py-1 rounded-xl items-center"
          onClick={() => infoToast("Work in Progresss! ")}
        >
          <span className="text-xs lg:text-sm">All</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>
      <div
        className={`w-64 rounded-full h-64 relative grid place-items-center -rotate-90`}
        style={{
          backgroundImage: `conic-gradient(
            #22c55e 0deg, #22c55e ${completedAngle}deg,
            #0ea5e9 ${completedAngle}deg, #0ea5e9 ${
            completedAngle + ongoingAngle
          }deg,
            #f97316 ${ongoingAngle}deg, #f97316 ${
            completedAngle + ongoingAngle + delayedAngle
          }deg,
            #dc2626 ${
              completedAngle + ongoingAngle + delayedAngle
            }deg, #dc2626 ${
            completedAngle + ongoingAngle + delayedAngle + atRiskAngle
          }deg
          )`,
        }}
      >
        <div className="rounded-full w-60 h-60 bg-white rotate-90 flex flex-col justify-center items-center">
          <span className="text-4xl">{total}</span>
          <p>Projects</p>
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {totalCompleted}
          </div>
          <p className="text-sm text-neutral-600">Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {totalOngoing}
          </div>
          <p className="text-sm text-neutral-600">Ongoing</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {totalDelayed}
          </div>
          <p className="text-sm text-neutral-600">Delayed</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {totalAtRisk}
          </div>
          <p className="text-sm text-neutral-600">At Risk</p>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCard;
