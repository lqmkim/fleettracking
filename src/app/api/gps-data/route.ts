import getDb from "@/utils/server/getDb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await getDb();

  const [data] = await db.execute(
    `SELECT * FROM gps_data
    LEFT JOIN usvs ON gps_data.usv_id = usvs.id
    ORDER BY timestamp DESC
    LIMIT 500`
  );

  return NextResponse.json(data, { status: 200 });
}
