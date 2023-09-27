import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  return NextResponse.json({ user }, { status: 200 });
}
