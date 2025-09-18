# ⚡️ Postgres vs Redis Benchmark App

A modern web app built with **Next.js**, designed to benchmark the query speed between **PostgreSQL (Neon)** and **Redis (Redis Cloud)**. It helps visualize the difference in query performance using an intuitive UI and a real-time chart.

## 🎯 Purpose

This project aims to:

- Measure and compare the **query latency** of Postgres vs Redis
- Provide a clean UI to visualize benchmark data
- Serve as a learning project for full-stack app development using modern web technologies

---

## 🧱 Tech Stack

| Area              | Tech Used                |
|-------------------|--------------------------|
| Frontend          | Next.js 13+ (App Router) |
| Styling           | Tailwind CSS             |
| Chart             | Chart.js + react-chartjs-2 |
| PostgreSQL DB     | Neon                     |
| Redis DB          | Redis Cloud (TLS)        |
| Deployment Ready? | ✅ Yes                    |

---

## 🧪 Live Features

- 🎯 Load 50 messages from both Redis and Postgres
- ⚡ Measure API response time (from click to data ready)
- 📊 Render a live chart comparing Redis and Postgres performance
- 🌙 Clean dark-themed UI, responsive for all screen sizes

---

## 🚀 Getting Started

### 1. Clone the Repository

### 2.Install Dependencies
npm install

### 3.Create .env.local
Add your database connection URLs

### 4. Seed Test Data
For PostgreSQL (Neon)
CREATE TABLE IF NOT EXISTS messages (
  id TEXT,
  content TEXT,
  timestamp BIGINT
);

INSERT INTO messages (id, content, timestamp) VALUES
('1', 'Hello from Neon!', 1695000000000),
('2', 'Second message', 1696000000000),
('3', 'Testing message 3', 1697000000000);
For Redis
Use a sorted set like:
ZADD messages:redis 1695000000000 '{"id":"1","content":"Hello from Redis!","timestamp":1695000000000}'
ZADD messages:redis 1696000000000 '{"id":"2","content":"Second message","timestamp":1696000000000}'
ZADD messages:redis 1697000000000 '{"id":"3","content":"Testing message 3","timestamp":1697000000000}'
Or run the seed script in lib/seed-redis.ts if available.

### 5. Run the App
npm run dev
Visit: http://localhost:3000
