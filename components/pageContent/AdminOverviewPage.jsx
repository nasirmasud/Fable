// "use client";

// import {
//   AlertTriangle,
//   BookOpen,
//   CheckCircle,
//   DollarSign,
//   FileText,
//   Flag,
//   MoreHorizontal,
//   ShieldCheck,
//   TrendingUp,
//   Users,
//   XCircle,
// } from "lucide-react";
// import { useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // ── Mock Data ──────────────────────────────────────────────
// const REVENUE_DATA = {
//   "7": [
//     { date: "May 14", revenue: 320 },
//     { date: "May 15", revenue: 480 },
//     { date: "May 16", revenue: 390 },
//     { date: "May 17", revenue: 510 },
//     { date: "May 18", revenue: 620 },
//     { date: "May 19", revenue: 780 },
//     { date: "May 20", revenue: 670 },
//   ],
//   "30": [
//     { date: "May 1", revenue: 200 },
//     { date: "May 5", revenue: 450 },
//     { date: "May 10", revenue: 680 },
//     { date: "May 15", revenue: 540 },
//     { date: "May 20", revenue: 820 },
//     { date: "May 25", revenue: 960 },
//     { date: "May 30", revenue: 730 },
//   ],
//   "90": [
//     { date: "Mar", revenue: 4200 },
//     { date: "Apr", revenue: 6800 },
//     { date: "May", revenue: 9100 },
//   ],
// };

// const USER_GROWTH_DATA = [
//   { month: "Jan", writers: 40, readers: 120 },
//   { month: "Feb", writers: 55, readers: 180 },
//   { month: "Mar", writers: 70, readers: 240 },
//   { month: "Apr", writers: 90, readers: 310 },
//   { month: "May", writers: 115, readers: 420 },
//   { month: "Jun", writers: 140, readers: 530 },
// ];

// const RECENT_BOOKS = [
//   { title: "The Lost Kingdom", author: "James Arlen", status: "Pending", price: "$9.99", submitted: "2h ago" },
//   { title: "Code & Chaos", author: "Mira Patel", status: "Approved", price: "$4.99", submitted: "5h ago" },
//   { title: "Starfall Rising", author: "Tom Yeats", status: "Rejected", price: "$7.99", submitted: "1d ago" },
//   { title: "Quiet Hours", author: "Anna Choi", status: "Pending", price: "$2.99", submitted: "1d ago" },
//   { title: "The Iron Veil", author: "Lucia Ferr", status: "Approved", price: "$11.99", submitted: "2d ago" },
// ];

// const FLAGGED_REPORTS = [
//   { user: "reader_99x", type: "Spam", book: "Quick Money Guide", time: "30m ago" },
//   { user: "bookfan22", type: "Copyright", book: "Shadow Worlds", time: "2h ago" },
//   { user: "alex_reads", type: "Inappropriate", book: "Dark Corners", time: "4h ago" },
// ];

// // ── Tooltips ───────────────────────────────────────────────
// const RevenueTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
//         <p className="text-gray-400 text-xs mb-1">{label}</p>
//         <p className="text-white font-semibold">${payload[0].value}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const GrowthTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
//         <p className="text-gray-400 text-xs mb-2">{label}</p>
//         {payload.map((p) => (
//           <p key={p.dataKey} className="font-semibold" style={{ color: p.color }}>
//             {p.dataKey === "writers" ? "Writers" : "Readers"}: {p.value}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // ── Status Badge ───────────────────────────────────────────
// function StatusBadge({ status }) {
//   const map = {
//     Pending: "bg-yellow-500/15 text-yellow-400",
//     Approved: "bg-green-500/15 text-green-400",
//     Rejected: "bg-red-500/15 text-red-400",
//   };
//   const icons = {
//     Pending: <AlertTriangle size={10} />,
//     Approved: <CheckCircle size={10} />,
//     Rejected: <XCircle size={10} />,
//   };
//   return (
//     <Badge variant="outline" className={`text-xs px-2 py-0 border-0 flex items-center gap-1 w-fit ${map[status]}`}>
//       {icons[status]} {status}
//     </Badge>
//   );
// }

// // ── Main Component ─────────────────────────────────────────
// export default function AdminOverviewPage() {
//   const [range, setRange] = useState("7");

//   const stats = [
//     {
//       icon: Users,
//       label: "Total Users",
//       value: "1,284",
//       sub: "+48 this week",
//       color: "bg-purple-500/20 text-purple-400",
//       trend: "+3.9%",
//       trendUp: true,
//     },
//     {
//       icon: BookOpen,
//       label: "Total Books",
//       value: "342",
//       sub: "Published across all writers",
//       color: "bg-blue-500/20 text-blue-400",
//       trend: "+12",
//       trendUp: true,
//     },
//     {
//       icon: DollarSign,
//       label: "Platform Revenue",
//       value: "$9,823",
//       sub: "This month (30% commission)",
//       color: "bg-green-500/20 text-green-400",
//       trend: "+18.2%",
//       trendUp: true,
//     },
//     {
//       icon: Flag,
//       label: "Open Reports",
//       value: "7",
//       sub: "Awaiting admin review",
//       color: "bg-red-500/20 text-red-400",
//       trend: "3 new",
//       trendUp: false,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <ShieldCheck size={20} className="text-purple-400" />
//             <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Admin Panel</span>
//           </div>
//           <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
//           <p className="text-gray-400 text-sm mt-1">Monitor activity, manage content, and track revenue.</p>
//         </div>
//         <div className="text-right hidden sm:block">
//           <p className="text-xs text-gray-500">Last updated</p>
//           <p className="text-sm text-gray-300 font-medium">Just now</p>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {stats.map(({ icon: Icon, label, value, sub, color, trend, trendUp }) => (
//           <Card key={label} className="bg-[#13132a] border-white/5 rounded-2xl">
//             <CardContent className="p-5">
//               <div className="flex items-start justify-between gap-2">
//                 <div className="flex items-start gap-3">
//                   <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
//                     <Icon size={20} />
//                   </div>
//                   <div>
//                     <p className="text-gray-400 text-sm">{label}</p>
//                     <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
//                   </div>
//                 </div>
//                 <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${trendUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
//                   {trend}
//                 </span>
//               </div>
//               <p className="text-gray-500 text-xs mt-3">{sub}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Revenue Chart + User Growth */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

//         {/* Revenue Chart */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-2">
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="text-white text-base font-semibold">Revenue Overview</CardTitle>
//                 <p className="text-gray-500 text-xs mt-1">
//                   Platform earnings for the last {range === "7" ? "7 days" : range === "30" ? "30 days" : "90 days"}.
//                 </p>
//               </div>
//               <Select value={range} onValueChange={setRange}>
//                 <SelectTrigger className="w-32 h-8 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
//                   <SelectItem value="7" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 7 days</SelectItem>
//                   <SelectItem value="30" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 30 days</SelectItem>
//                   <SelectItem value="90" className="text-xs focus:bg-purple-500/20 focus:text-white">Last 90 days</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardHeader>
//           <CardContent className="px-2 pb-6 pt-2">
//             <ResponsiveContainer width="100%" height={240}>
//               <LineChart data={REVENUE_DATA[range]} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//                 <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
//                 <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }} />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#8b5cf6"
//                   strokeWidth={2.5}
//                   dot={{ fill: "#8b5cf6", r: 4, strokeWidth: 0 }}
//                   activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* User Growth Chart */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-2">
//             <div>
//               <CardTitle className="text-white text-base font-semibold">User Growth</CardTitle>
//               <p className="text-gray-500 text-xs mt-1">Writers vs Readers registered over 6 months.</p>
//             </div>
//             <div className="flex items-center gap-4 mt-3">
//               <span className="flex items-center gap-1.5 text-xs text-gray-400">
//                 <span className="w-3 h-0.5 bg-purple-400 rounded-full inline-block" /> Writers
//               </span>
//               <span className="flex items-center gap-1.5 text-xs text-gray-400">
//                 <span className="w-3 h-0.5 bg-blue-400 rounded-full inline-block" /> Readers
//               </span>
//             </div>
//           </CardHeader>
//           <CardContent className="px-2 pb-6 pt-2">
//             <ResponsiveContainer width="100%" height={240}>
//               <BarChart data={USER_GROWTH_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//                 <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
//                 <Tooltip content={<GrowthTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
//                 <Bar dataKey="readers" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={20} />
//                 <Bar dataKey="writers" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Book Submissions + Flagged Reports */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">

//         {/* Book Submissions */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-3">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-white text-base font-semibold">Recent Book Submissions</CardTitle>
//                 <p className="text-gray-500 text-xs mt-1">Books awaiting approval or recently reviewed.</p>
//               </div>
//               <Button variant="link" className="text-purple-400 text-xs p-0 h-auto hover:text-purple-300">
//                 View all
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="px-6 pb-6">
//             <div className="space-y-1">
//               {/* Table Header */}
//               <div className="grid grid-cols-[1fr_120px_80px_80px_36px] gap-3 text-xs text-gray-500 uppercase tracking-wide pb-2 border-b border-white/5">
//                 <span>Book</span>
//                 <span>Author</span>
//                 <span>Price</span>
//                 <span>Status</span>
//                 <span />
//               </div>
//               {RECENT_BOOKS.map((book) => (
//                 <div key={book.title} className="grid grid-cols-[1fr_120px_80px_80px_36px] gap-3 items-center py-3 border-b border-white/[0.04] last:border-0">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="w-8 h-10 rounded bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center flex-shrink-0">
//                       <FileText size={12} className="text-white/60" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-white truncate">{book.title}</p>
//                       <p className="text-xs text-gray-500">{book.submitted}</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-300 truncate">{book.author}</p>
//                   <p className="text-sm font-semibold text-white">{book.price}</p>
//                   <StatusBadge status={book.status} />
//                   <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-600 hover:text-gray-300 hover:bg-white/5">
//                     <MoreHorizontal size={16} />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Flagged Reports */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-3">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-white text-base font-semibold">Flagged Reports</CardTitle>
//                 <p className="text-gray-500 text-xs mt-1">User-submitted content violations.</p>
//               </div>
//               <span className="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full font-semibold">
//                 {FLAGGED_REPORTS.length} open
//               </span>
//             </div>
//           </CardHeader>
//           <CardContent className="px-6 pb-6 space-y-3">
//             {FLAGGED_REPORTS.map((report, i) => (
//               <div key={i} className="bg-[#0d0d1a] rounded-xl p-4 border border-white/[0.04]">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">{report.type}</span>
//                       <span className="text-xs text-gray-500">{report.time}</span>
//                     </div>
//                     <p className="text-sm font-medium text-white truncate">"{report.book}"</p>
//                     <p className="text-xs text-gray-500 mt-0.5">Reported by <span className="text-gray-400">{report.user}</span></p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 mt-3">
//                   <Button size="sm" className="h-7 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-0 flex-1">
//                     Review
//                   </Button>
//                   <Button size="sm" variant="ghost" className="h-7 text-xs text-gray-500 hover:text-gray-300 hover:bg-white/5 flex-1">
//                     Dismiss
//                   </Button>
//                 </div>
//               </div>
//             ))}
//             <Button variant="link" className="text-purple-400 text-xs p-0 h-auto hover:text-purple-300 w-full text-center">
//               View all reports
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//           {[
//             { icon: Users, label: "Manage Users", sub: "View, ban, or promote accounts" },
//             { icon: BookOpen, label: "Book Approvals", sub: "Review pending submissions" },
//             { icon: TrendingUp, label: "Revenue Reports", sub: "Export financial summaries" },
//             { icon: ShieldCheck, label: "Admin Logs", sub: "Audit trail of all actions" },
//           ].map(({ icon: Icon, label, sub }) => (
//             <Card
//               key={label}
//               className="bg-[#13132a] border-white/5 rounded-2xl cursor-pointer hover:border-purple-500/30 hover:bg-[#1a1a35] transition-all group"
//             >
//               <CardContent className="p-5 flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors">
//                   <Icon size={18} className="text-purple-400" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-sm font-semibold text-white">{label}</p>
//                   <p className="text-xs text-gray-500 mt-0.5 truncate">{sub}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
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
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  DollarSign,
  FileText,
  Flag,
  MoreHorizontal,
  ShieldCheck,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Helpers ───────────────────────────────────────────────

function formatCurrency(val) {
  return `$${Number(val || 0).toFixed(2)}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Build revenue data grouped by range from real soldBooks
function buildRevenueData(soldBooks, range) {
  const now = new Date();
  const days = Number(range);
  const cutoff = new Date(now - days * 86400000);

  const filtered = soldBooks.filter((b) => new Date(b.createdAt) >= cutoff);

  if (days <= 7) {
    // Group by day
    const map = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      map[key] = 0;
    }
    filtered.forEach((b) => {
      const key = new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (key in map) map[key] += Number(b.price) || 0;
    });
    return Object.entries(map).map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }));
  } else if (days <= 30) {
    // Group by week buckets
    const buckets = {};
    filtered.forEach((b) => {
      const d = new Date(b.createdAt);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      buckets[key] = (buckets[key] || 0) + (Number(b.price) || 0);
    });
    return Object.entries(buckets).map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }));
  } else {
    // Group by month
    const buckets = {};
    filtered.forEach((b) => {
      const key = new Date(b.createdAt).toLocaleDateString("en-US", { month: "short" });
      buckets[key] = (buckets[key] || 0) + (Number(b.price) || 0);
    });
    return Object.entries(buckets).map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }));
  }
}

// Build user growth by month from real users
function buildUserGrowthData(users) {
  const map = {};
  users.forEach((u) => {
    if (!u.createdAt) return;
    const key = new Date(u.createdAt).toLocaleDateString("en-US", { month: "short" });
    if (!map[key]) map[key] = { month: key, writers: 0, readers: 0 };
    if (u.role === "writer") map[key].writers += 1;
    else map[key].readers += 1;
  });
  return Object.values(map).slice(-6);
}

// ── Tooltips ──────────────────────────────────────────────

const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-white font-semibold">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const GrowthTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 text-xs mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="font-semibold" style={{ color: p.color }}>
            {p.dataKey === "writers" ? "Writers" : "Readers"}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Status Badge ──────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-500/15 text-yellow-400",
    published: "bg-green-500/15 text-green-400",
    rejected: "bg-red-500/15 text-red-400",
    draft: "bg-purple-500/15 text-purple-300",
  };
  const icons = {
    pending: <AlertTriangle size={10} />,
    published: <CheckCircle size={10} />,
    rejected: <XCircle size={10} />,
    draft: <FileText size={10} />,
  };
  const key = status?.toLowerCase() ?? "draft";
  return (
    <Badge variant="outline" className={`text-xs px-2 py-0 border-0 flex items-center gap-1 w-fit ${map[key] ?? map.draft}`}>
      {icons[key]} {status ?? "Draft"}
    </Badge>
  );
}

// ── Main Component ────────────────────────────────────────

export default function AdminOverviewPage({ users = [], ebooks = [], soldBooks = [] }) {
  const [range, setRange] = useState("7");

  // ── Real stats ──
  const totalUsers = users.length;
  const totalBooks = ebooks.length;
  const totalRevenue = soldBooks.reduce((acc, b) => acc + (Number(b.price) || 0), 0);
  const writers = users.filter((u) => u.role === "writer").length;
  const readers = users.filter((u) => u.role === "reader").length;
  const pendingBooks = ebooks.filter((b) => b.status === "pending").length;

  // This week's new users
  const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
  const newThisWeek = users.filter((u) => u.createdAt && new Date(u.createdAt) >= oneWeekAgo).length;

  // This month revenue
  const now = new Date();
  const monthRevenue = soldBooks
    .filter((b) => {
      const d = new Date(b.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((acc, b) => acc + (Number(b.price) || 0), 0);

  // ── Chart data ──
  const revenueData = useMemo(() => buildRevenueData(soldBooks, range), [soldBooks, range]);
  const userGrowth = useMemo(() => buildUserGrowthData(users), [users]);

  // ── Recent 5 ebooks ──
  const recentBooks = [...ebooks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      sub: `${writers} writers · ${readers} readers`,
      color: "bg-purple-500/20 text-purple-400",
      trend: `+${newThisWeek} this week`,
      trendUp: true,
    },
    {
      icon: BookOpen,
      label: "Total Books",
      value: totalBooks.toLocaleString(),
      sub: `${pendingBooks} pending approval`,
      color: "bg-blue-500/20 text-blue-400",
      trend: `${ebooks.filter((b) => b.status === "published").length} published`,
      trendUp: true,
    },
    {
      icon: DollarSign,
      label: "Platform Revenue",
      value: formatCurrency(totalRevenue),
      sub: `${formatCurrency(monthRevenue)} this month`,
      color: "bg-green-500/20 text-green-400",
      trend: `${soldBooks.length} sales`,
      trendUp: true,
    },
    {
      icon: Flag,
      label: "Pending Books",
      value: pendingBooks,
      sub: "Awaiting admin review",
      color: "bg-red-500/20 text-red-400",
      trend: pendingBooks > 0 ? `${pendingBooks} new` : "All clear",
      trendUp: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

      {/* Header */}
      <FadeLeft>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={20} className="text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
            <p className="text-gray-400 text-sm mt-1">Monitor activity, manage content, and track revenue.</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Last updated</p>
            <p className="text-sm text-gray-300 font-medium">Just now</p>
          </div>
        </div>
      </FadeLeft>

      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, sub, color, trend, trendUp }) => (
          <StaggerItem key={label}>
            <Card className="bg-[#13132a] border-white/5 rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{label}</p>
                      <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${trendUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {trend}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-3">{sub}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Revenue Chart + User Growth */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Revenue Chart */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-base font-semibold">Revenue Overview</CardTitle>
                <p className="text-gray-500 text-xs mt-1">
                  Platform earnings for the last {range === "7" ? "7 days" : range === "30" ? "30 days" : "90 days"}.
                </p>
              </div>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className="w-32 h-8 bg-[#0d0d1a] border-white/10 text-white text-xs">
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
            {revenueData.length === 0 ? (
              <div className="flex items-center justify-center h-[240px] text-gray-600 text-sm">No revenue data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={revenueData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    dot={{ fill: "#8b5cf6", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-2">
            <div>
              <CardTitle className="text-white text-base font-semibold">User Growth</CardTitle>
              <p className="text-gray-500 text-xs mt-1">Writers vs Readers registered over time.</p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-3 h-0.5 bg-purple-400 rounded-full inline-block" /> Writers
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-3 h-0.5 bg-blue-400 rounded-full inline-block" /> Readers
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-6 pt-2">
            {userGrowth.length === 0 ? (
              <div className="flex items-center justify-center h-[240px] text-gray-600 text-sm">No user data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={userGrowth} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<GrowthTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="readers" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={20} />
                  <Bar dataKey="writers" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Book Submissions */}
      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-base font-semibold">Recent Book Submissions</CardTitle>
              <p className="text-gray-500 text-xs mt-1">Latest books submitted by writers.</p>
            </div>
            <Button variant="link" className="text-purple-400 text-xs p-0 h-auto hover:text-purple-300">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {recentBooks.length === 0 ? (
            <p className="text-gray-600 text-sm py-6 text-center">No books yet.</p>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-[1fr_120px_80px_80px_36px] gap-3 text-xs text-gray-500 uppercase tracking-wide pb-2 border-b border-white/5">
                <span>Book</span>
                <span>Author</span>
                <span>Price</span>
                <span>Status</span>
                <span />
              </div>
              {recentBooks.map((book) => (
                <div key={book._id} className="grid grid-cols-[1fr_120px_80px_80px_36px] gap-3 items-center py-3 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-10 rounded bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center flex-shrink-0">
                      <FileText size={12} className="text-white/60" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{book.title}</p>
                      <p className="text-xs text-gray-500">{timeAgo(book.createdAt)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{book.writerEmail?.split("@")[0] ?? "—"}</p>
                  <p className="text-sm font-semibold text-white">{book.price ? `$${Number(book.price).toFixed(2)}` : "—"}</p>
                  <StatusBadge status={book.status} />
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-600 hover:text-gray-300 hover:bg-white/5">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
        <StaggerContainer className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Manage Users", sub: "View, ban, or promote accounts" },
            { icon: BookOpen, label: "Book Approvals", sub: `${pendingBooks} pending submissions` },
            { icon: TrendingUp, label: "Revenue Reports", sub: "Export financial summaries" },
            { icon: ShieldCheck, label: "Admin Logs", sub: "Audit trail of all actions" },
          ].map(({ icon: Icon, label, sub }) => (
            <StaggerItem key={label}>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

    </div>
  );
}