"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [pgData, setPgData] = useState<any>(null);
  const [redisData, setRedisData] = useState<any>(null);

  const loadPg = async () => {
    const start = performance.now();
    const res = await fetch("/api/messages/postgres");
    const data = await res.json();
    const end = performance.now();
    setPgData({
      ...data,
      responseTime: Math.round(end - start),
    });
  };

  const loadRedis = async () => {
    const start = performance.now();
    const res = await fetch("/api/messages/redis");
    const data = await res.json();
    const end = performance.now();
    setRedisData({
      ...data,
      responseTime: Math.round(end - start),
    });
  };

  const chartData =
    pgData && redisData
      ? [
          { name: "PostgreSQL", time: pgData.responseTime },
          { name: "Redis", time: redisData.responseTime },
        ]
      : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white p-10">
      
<p className="text-gray-400 text-sm mt-2">
  ⚠️ 注意：Redis 是基于内存的，速度极快但数据易失；PostgreSQL 使用磁盘存储，虽然慢一些但更可靠、支持复杂关系。
</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Postgres + Redis */}
        <div className="flex-1 space-y-6">
          {/* PostgreSQL */}
          <section className="bg-neutral-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">PostgreSQL</h2>
            <button
              onClick={loadPg}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium"
            >
              加载 PostgreSQL
            </button>

            {pgData && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  响应时间：{pgData.responseTime} ms
                </p>
                <div className="h-64 overflow-y-auto bg-black/40 rounded-lg p-2 space-y-1">
                  {pgData.messages.map((m: any) => (
                    <div key={m.id} className="p-2 border-b border-gray-700">
                      <span className="font-mono text-sm text-gray-300">
                        {new Date(Number(m.timestamp)).toLocaleString()}
                      </span>
                      <p>{m.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Redis */}
          <section className="bg-neutral-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Redis</h2>
            <button
              onClick={loadRedis}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium"
            >
              加载 Redis
            </button>

            {redisData && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  响应时间：{redisData.responseTime} ms
                </p>
                <div className="h-64 overflow-y-auto bg-black/40 rounded-lg p-2 space-y-1">
                  {redisData.messages.map((m: any) => (
                    <div key={m.id} className="p-2 border-b border-gray-700">
                      <span className="font-mono text-sm text-gray-300">
                        {new Date(Number(m.timestamp)).toLocaleString()}
                      </span>
                      <p>{m.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right: Chart */}
        {chartData.length > 0 && (
          <div className="w-full lg:w-[480px] bg-neutral-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              响应时间对比图（ms）
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="time" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <footer className="text-gray-500 text-sm pt-10 text-center">
        Built with Next.js · TailwindCSS · Recharts
      </footer>
    </main>
  );
}
