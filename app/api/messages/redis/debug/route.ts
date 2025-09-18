import { NextResponse } from "next/server";
import { getRedis } from "@/lib/db-redis";

export async function GET() {
  const redis = await getRedis();

  const start = Date.now();

  // 取出最新的 50 条（按 timestamp 排序）
  const results = await redis.zRange("messages:redis", -50, -1, { withScores: true });

  const parsed = [];
  for (let i = 0; i < results.length; i += 2) {
    const value = results[i];
    const score = results[i + 1];

    try {
      const json = JSON.parse(value);
      parsed.push({
        id: json.id,
        content: json.content,
        timestamp: Number(score), // 直接用 Redis 分数作为时间戳
      });
    } catch (e) {
      console.error("Failed to parse Redis value:", value);
    }
  }

  const responseTime = Date.now() - start;

  return NextResponse.json({
    responseTime,
    messages: parsed,
  });
}
