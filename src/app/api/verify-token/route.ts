import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ ok: false, error: "Token is required" });
    }

    const tokenInfo = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET ?? "",
        (err: any, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });
    return NextResponse.json({ ok: true, decoded: tokenInfo });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error }, { status: 401 });
  }
}
