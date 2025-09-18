import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DB Speed Benchmark",
  description: "Next.js + PostgreSQL + Redis comparison",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-black via-slate-950 to-black text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
