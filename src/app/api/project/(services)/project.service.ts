import prisma from "@/app/utils/db";

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        manager: true,
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    return projects;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
