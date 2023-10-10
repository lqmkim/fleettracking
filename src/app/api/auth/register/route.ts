import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { genSalt, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { validate } from "validate.js";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user || user.privilege !== 1)
    return NextResponse.json({}, { status: 401 });

  const { username, password, role } = await request.json();

  const errors = validate(
    { username, password, role },
    {
      username: { type: "string", presence: true },
      password: { type: "string", presence: true },
      role: { type: "string", presence: true },
    }
  );
  if (errors) return NextResponse.json({ errors }, { status: 400 });

  const db = await getDb();

  const [data]: any[] = await db.execute(
    `SELECT * FROM users
    WHERE username = '${username}'
    LIMIT 1`
  );
  if (data.length > 0) return NextResponse.json({}, { status: 409 });

  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);

  await db.execute(
    `INSERT INTO users (username, password, role)
    VALUES ('${username}', '${hashedPassword}', '${role}')`
  );

  return NextResponse.json({}, { status: 200 });
}
