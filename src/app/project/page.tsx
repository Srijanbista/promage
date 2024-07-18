import { getAllProjects } from "../api/project/(services)/project.service";
import { ProjectBase } from "./(components)/Project.base";

const Project = async () => {
  try {
    const projects = await getAllProjects();

    if (projects.length > 0) {
      return (
        <main className="h-screen relative overflow-y-auto no-scrollbar scroll-smooth py-2 px-6 lg:px-12 lg:py-4 bg-[#F0C274]/30 text-black">
          <ProjectBase projectsData={projects} />
        </main>
      );
    }
    return <div>No Project found</div>;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export default Project;
