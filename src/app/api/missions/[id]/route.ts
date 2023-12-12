import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  await db.execute(
    `DELETE FROM missions
    WHERE id = '${params.id}'
    LIMIT 1`
  );

  await db.end()

  return NextResponse.json({}, { status: 200 });
}
