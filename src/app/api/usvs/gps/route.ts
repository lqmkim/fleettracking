import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 20;

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  const db = await getDb();

  const [LatLoc] = await db.execute(
    `SELECT
    gd.usv_id AS id,
    gd.latitude,
    gd.longitude,
    gd.timestamp
  FROM gps_data gd
  JOIN (
    SELECT
      usv_id,
      MAX(timestamp) AS latest_timestamp
    FROM gps_data
    GROUP BY usv_id
  ) latest_gps
  ON gd.usv_id = latest_gps.usv_id AND gd.timestamp = latest_gps.latest_timestamp
    LIMIT ${(page - 1) * ITEMS_PER_PAGE}, ${ITEMS_PER_PAGE}`
    );

  return NextResponse.json({ LatLoc }, { status: 200 });
}