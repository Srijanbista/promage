import {
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { OverviewCard } from "./components/OverviewCard";
import { getAllProjects } from "./api/project/(services)/project.service";
import ProjectSummary from "./components/ProjectSummary";
import { ProjectWithManager } from "./utils/types";
export default async function Home() {
  try {
    const projects: ProjectWithManager[] = await getAllProjects();
    const totalRevenue =
      projects?.reduce((amount, project) => amount + project.budget!, 0) ?? 0;

    const overViewCardData = [
      {
        id: 1,
        icon: (
          <ChartBarIcon className="p-3 bg-[#D398E7] w-12 h-12 rounded-full text-white" />
        ),
        title: "Total Revenue",
        description: totalRevenue.toString(),
        additionalInfo: "12% increase from last month",
      },
      {
        id: 2,
        icon: (
          <BriefcaseIcon className="p-3 bg-[#E89271] w-12 h-12 rounded-full text-white" />
        ),
        title: "Projects",
        description: projects?.length.toString() ?? "0",
        additionalInfo: "10% decrease from last month",
      },
      {
        id: 3,
        icon: (
          <ClockIcon className="p-3 bg-[#70A1E5] w-12 h-12 rounded-full text-white" />
        ),
        title: "Time Spent",
        description: "1022 /1300 Hrs",
        additionalInfo: "8% increase from last month",
      },
      {
        id: 4,
        icon: (
          <UserIcon className="p-3 bg-[#F0C274] w-12 h-12 rounded-full text-white" />
        ),
        title: "Resources",
        description: "101/120",
        additionalInfo: "2% increase  from last month",
      },
    ];
    return (
      <main className="overflow-y-auto h-screen no-scrollbar scroll-smooth p-4 lg:p-8 bg-[#F0C274]/30 text-black">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 mb-4">
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
        <section>
          <ProjectSummary projects={projects} />
        </section>
      </main>
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
