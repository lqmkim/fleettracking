import { createConnection } from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await createConnection({
      host: "45.127.5.17",
      database: "fleet",
      user: "hakim19jan",
      password: "hakim19jan",
    });

    const [results] = await connection.execute("SELECT * FROM gps_data");

    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
