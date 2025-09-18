import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
let connectPromise: Promise<void> | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (client && client.isOpen) return client;

  if (!client) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL is not set");
    client = createClient({ url }); // rediss:// => TLS
    client.on("error", (err) => console.error("Redis Client Error", err));
  }

  if (!client.isOpen) {
    if (!connectPromise) connectPromise = client.connect();
    await connectPromise;    // 一定是 Promise，不会为 null
    connectPromise = null;
  }
  return client;
}
