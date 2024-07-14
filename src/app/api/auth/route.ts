import prisma from "@/app/utils/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
    console.log("User found");

    const passwordMatch = await bcrypt.compare(password, user.password ?? "");
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    throw new Error("Invalid request");
  }
}
