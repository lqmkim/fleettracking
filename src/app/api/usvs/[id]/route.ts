import getDb from "@/utils/server/getDb";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 20;

export async function GET(request: Request, { params }: any) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  const db = await getDb();

  const [data] = await db.execute(
    `SELECT * FROM gps_data
    LEFT JOIN usvs ON gps_data.usv_id = usvs.id
    WHERE usv_id = '${params.id}'
    ORDER BY timestamp DESC
    LIMIT ${(page - 1) * ITEMS_PER_PAGE}, ${ITEMS_PER_PAGE}`
  );

  return NextResponse.json(data, { status: 200 });
}
