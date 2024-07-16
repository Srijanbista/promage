import prisma from "@/app/utils/db";

export async function getTotalProjectRevenue() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
      },
    });

    const totalRevenue = projects.reduce(
      (amount, project) => amount + project.budget,
      0
    );
    return { totalRevenue, count: projects.length };
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
