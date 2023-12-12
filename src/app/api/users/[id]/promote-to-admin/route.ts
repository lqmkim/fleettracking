import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: any) {
  const user = await getUser();
  if (!user || user.privilege !== 1)
    return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  await db.execute(
    `UPDATE users
    SET privilege = 1
    WHERE id = '${params.id}'
    LIMIT 1`
  );

  await db.end()

  return NextResponse.json({}, { status: 200 });
}
