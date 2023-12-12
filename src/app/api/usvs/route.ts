import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 10;

export async function GET(request: Request) {
  const user = getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  const db = await getDb();

  const [usvs] = await db.execute(
    `SELECT * FROM usvs
    LIMIT ${(page - 1) * ITEMS_PER_PAGE}, ${ITEMS_PER_PAGE}`
  );

  await db.end()

  return NextResponse.json({ usvs }, { status: 200 });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const { id, name } = await request.json();

  await db.execute(
    `INSERT INTO usvs (id, name)
    VALUES ('${id}', '${name}')`
  );

  await db.end()

  return NextResponse.json({}, { status: 201 });
}
