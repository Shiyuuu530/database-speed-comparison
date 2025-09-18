import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // Neon/Supabase 常见需求
});

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
