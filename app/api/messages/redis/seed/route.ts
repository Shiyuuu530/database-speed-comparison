// scripts/seed-redis.ts
import { getRedis } from "@/lib/redis";

async function seedRedis() {
  const redis = await getRedis();

  const messages = [
    {
      id: "1",
      content: "Hello from Neon!",
      timestamp: 1695000000000,
    },
    {
      id: "2",
      content: "Second message",
      timestamp: 1696000000000,
    },
    {
      id: "3",
      content: "Testing message 3",
      timestamp: 1697000000000,
    },
  ];

  // 清空原数据（可选）
  await redis.del("messages:redis");

  for (const msg of messages) {
    await redis.zAdd("messages:redis", {
      score: msg.timestamp,
      value: JSON.stringify(msg),
    });
  }

  console.log("✅ Redis seed complete.");
  process.exit(0);
}

seedRedis().catch((err) => {
  console.error("❌ Redis seed failed:", err);
  process.exit(1);
});
