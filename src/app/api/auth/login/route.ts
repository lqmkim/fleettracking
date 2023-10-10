import getDb from "@/utils/server/getDb";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validate } from "validate.js";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const errors = validate(
    { username, password },
    {
      username: { type: "string", presence: true },
      password: { type: "string", presence: true },
    }
  );
  if (errors) return NextResponse.json({ errors }, { status: 400 });

  const db = await getDb();

  const [data]: any[] = await db.execute(
    `SELECT * FROM users
    WHERE username = '${username}'
    LIMIT 1`
  );
  const user = data[0];

  const authenticated = await compare(password, user.password);
  if (!authenticated) return NextResponse.json({}, { status: 401 });
  delete user.password;

  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "30d", // TODO: Secure with refresh token
  });

  cookies().set("appSession", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({}, { status: 200 });
}
