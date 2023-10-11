"use client";

import { useSearchParams } from "next/navigation";

export default function FleetPage() {
  const searchParams = useSearchParams();
  return <div>asdf {searchParams.get("id")}</div>;
}
