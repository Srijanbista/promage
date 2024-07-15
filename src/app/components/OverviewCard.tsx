import { ReactNode } from "react";

export const OverviewCard = ({
  icon,
  title,
  description,
  additioanlInfo = "",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  additioanlInfo?: string;
}) => {
  return (
    <div className="bg-white/50 rounded-2xl p-6 shadow-md flex flex-col gap-y-4">
      {icon}
      <div className="flex flex-col gap-y-2">
        <span className="rounded-md text-black/60">{title}</span>
        <h2 className="text-3xl font-medium text-black">{description}</h2>
        <span className="text-black text-xs">{additioanlInfo}</span>
      </div>
    </div>
  );
};
