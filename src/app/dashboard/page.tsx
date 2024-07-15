import {
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { OverviewCard } from "../components/OverviewCard";
export default function Home() {
  const overViewCardData = [
    {
      id: 1,
      icon: (
        <ChartBarIcon className="p-3 bg-purple-400 w-12 h-12 rounded-full text-white" />
      ),
      title: "Total Revenue",
      description: "$53,00989",
      additionalInfo: "12% increase from last month",
    },
    {
      id: 2,
      icon: (
        <BriefcaseIcon className="p-3 bg-orange-500/70 w-12 h-12 rounded-full text-white" />
      ),
      title: "Projects",
      description: "95/100",
      additionalInfo: "10% decrease from last month",
    },
    {
      id: 3,
      icon: (
        <ClockIcon className="p-3 bg-blue-500/70 w-12 h-12 rounded-full text-white" />
      ),
      title: "Time Spent",
      description: "1022 /1300 Hrs",
      additionalInfo: "8% increase from last month",
    },
    {
      id: 4,
      icon: (
        <UserIcon className="p-3 bg-blue-500/70 w-12 h-12 rounded-full text-white" />
      ),
      title: "Resources",
      description: "101/120",
      additionalInfo: "2% increase  from last month",
    },
  ];
  return (
    <main className="overflow-y-auto no-scrollbar scroll-smooth py-2 px-3 lg:px-6 lg:py-4 bg-primary text-black">
      <section>
        <h1 className="text-lg lg:text-2xl mb-4">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 ">
          {overViewCardData.map((data) => (
            <OverviewCard
              key={data.id}
              icon={data.icon}
              title={data.title}
              description={data.description}
              additioanlInfo={data.additionalInfo}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
