import prisma from "@/app/utils/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      throw new Error("Invalid request");
    } else {
      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!userExists) {
        const user = await prisma.user.create({
          data: {
            email,
            role,
          },
        });

        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.error("Error hashing password", err);
            throw err;
          }
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              password: hash,
            },
          });
        });

        return NextResponse.json({
          message: "User created",
          user: { email: user.email },
        });
      } else {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
}
