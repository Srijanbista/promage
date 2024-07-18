import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    console.log("projectId", params.projectId);
    await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json({ message: "deleted project" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred" }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    console.log("projectId", params.projectId);
    const data = await req.json();
    const projectManager = await prisma.user.findUnique({
      where: {
        email: data.managerEmail,
      },
    });

    if (!projectManager) {
      return NextResponse.json(
        { message: "Manager with this email does not exist" },
        { status: 400 }
      );
    }
    await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        progress: data.progress,
        budget: data.budget,
        manager: {
          connect: {
            id: projectManager.id,
          },
        },
      },
    });
    return NextResponse.json({ message: "updated project" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred" }, { status: 400 });
  }
}
