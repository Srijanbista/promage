import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
