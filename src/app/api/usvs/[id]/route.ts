import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const [usvs]: any[] = await db.execute(
    `SELECT * FROM usvs
    WHERE id = '${params.id}'
    LIMIT 1`
  );
  const usv = usvs[0];

  await db.end()

  return NextResponse.json({ usv }, { status: 200 });
}

export async function PATCH(request: Request, { params }: any) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const { name } = await request.json();

  await db.execute(
    `UPDATE usvs
    SET name = '${name}'
    WHERE id = '${params.id}'
    LIMIT 1`
  );

  await db.end()

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: Request, { params }: any) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  await db.execute(
    `DELETE FROM usvs
    WHERE id = '${params.id}'
    LIMIT 1`
  );

  await db.end()

  return NextResponse.json({}, { status: 200 });
}
