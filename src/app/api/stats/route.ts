import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const [usersArr]: any[] = await db.execute(
    `SELECT COUNT(*) AS count FROM users`
  );
  const totalUsers = usersArr[0].count;

  const [usvsArr]: any[] = await db.execute(
    `SELECT COUNT(*) AS count FROM usvs`
  );
  const totalUsvs = usvsArr[0].count;

  const [dataPointsArr]: any[] = await db.execute(
    `SELECT COUNT(*) AS count FROM gps_data`
  );
  const totalDataPoints = dataPointsArr[0].count;

  return NextResponse.json(
    { totalUsers, totalUsvs, totalDataPoints },
    { status: 200 }
  );
}
