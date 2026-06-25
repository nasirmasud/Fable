// "use client";

// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   BookOpen,
//   ChevronLeft,
//   ChevronRight,
//   DollarSign,
//   Download,
//   Filter,
//   RefreshCcw,
//   Search,
//   ShieldCheck,
//   TrendingUp,
//   Wallet,
// } from "lucide-react";
// import { useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
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
// const REVENUE_TREND = {
//   "7": [
//     { date: "May 14", gross: 420, commission: 126, writers: 294 },
//     { date: "May 15", gross: 610, commission: 183, writers: 427 },
//     { date: "May 16", gross: 380, commission: 114, writers: 266 },
//     { date: "May 17", gross: 520, commission: 156, writers: 364 },
//     { date: "May 18", gross: 740, commission: 222, writers: 518 },
//     { date: "May 19", gross: 890, commission: 267, writers: 623 },
//     { date: "May 20", gross: 670, commission: 201, writers: 469 },
//   ],
//   "30": [
//     { date: "May 1", gross: 300, commission: 90, writers: 210 },
//     { date: "May 5", gross: 580, commission: 174, writers: 406 },
//     { date: "May 10", gross: 820, commission: 246, writers: 574 },
//     { date: "May 15", gross: 640, commission: 192, writers: 448 },
//     { date: "May 20", gross: 970, commission: 291, writers: 679 },
//     { date: "May 25", gross: 1100, commission: 330, writers: 770 },
//     { date: "May 30", gross: 860, commission: 258, writers: 602 },
//   ],
//   "90": [
//     { date: "Mar", gross: 5200, commission: 1560, writers: 3640 },
//     { date: "Apr", gross: 7800, commission: 2340, writers: 5460 },
//     { date: "May", gross: 9823, commission: 2947, writers: 6876 },
//   ],
// };

// const TRANSACTIONS = [
//   { id: "TXN-0081", buyer: "Alex Rivera", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Completed", date: "May 20, 2024", time: "11:42 AM" },
//   { id: "TXN-0080", buyer: "David Kim", seller: "Tom Yeats", book: "Starfall Rising", amount: "$7.99", commission: "$2.40", payout: "$5.59", method: "Card", status: "Completed", date: "May 20, 2024", time: "10:15 AM" },
//   { id: "TXN-0079", buyer: "Priya Sen", seller: "Lucia Ferr", book: "Code & Chaos", amount: "$4.99", commission: "$1.50", payout: "$3.49", method: "Wallet", status: "Completed", date: "May 19, 2024", time: "9:03 PM" },
//   { id: "TXN-0078", buyer: "Anna Choi", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Refunded", date: "May 19, 2024", time: "6:30 PM" },
//   { id: "TXN-0077", buyer: "Chris Bond", seller: "Sara Noor", book: "Quiet Hours", amount: "$2.99", commission: "$0.90", payout: "$2.09", method: "Wallet", status: "Pending", date: "May 18, 2024", time: "4:12 PM" },
//   { id: "TXN-0076", buyer: "Alex Rivera", seller: "Tom Yeats", book: "Iron Veil", amount: "$11.99", commission: "$3.60", payout: "$8.39", method: "Card", status: "Completed", date: "May 18, 2024", time: "1:55 PM" },
//   { id: "TXN-0075", buyer: "Priya Sen", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Failed", date: "May 17, 2024", time: "11:20 AM" },
//   { id: "TXN-0074", buyer: "David Kim", seller: "Lucia Ferr", book: "Love & Other Worlds", amount: "$3.99", commission: "$1.20", payout: "$2.79", method: "Wallet", status: "Completed", date: "May 17, 2024", time: "9:45 AM" },
//   { id: "TXN-0073", buyer: "Anna Choi", seller: "Mira Patel", book: "Beyond the Stars", amount: "$5.99", commission: "$1.80", payout: "$4.19", method: "Card", status: "Completed", date: "May 16, 2024", time: "8:10 PM" },
//   { id: "TXN-0072", buyer: "Chris Bond", seller: "Tom Yeats", book: "Starfall Rising", amount: "$7.99", commission: "$2.40", payout: "$5.59", method: "Card", status: "Refunded", date: "May 16, 2024", time: "3:30 PM" },
// ];

// const PAGE_SIZE = 8;

// // ── Tooltip ────────────────────────────────────────────────
// const ChartTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl space-y-1">
//         <p className="text-gray-400 text-xs mb-2">{label}</p>
//         {payload.map((p) => (
//           <p key={p.dataKey} className="font-semibold text-xs" style={{ color: p.color }}>
//             {p.dataKey === "gross" ? "Gross" : p.dataKey === "commission" ? "Commission" : "Writer Payout"}: ${p.value}
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
//     Completed: { cls: "bg-green-500/15 text-green-400", icon: <ArrowUpRight size={10} /> },
//     Refunded: { cls: "bg-yellow-500/15 text-yellow-400", icon: <RefreshCcw size={10} /> },
//     Pending: { cls: "bg-blue-500/15 text-blue-400", icon: null },
//     Failed: { cls: "bg-red-500/15 text-red-400", icon: <ArrowDownRight size={10} /> },
//   };
//   const { cls, icon } = map[status] ?? map.Pending;
//   return (
//     <Badge variant="outline" className={`text-xs px-2 py-0 border-0 flex items-center gap-1 w-fit ${cls}`}>
//       {icon} {status}
//     </Badge>
//   );
// }

// // ── Method Badge ───────────────────────────────────────────
// function MethodBadge({ method }) {
//   return (
//     <Badge variant="outline" className="text-xs px-2 py-0 border-0 bg-white/5 text-gray-400">
//       {method === "Card" ? "💳" : "👛"} {method}
//     </Badge>
//   );
// }

// // ── Main Component ─────────────────────────────────────────
// export default function TransactionsPage() {
//   const [range, setRange] = useState("7");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [page, setPage] = useState(1);

//   const filtered = TRANSACTIONS.filter((t) => {
//     const q = search.toLowerCase();
//     const matchSearch =
//       t.id.toLowerCase().includes(q) ||
//       t.buyer.toLowerCase().includes(q) ||
//       t.seller.toLowerCase().includes(q) ||
//       t.book.toLowerCase().includes(q);
//     const matchStatus = statusFilter === "All" || t.status === statusFilter;
//     return matchSearch && matchStatus;
//   });

//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   const currentData = REVENUE_TREND[range];
//   const totalGross = currentData.reduce((s, d) => s + d.gross, 0);
//   const totalCommission = currentData.reduce((s, d) => s + d.commission, 0);
//   const totalPayout = currentData.reduce((s, d) => s + d.writers, 0);

//   const stats = [
//     {
//       icon: TrendingUp,
//       label: "Gross Revenue",
//       value: `$${totalGross.toLocaleString()}`,
//       sub: "Total sales in period",
//       color: "bg-purple-500/20 text-purple-400",
//       trend: "+18.2%",
//       up: true,
//     },
//     {
//       icon: DollarSign,
//       label: "Platform Commission",
//       value: `$${totalCommission.toLocaleString()}`,
//       sub: "30% of gross revenue",
//       color: "bg-green-500/20 text-green-400",
//       trend: "+18.2%",
//       up: true,
//     },
//     {
//       icon: Wallet,
//       label: "Writer Payouts",
//       value: `$${totalPayout.toLocaleString()}`,
//       sub: "70% paid to authors",
//       color: "bg-blue-500/20 text-blue-400",
//       trend: "+18.2%",
//       up: true,
//     },
//     {
//       icon: BookOpen,
//       label: "Total Transactions",
//       value: TRANSACTIONS.length,
//       sub: `${TRANSACTIONS.filter((t) => t.status === "Refunded").length} refunds · ${TRANSACTIONS.filter((t) => t.status === "Failed").length} failed`,
//       color: "bg-pink-500/20 text-pink-400",
//       trend: `${TRANSACTIONS.filter((t) => t.status === "Completed").length} completed`,
//       up: true,
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
//           <h1 className="text-2xl font-bold text-white">Transactions</h1>
//           <p className="text-gray-400 text-sm mt-1">Monitor platform-wide revenue, payouts, and refunds.</p>
//         </div>
//         <Button className="bg-[#13132a] hover:bg-[#1a1a35] border border-white/10 text-white text-sm h-9 px-4 rounded-xl hidden sm:flex items-center gap-2">
//           <Download size={15} className="text-purple-400" /> Export CSV
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {stats.map(({ icon: Icon, label, value, sub, color, trend, up }) => (
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
//                 <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
//                   {trend}
//                 </span>
//               </div>
//               <p className="text-gray-500 text-xs mt-3">{sub}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Revenue Area Chart */}
//       <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//         <CardHeader className="px-6 pt-6 pb-2">
//           <div className="flex items-start justify-between flex-wrap gap-3">
//             <div>
//               <CardTitle className="text-white text-base font-semibold">Revenue Breakdown</CardTitle>
//               <p className="text-gray-500 text-xs mt-1">
//                 Gross, commission, and writer payout — last {range === "7" ? "7 days" : range === "30" ? "30 days" : "90 days"}.
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="hidden sm:flex items-center gap-4">
//                 <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-purple-400 rounded-full inline-block" /> Gross</span>
//                 <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-green-400 rounded-full inline-block" /> Commission</span>
//                 <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-blue-400 rounded-full inline-block" /> Writer Payout</span>
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
//           </div>
//         </CardHeader>
//         <CardContent className="px-2 pb-6 pt-2">
//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={REVENUE_TREND[range]} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
//                   <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="commissionGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
//                   <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="writerGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//               <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
//               <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(139,92,246,0.15)", strokeWidth: 1 }} />
//               <Area type="monotone" dataKey="gross" stroke="#8b5cf6" strokeWidth={2} fill="url(#grossGrad)" dot={false} activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }} />
//               <Area type="monotone" dataKey="writers" stroke="#3b82f6" strokeWidth={2} fill="url(#writerGrad)" dot={false} activeDot={{ r: 5, fill: "#60a5fa", strokeWidth: 0 }} />
//               <Area type="monotone" dataKey="commission" stroke="#22c55e" strokeWidth={2} fill="url(#commissionGrad)" dot={false} activeDot={{ r: 5, fill: "#4ade80", strokeWidth: 0 }} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Transactions Table */}
//       <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//         <CardHeader className="px-6 pt-6 pb-4">
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//             <CardTitle className="text-white text-base font-semibold flex-1">Transaction History</CardTitle>

//             {/* Search */}
//             <div className="relative">
//               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search ID, buyer, book…"
//                 value={search}
//                 onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                 className="w-full sm:w-56 h-9 pl-8 pr-3 bg-[#0d0d1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
//               />
//             </div>

//             {/* Status Filter */}
//             <div className="flex items-center gap-2">
//               <Filter size={14} className="text-gray-500 flex-shrink-0" />
//               <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
//                 <SelectTrigger className="w-32 h-9 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
//                   <SelectItem value="All" className="text-xs focus:bg-purple-500/20 focus:text-white">All Status</SelectItem>
//                   <SelectItem value="Completed" className="text-xs focus:bg-purple-500/20 focus:text-white">Completed</SelectItem>
//                   <SelectItem value="Pending" className="text-xs focus:bg-purple-500/20 focus:text-white">Pending</SelectItem>
//                   <SelectItem value="Refunded" className="text-xs focus:bg-purple-500/20 focus:text-white">Refunded</SelectItem>
//                   <SelectItem value="Failed" className="text-xs focus:bg-purple-500/20 focus:text-white">Failed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="px-6 pb-6">
//           {/* Table Header */}
//           <div className="grid grid-cols-[100px_1fr_1fr_1.5fr_80px_80px_80px_90px_90px] gap-3 text-xs text-gray-500 uppercase tracking-wide pb-3 border-b border-white/5">
//             <span>ID</span>
//             <span>Buyer</span>
//             <span>Seller</span>
//             <span>Book</span>
//             <span>Amount</span>
//             <span>Commission</span>
//             <span>Payout</span>
//             <span>Method</span>
//             <span>Status</span>
//           </div>

//           <div className="divide-y divide-white/[0.04]">
//             {paginated.length === 0 ? (
//               <div className="py-16 text-center">
//                 <DollarSign size={32} className="text-gray-700 mx-auto mb-3" />
//                 <p className="text-gray-500 text-sm">No transactions match your filters.</p>
//               </div>
//             ) : paginated.map((txn) => (
//               <div key={txn.id} className="grid grid-cols-[100px_1fr_1fr_1.5fr_80px_80px_80px_90px_90px] gap-3 items-center py-3">
//                 <p className="text-xs font-mono text-purple-400">{txn.id}</p>
//                 <p className="text-sm text-white truncate">{txn.buyer}</p>
//                 <p className="text-sm text-gray-400 truncate">{txn.seller}</p>
//                 <div className="min-w-0">
//                   <p className="text-sm text-gray-300 truncate">{txn.book}</p>
//                   <p className="text-xs text-gray-600">{txn.date} · {txn.time}</p>
//                 </div>
//                 <p className="text-sm font-semibold text-white">{txn.amount}</p>
//                 <p className="text-sm text-green-400">{txn.commission}</p>
//                 <p className="text-sm text-blue-400">{txn.payout}</p>
//                 <MethodBadge method={txn.method} />
//                 <StatusBadge status={txn.status} />
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
//               <p className="text-xs text-gray-500">
//                 Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
//               </p>
//               <div className="flex items-center gap-1">
//                 <Button
//                   variant="ghost" size="icon"
//                   className="w-8 h-8 text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30"
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => p - 1)}
//                 >
//                   <ChevronLeft size={16} />
//                 </Button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <Button
//                     key={p} variant="ghost" size="icon"
//                     className={`w-8 h-8 text-sm ${p === page ? "bg-purple-500/20 text-purple-300" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
//                     onClick={() => setPage(p)}
//                   >
//                     {p}
//                   </Button>
//                 ))}
//                 <Button
//                   variant="ghost" size="icon"
//                   className="w-8 h-8 text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30"
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => p + 1)}
//                 >
//                   <ChevronRight size={16} />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   );
// }

"use client";

import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
import {
  BookMarked,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Receipt,
  Search,
  SlidersHorizontal,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    purple: "bg-purple-600/20 text-purple-400",
    green: "bg-green-600/20  text-green-400",
    blue: "bg-blue-600/20   text-blue-400",
    amber: "bg-yellow-500/20 text-yellow-400",
  };
  return (
    <div className="flex items-center gap-3 bg-[#13132a] border border-white/5 rounded-2xl px-5 py-5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-white leading-tight">{value ?? 0}</p>
      </div>
    </div>
  );
}

function PaymentStatusBadge({ status }) {
  const map = {
    completed: {
      cls: "bg-green-500/15 text-green-400 border border-green-500/25",
      dot: "bg-green-400",
      label: "Completed",
      Icon: CheckCircle2,
    },
    pending: {
      cls: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25",
      dot: "bg-yellow-400",
      label: "Pending",
      Icon: Clock,
    },
    failed: {
      cls: "bg-red-500/15 text-red-400 border border-red-500/25",
      dot: "bg-red-400",
      label: "Failed",
      Icon: XCircle,
    },
    refunded: {
      cls: "bg-purple-500/20 text-purple-300 border border-purple-500/25",
      dot: "bg-purple-400",
      label: "Refunded",
      Icon: null,
    },
  };
  const s = map[status] ?? map.completed;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function GenreBadge({ genre }) {
  return (
    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1e1040] text-purple-300 border border-purple-500/20 whitespace-nowrap">
      {genre}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const TABS = ["All", "Completed", "Pending", "Refunded", "Failed"];
const PER_PAGE_OPTIONS = [6, 12, 24];

export default function TransactionsPage({ soldBooks = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  // ── Derived stats ──
  const totalTransactions = soldBooks.length;
  const totalRevenue = soldBooks.reduce((acc, t) => acc + (Number(t.price) || 0), 0);
  const thisMonth = soldBooks.filter((t) => {
    const d = new Date(t.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const refunds = soldBooks.filter((t) => t.status === "refunded").length;

  // ── Filtering ──
  const filtered = soldBooks.filter((t) => {
    const matchTab =
      activeTab === "All" || (t.status ?? "completed").toLowerCase() === activeTab.toLowerCase();
    const matchSearch =
      !search ||
      t.bookTitle?.toLowerCase().includes(search.toLowerCase()) ||
      t.author?.toLowerCase().includes(search.toLowerCase()) ||
      t._id?.toString().toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  function handlePerPage(e) {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="bg-[#0d0d1a] text-white pb-10 min-h-screen">

      {/* ── Hero Banner ── */}
      <FadeLeft>
        <div
          className="mx-6 mt-3 mb-6 rounded-2xl px-8 py-8 flex items-center justify-between overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #2d1065 55%, #3d1580 100%)" }}
        >
          {[
            { top: "20%", left: "55%" },
            { top: "15%", left: "68%" },
            { top: "55%", left: "74%" },
            { top: "20%", left: "82%" },
            { top: "40%", left: "90%" },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute text-purple-300/50 text-lg pointer-events-none select-none"
              style={{ top: s.top, left: s.left }}
            >
              ✦
            </span>
          ))}

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/30 flex items-center justify-center">
                <Receipt size={18} className="text-purple-300" />
              </div>
              <h1 className="text-2xl font-bold">All Transactions</h1>
            </div>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              Monitor every purchase and payment<br />across the entire platform.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 relative z-10 mr-8 opacity-30">
            <div className="flex flex-col gap-2">
              <div className="w-32 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
              <div className="w-24 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
              <div className="w-28 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
            </div>
            <Receipt size={48} className="text-purple-200/50" />
          </div>
        </div>
      </FadeLeft>

      {/* ── Stat Cards ── */}
      <StaggerContainer className="px-6 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <StatCard icon={Receipt} label="Total Transactions" value={totalTransactions} color="purple" />
        </StaggerItem>
        <StaggerItem>
          <StatCard icon={TrendingUp} label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="green" />
        </StaggerItem>
        <StaggerItem>
          <StatCard icon={CalendarDays} label="This Month" value={thisMonth} color="blue" />
        </StaggerItem>
        <StaggerItem>
          <StatCard icon={BookMarked} label="Refunds" value={refunds} color="amber" />
        </StaggerItem>
      </StaggerContainer>

      {/* ── Filter Tabs + Search ── */}
      <div className="px-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-[#13132a] text-gray-300 border border-white/5 hover:bg-white/5 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search transactions..."
              className="w-full bg-[#13132a] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#13132a] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="mx-6 bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden">

        {/* Header row */}
        <div
          className="grid items-center gap-x-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 font-medium uppercase tracking-wider"
          style={{ gridTemplateColumns: "80px 2fr 1fr 1.2fr 80px 1.1fr 110px 60px" }}
        >
          <span>Cover</span>
          <span>Book</span>
          <span>Transaction ID</span>
          <span>Date & Time</span>
          <span>Amount</span>
          <span>Payment</span>
          <span>Status</span>
          <span className="text-right">Invoice</span>
        </div>

        {/* Empty state */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Receipt size={36} className="text-gray-700" />
            <p className="text-sm text-gray-600">No transactions found.</p>
          </div>
        ) : (
          paginated.map((txn, idx) => (
            <div
              key={txn._id ?? idx}
              className="grid items-center gap-x-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
              style={{ gridTemplateColumns: "80px 2fr 1fr 1.2fr 80px 1.1fr 110px 60px" }}
            >
              {/* Cover */}
              <div className="w-14 h-20 rounded-lg overflow-hidden bg-[#1a1035] border border-white/5 relative shrink-0">
                {txn.coverImage ? (
                  <Image src={txn.coverImage} alt={txn.bookTitle} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={16} className="text-purple-500/30" />
                  </div>
                )}
              </div>

              {/* Book title + author + genre */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {txn.bookTitle}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{txn.author}</p>
                <div className="mt-1.5">
                  <GenreBadge genre={txn.genre ?? "Ebook"} />
                </div>
              </div>

              {/* Transaction ID */}
              <div className="text-xs text-gray-400 font-mono truncate">
                {txn._id?.toString().slice(-8).toUpperCase()}
              </div>

              {/* Date & Time */}
              <div>
                <p className="text-xs text-gray-300">{formatDate(txn.createdAt)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatTime(txn.createdAt)}</p>
              </div>

              {/* Amount */}
              <div className="text-sm font-semibold text-white">
                {txn.status === "refunded"
                  ? <span className="text-purple-400">-${Number(txn.price).toFixed(2)}</span>
                  : `$${Number(txn.price).toFixed(2)}`}
              </div>

              {/* Payment method */}
              <div className="text-xs text-gray-400 truncate">
                {txn.paymentMethod ?? "Stripe"}
              </div>

              {/* Status */}
              <div>
                <PaymentStatusBadge status={txn.status ?? "completed"} />
              </div>

              {/* Invoice download */}
              <div className="flex justify-end">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-gray-400 hover:bg-white/5 hover:text-purple-400 transition-colors"
                  title="Download Invoice"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-gray-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to{" "}
            {Math.min(currentPage * perPage, filtered.length)} of {filtered.length} transactions
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>

            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === currentPage
                    ? "bg-purple-600 text-white"
                    : "border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <select
              value={perPage}
              onChange={handlePerPage}
              className="bg-[#13132a] border border-white/5 rounded-lg px-3 py-1.5 text-gray-300 text-xs outline-none focus:border-purple-500/50 cursor-pointer"
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n} per page</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}