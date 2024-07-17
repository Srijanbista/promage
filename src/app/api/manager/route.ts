import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const managers = await prisma.user.findMany({
      where: {
        isDeleted: false,
        role: "PROJECTMANAGER",
      },
      select: {
        name: true,
        email: true,
      },
    });
    return NextResponse.json({ managers });
  } catch (error) {
    return NextResponse.json("Error getting managers");
  }
}
