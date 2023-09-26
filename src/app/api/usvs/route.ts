import getDb from "@/utils/server/getDb";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  const db = await getDb();

  await db.execute(
    `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`
  );
  const [data] = await db.execute(
    `SELECT * FROM usvs
    LEFT JOIN (
      SELECT id, usv_id, latitude, longitude, speed, heading,
      MAX(timestamp) AS timestamp FROM gps_data
      GROUP BY usv_id
    ) AS gps_data ON usvs.id = gps_data.usv_id
    LIMIT ${(page - 1) * ITEMS_PER_PAGE}, ${ITEMS_PER_PAGE}`
  );

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
  const db = await getDb();

  const { id, name } = await request.json();

  await db.execute(
    `INSERT INTO usvs (id, name)
    VALUES ('${id}', '${name}')`
  );

  return NextResponse.json({}, { status: 201 });
}
