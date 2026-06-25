"use client";

import {
  BarChart2,
  Bookmark,
  BookOpen,
  Clock,
  DollarSign,
  Edit,
  PlusSquare,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

// ── Helpers ────────────────────────────────────────────────
function buildChartData(soldBooks, days) {
  const now = new Date();
  const map = {};

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key =
      days <= 7
        ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : days <= 30
          ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : d.toLocaleDateString("en-US", { month: "short" });
    map[key] = (map[key] || 0);
  }

  soldBooks.forEach((b) => {
    const d = new Date(b.createdAt);
    const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diffDays >= days) return;
    const key =
      days <= 30
        ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : d.toLocaleDateString("en-US", { month: "short" });
    if (key in map) map[key] = (map[key] || 0) + 1;
  });

  // For 90 days, collapse by month
  if (days === 90) {
    const monthMap = {};
    soldBooks.forEach((b) => {
      const d = new Date(b.createdAt);
      const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      if (diffDays >= 90) return;
      const key = d.toLocaleDateString("en-US", { month: "short" });
      monthMap[key] = (monthMap[key] || 0) + 1;
    });
    return Object.entries(monthMap).map(([date, sales]) => ({ date, sales }));
  }

  return Object.entries(map).map(([date, sales]) => ({ date, sales }));
}

// ── Custom Tooltip ─────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold">{payload[0].value} sales</p>
      </div>
    );
  }
  return null;
};

// ── Book Cover ─────────────────────────────────────────────
function BookCover({ src, title }) {
  const colors = [
    "from-purple-700 to-indigo-900",
    "from-blue-700 to-purple-900",
    "from-pink-700 to-rose-900",
    "from-emerald-700 to-teal-900",
  ];
  const idx = (title?.length || 0) % colors.length;
  return src ? (
    <div className="relative w-10 h-14 flex-shrink-0">
      <Image
        src={src}
        alt={title || "Book cover"}
        fill
        sizes="40px"
        className="object-cover rounded"
      /></div>
  ) : (
    <div className={`w-10 h-14 rounded bg-gradient-to-br ${colors[idx]} flex items-center justify-center flex-shrink-0`}>
      <BookOpen size={14} className="text-white/60" />
    </div>
  );
}

const QUICK_ACTIONS = [
  { icon: PlusSquare, label: "Add New Ebook", sub: "Create a new ebook", href: "/dashboard/writer/add-ebook" },
  { icon: Edit, label: "Manage Ebooks", sub: "View and edit your books", href: "/dashboard/writer/manage" },
  { icon: Clock, label: "Sales History", sub: "Track your earnings", href: "/dashboard/writer/sales" },
  { icon: Bookmark, label: "My Bookmarks", sub: "View saved books", href: "/dashboard/writer/bookmarks" },
];

// ── Main Component ─────────────────────────────────────────
export default function WriterDashboardPage({ soldBooks = [], userName }) {
  const [range, setRange] = useState("7");

  // ── Stats ──────────────────────────────────────────────
  const totalSales = soldBooks.length;
  const totalEarnings = soldBooks.reduce((acc, b) => acc + (Number(b.price) || 0), 0);

  // Unique books sold
  const uniqueBooks = useMemo(() => {
    const map = {};
    soldBooks.forEach((b) => {
      if (!map[b.bookId]) {
        map[b.bookId] = {
          title: b.bookTitle,
          cover: b.coverImage,
          price: b.price,
          count: 0,
        };
      }
      map[b.bookId].count++;
    });
    return Object.values(map);
  }, [soldBooks]);

  // Recent books (latest 4 unique)
  const recentBooks = uniqueBooks.slice(0, 4);

  // Chart data
  const chartData = useMemo(() => buildChartData(soldBooks, Number(range)), [soldBooks, range]);

  const stats = [
    {
      icon: BookOpen,
      label: "Total Books Sold",
      value: uniqueBooks.length,
      sub: "Unique titles purchased",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      icon: BarChart2,
      label: "Total Sales",
      value: totalSales,
      sub: "Across all your ebooks",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: `$${totalEarnings.toFixed(2)}`,
      sub: "From all time sales",
      color: "bg-green-500/20 text-green-400",
    },
    {
      icon: Clock,
      label: "This Month",
      value: soldBooks.filter((b) => {
        const d = new Date(b.createdAt);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
      sub: "Sales this month",
      color: "bg-pink-500/20 text-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Welcome back, {userName ?? "Writer"} <span>👋</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening with your books today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <Card key={label} className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{label}</p>
                  <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Recent Books */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">

        {/* Sales Chart */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-base font-semibold">Sales Overview</CardTitle>
                <p className="text-gray-500 text-xs mt-1">
                  Your sales performance for the last{" "}
                  {range === "7" ? "7 days" : range === "30" ? "30 days" : "90 days"}.
                </p>
              </div>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className="w-32 h-8 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                  <SelectItem value="7" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 7 days</SelectItem>
                  <SelectItem value="30" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 30 days</SelectItem>
                  <SelectItem value="90" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-6 pt-2">
            {chartData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-600 text-sm">
                No sales data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2.5}
                    dot={{ fill: "#8b5cf6", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Books */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base font-semibold">Recent Books Sold</CardTitle>
              <Link href="/dashboard/writer/sales">
                <Button variant="link" className="text-purple-400 text-xs p-0 h-auto hover:text-purple-300">
                  View all
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            {recentBooks.length === 0 ? (
              <p className="text-gray-600 text-sm py-8 text-center">No books sold yet.</p>
            ) : recentBooks.map((book) => (
              <div key={book.title} className="flex items-center gap-3">
                <BookCover src={book.cover} title={book.title} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{book.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="text-xs px-2 py-0 border-0 bg-green-500/15 text-green-400">
                      {book.count} {book.count === 1 ? "sale" : "sales"}
                    </Badge>
                  </div>
                </div>
                <span className="text-sm font-semibold text-white flex-shrink-0">
                  {book.price ? `$${Number(book.price).toFixed(2)}` : "—"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map(({ icon: Icon, label, sub, href }) => (
            <Link key={label} href={href}>
              <Card className="bg-[#13132a] border-white/5 rounded-2xl cursor-pointer hover:border-purple-500/30 hover:bg-[#1a1a35] transition-all group">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors">
                    <Icon size={18} className="text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{sub}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}