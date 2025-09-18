import { NextResponse } from "next/server";
import { query } from "@/lib/db-postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const start = performance.now();
    const res = await query(`
      SELECT id, content, timestamp
      FROM messages
      ORDER BY timestamp DESC
      LIMIT 50
    `);
    const end = performance.now();

    return NextResponse.json({
      messages: res.rows,
      responseTime: Math.round(end - start),
    });
  } catch (e: any) {
    console.error("POSTGRES GET ERROR:", e); // ← 看终端日志能直接看到具体错误
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
