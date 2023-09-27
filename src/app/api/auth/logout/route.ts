import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  cookies().delete("appSession");
  return NextResponse.json({}, { status: 200 });
}
