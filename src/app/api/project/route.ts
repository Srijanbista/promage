import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
      },
    });

    return NextResponse.json(
      { projects: projects, totalCount: projects.length },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      managerEmail,
      dueDate,
      status,
      progress,
      budget,
    } = await req.json();

    // Find the manager by email
    const manager = await prisma.user.findUnique({
      where: { email: managerEmail },
    });

    if (!manager) {
      return NextResponse.json({ error: "Manager not found" }, { status: 404 });
    }

    // Create the project and assign it to the manager
    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget,
        manager: {
          connect: { id: manager.id },
        },
        dueDate,
        status,
        progress,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}
