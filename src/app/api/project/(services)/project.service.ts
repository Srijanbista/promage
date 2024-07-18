import prisma from "@/app/utils/db";
import { ProjectStatus } from "@prisma/client";

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        manager: {
          select: {
            name: true,
            email: true,
          },
        },
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

export async function getAllProjectsWithStatus() {
  try {
    const total = await prisma.project.count({
      where: {
        isDeleted: false,
        status: {
          in: [
            ProjectStatus.COMPLETED,
            ProjectStatus.ONGOING,
            ProjectStatus.ATRISK,
            ProjectStatus.DELAYED,
          ],
        },
      },
    });
    const totalOngoing = await prisma.project.count({
      where: {
        isDeleted: false,
        status: ProjectStatus.ONGOING,
      },
    });

    const totalAtRisk = await prisma.project.count({
      where: {
        isDeleted: false,
        status: ProjectStatus.ATRISK,
      },
    });

    const totalDelayed = await prisma.project.count({
      where: {
        isDeleted: false,
        status: ProjectStatus.DELAYED,
      },
    });

    const totalCompleted = await prisma.project.count({
      where: {
        isDeleted: false,
        status: ProjectStatus.COMPLETED,
      },
    });

    return { total, totalOngoing, totalAtRisk, totalDelayed, totalCompleted };
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
