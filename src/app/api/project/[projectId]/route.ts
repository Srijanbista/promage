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
