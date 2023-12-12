import getDb from "@/utils/server/getDb";
import getUser from "@/utils/server/getUser";
import { NextResponse } from "next/server";
import { validate } from "validate.js";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const db = await getDb();

  const [maintenances] = await db.execute(
    `SELECT maintenances.*,

    usvs.name as usv_name,
    usvs.status as usv_status,

    users.username as maintenance_personnel_username,
    users.role as maintenance_personnel_role,
    users.privilege as maintenance_personnel_privilege

    FROM maintenances
    JOIN usvs ON maintenances.usv_id = usvs.id
    JOIN users ON maintenances.maintenance_personnel_id = users.id`
  );

  await db.end()

  return NextResponse.json({ maintenances }, { status: 200 });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const { usv_id, repair_job, actions, maintenance_personnel_id, timestamp } =
    await request.json();

  const errors = validate(
    { usv_id, repair_job, actions, maintenance_personnel_id, timestamp },
    {
      usv_id: { type: "string", presence: true },
      repair_job: { type: "string", presence: true },
      actions: { type: "string", presence: true },
      maintenance_personnel_id: { type: "number", presence: true },
      timestamp: { type: "string", presence: true },
    }
  );
  if (errors) return NextResponse.json({ errors }, { status: 400 });

  const db = await getDb();

  await db.execute(
    `INSERT INTO maintenances (usv_id, repair_job, actions, maintenance_personnel_id, timestamp)
    VALUES ('${usv_id}', '${repair_job}', '${actions}', ${maintenance_personnel_id}, '${timestamp}')`
  );

  await db.end()

  return NextResponse.json({}, { status: 200 });
}
