import { createConnection } from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    const [results] = await connection.execute("SELECT * FROM gps_data");

    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
