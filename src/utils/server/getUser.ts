import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUser(): Promise<any> {
  const token = cookies().get("appSession")?.value;

  if (!token) return null;

  try {
    const user: any = verify(token, process.env.ACCESS_TOKEN_SECRET || "");

    return user;
  } catch (err) {
    return null;
  }
}
