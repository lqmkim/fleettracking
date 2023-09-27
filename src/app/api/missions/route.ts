import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";
import { validate } from "validate.js";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const [missions] = await db.execute(
    `SELECT missions.*,

    usvs.name as usv_name,
    usvs.status as usv_status,

    users.username as manager_username,
    users.role as manager_role,
    users.privilege as manager_privilege

    FROM missions
    JOIN usvs ON missions.usv_id = usvs.id
    JOIN users ON missions.manager_id = users.id`
  );

  return NextResponse.json({ missions }, { status: 200 });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const { objective, usv_id, scheduled_at, manager_id } = await request.json();

  const errors = validate(
    { objective, usv_id, scheduled_at, manager_id },
    {
      objective: { type: "string", presence: true },
      usv_id: { type: "string", presence: true },
      scheduled_at: { type: "string", presence: true },
      manager_id: { type: "number", presence: true },
    }
  );
  if (errors) return NextResponse.json({ errors }, { status: 400 });

  const db = await getDb();

  await db.execute(
    `INSERT INTO missions (objective, usv_id, scheduled_at, manager_id)
    VALUES ('${objective}', '${usv_id}', '${scheduled_at}', ${manager_id})`
  );

  return NextResponse.json({}, { status: 200 });
}
