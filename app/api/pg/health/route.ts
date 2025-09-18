import { NextResponse } from "next/server";
import { query } from "@/lib/db-postgres";

export const runtime = "nodejs"; // 确保不是 Edge

export async function GET() {
  try {
    const r = await query("SELECT current_database() as db, now() as now, version()");
    return NextResponse.json({ ok: true, db: r.rows[0].db, now: r.rows[0].now, version: r.rows[0].version });
  } catch (e: any) {
    // 展开 AggregateError
    const details =
      e?.errors?.map((x: any) => x?.message || String(x)).join(" | ") ||
      e?.message ||
      String(e);
    return NextResponse.json({ ok: false, error: details }, { status: 500 });
  }
}
