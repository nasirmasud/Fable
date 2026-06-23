"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Download,
  Filter,
  RefreshCcw,
  Search,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
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

// ── Mock Data ──────────────────────────────────────────────
const REVENUE_TREND = {
  "7": [
    { date: "May 14", gross: 420, commission: 126, writers: 294 },
    { date: "May 15", gross: 610, commission: 183, writers: 427 },
    { date: "May 16", gross: 380, commission: 114, writers: 266 },
    { date: "May 17", gross: 520, commission: 156, writers: 364 },
    { date: "May 18", gross: 740, commission: 222, writers: 518 },
    { date: "May 19", gross: 890, commission: 267, writers: 623 },
    { date: "May 20", gross: 670, commission: 201, writers: 469 },
  ],
  "30": [
    { date: "May 1", gross: 300, commission: 90, writers: 210 },
    { date: "May 5", gross: 580, commission: 174, writers: 406 },
    { date: "May 10", gross: 820, commission: 246, writers: 574 },
    { date: "May 15", gross: 640, commission: 192, writers: 448 },
    { date: "May 20", gross: 970, commission: 291, writers: 679 },
    { date: "May 25", gross: 1100, commission: 330, writers: 770 },
    { date: "May 30", gross: 860, commission: 258, writers: 602 },
  ],
  "90": [
    { date: "Mar", gross: 5200, commission: 1560, writers: 3640 },
    { date: "Apr", gross: 7800, commission: 2340, writers: 5460 },
    { date: "May", gross: 9823, commission: 2947, writers: 6876 },
  ],
};

const TRANSACTIONS = [
  { id: "TXN-0081", buyer: "Alex Rivera", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Completed", date: "May 20, 2024", time: "11:42 AM" },
  { id: "TXN-0080", buyer: "David Kim", seller: "Tom Yeats", book: "Starfall Rising", amount: "$7.99", commission: "$2.40", payout: "$5.59", method: "Card", status: "Completed", date: "May 20, 2024", time: "10:15 AM" },
  { id: "TXN-0079", buyer: "Priya Sen", seller: "Lucia Ferr", book: "Code & Chaos", amount: "$4.99", commission: "$1.50", payout: "$3.49", method: "Wallet", status: "Completed", date: "May 19, 2024", time: "9:03 PM" },
  { id: "TXN-0078", buyer: "Anna Choi", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Refunded", date: "May 19, 2024", time: "6:30 PM" },
  { id: "TXN-0077", buyer: "Chris Bond", seller: "Sara Noor", book: "Quiet Hours", amount: "$2.99", commission: "$0.90", payout: "$2.09", method: "Wallet", status: "Pending", date: "May 18, 2024", time: "4:12 PM" },
  { id: "TXN-0076", buyer: "Alex Rivera", seller: "Tom Yeats", book: "Iron Veil", amount: "$11.99", commission: "$3.60", payout: "$8.39", method: "Card", status: "Completed", date: "May 18, 2024", time: "1:55 PM" },
  { id: "TXN-0075", buyer: "Priya Sen", seller: "James Arlen", book: "The Lost Kingdom", amount: "$9.99", commission: "$3.00", payout: "$6.99", method: "Card", status: "Failed", date: "May 17, 2024", time: "11:20 AM" },
  { id: "TXN-0074", buyer: "David Kim", seller: "Lucia Ferr", book: "Love & Other Worlds", amount: "$3.99", commission: "$1.20", payout: "$2.79", method: "Wallet", status: "Completed", date: "May 17, 2024", time: "9:45 AM" },
  { id: "TXN-0073", buyer: "Anna Choi", seller: "Mira Patel", book: "Beyond the Stars", amount: "$5.99", commission: "$1.80", payout: "$4.19", method: "Card", status: "Completed", date: "May 16, 2024", time: "8:10 PM" },
  { id: "TXN-0072", buyer: "Chris Bond", seller: "Tom Yeats", book: "Starfall Rising", amount: "$7.99", commission: "$2.40", payout: "$5.59", method: "Card", status: "Refunded", date: "May 16, 2024", time: "3:30 PM" },
];

const PAGE_SIZE = 8;

// ── Tooltip ────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl space-y-1">
        <p className="text-gray-400 text-xs mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="font-semibold text-xs" style={{ color: p.color }}>
            {p.dataKey === "gross" ? "Gross" : p.dataKey === "commission" ? "Commission" : "Writer Payout"}: ${p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Status Badge ───────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Completed: { cls: "bg-green-500/15 text-green-400", icon: <ArrowUpRight size={10} /> },
    Refunded: { cls: "bg-yellow-500/15 text-yellow-400", icon: <RefreshCcw size={10} /> },
    Pending: { cls: "bg-blue-500/15 text-blue-400", icon: null },
    Failed: { cls: "bg-red-500/15 text-red-400", icon: <ArrowDownRight size={10} /> },
  };
  const { cls, icon } = map[status] ?? map.Pending;
  return (
    <Badge variant="outline" className={`text-xs px-2 py-0 border-0 flex items-center gap-1 w-fit ${cls}`}>
      {icon} {status}
    </Badge>
  );
}

// ── Method Badge ───────────────────────────────────────────
function MethodBadge({ method }) {
  return (
    <Badge variant="outline" className="text-xs px-2 py-0 border-0 bg-white/5 text-gray-400">
      {method === "Card" ? "💳" : "👛"} {method}
    </Badge>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function TransactionsPage() {
  const [range, setRange] = useState("7");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = TRANSACTIONS.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      t.id.toLowerCase().includes(q) ||
      t.buyer.toLowerCase().includes(q) ||
      t.seller.toLowerCase().includes(q) ||
      t.book.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const currentData = REVENUE_TREND[range];
  const totalGross = currentData.reduce((s, d) => s + d.gross, 0);
  const totalCommission = currentData.reduce((s, d) => s + d.commission, 0);
  const totalPayout = currentData.reduce((s, d) => s + d.writers, 0);

  const stats = [
    {
      icon: TrendingUp,
      label: "Gross Revenue",
      value: `$${totalGross.toLocaleString()}`,
      sub: "Total sales in period",
      color: "bg-purple-500/20 text-purple-400",
      trend: "+18.2%",
      up: true,
    },
    {
      icon: DollarSign,
      label: "Platform Commission",
      value: `$${totalCommission.toLocaleString()}`,
      sub: "30% of gross revenue",
      color: "bg-green-500/20 text-green-400",
      trend: "+18.2%",
      up: true,
    },
    {
      icon: Wallet,
      label: "Writer Payouts",
      value: `$${totalPayout.toLocaleString()}`,
      sub: "70% paid to authors",
      color: "bg-blue-500/20 text-blue-400",
      trend: "+18.2%",
      up: true,
    },
    {
      icon: BookOpen,
      label: "Total Transactions",
      value: TRANSACTIONS.length,
      sub: `${TRANSACTIONS.filter((t) => t.status === "Refunded").length} refunds · ${TRANSACTIONS.filter((t) => t.status === "Failed").length} failed`,
      color: "bg-pink-500/20 text-pink-400",
      trend: `${TRANSACTIONS.filter((t) => t.status === "Completed").length} completed`,
      up: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={20} className="text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 text-sm mt-1">Monitor platform-wide revenue, payouts, and refunds.</p>
        </div>
        <Button className="bg-[#13132a] hover:bg-[#1a1a35] border border-white/10 text-white text-sm h-9 px-4 rounded-xl hidden sm:flex items-center gap-2">
          <Download size={15} className="text-purple-400" /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, sub, color, trend, up }) => (
          <Card key={label} className="bg-[#13132a] border-white/5 rounded-2xl">
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
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {trend}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-3">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <CardHeader className="px-6 pt-6 pb-2">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-white text-base font-semibold">Revenue Breakdown</CardTitle>
              <p className="text-gray-500 text-xs mt-1">
                Gross, commission, and writer payout — last {range === "7" ? "7 days" : range === "30" ? "30 days" : "90 days"}.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-purple-400 rounded-full inline-block" /> Gross</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-green-400 rounded-full inline-block" /> Commission</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-0.5 bg-blue-400 rounded-full inline-block" /> Writer Payout</span>
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
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-6 pt-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={REVENUE_TREND[range]} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="commissionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="writerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(139,92,246,0.15)", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="gross" stroke="#8b5cf6" strokeWidth={2} fill="url(#grossGrad)" dot={false} activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }} />
              <Area type="monotone" dataKey="writers" stroke="#3b82f6" strokeWidth={2} fill="url(#writerGrad)" dot={false} activeDot={{ r: 5, fill: "#60a5fa", strokeWidth: 0 }} />
              <Area type="monotone" dataKey="commission" stroke="#22c55e" strokeWidth={2} fill="url(#commissionGrad)" dot={false} activeDot={{ r: 5, fill: "#4ade80", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-white text-base font-semibold flex-1">Transaction History</CardTitle>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search ID, buyer, book…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full sm:w-56 h-9 pl-8 pr-3 bg-[#0d0d1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-500 flex-shrink-0" />
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-32 h-9 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                  <SelectItem value="All" className="text-xs focus:bg-purple-500/20 focus:text-white">All Status</SelectItem>
                  <SelectItem value="Completed" className="text-xs focus:bg-purple-500/20 focus:text-white">Completed</SelectItem>
                  <SelectItem value="Pending" className="text-xs focus:bg-purple-500/20 focus:text-white">Pending</SelectItem>
                  <SelectItem value="Refunded" className="text-xs focus:bg-purple-500/20 focus:text-white">Refunded</SelectItem>
                  <SelectItem value="Failed" className="text-xs focus:bg-purple-500/20 focus:text-white">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {/* Table Header */}
          <div className="grid grid-cols-[100px_1fr_1fr_1.5fr_80px_80px_80px_90px_90px] gap-3 text-xs text-gray-500 uppercase tracking-wide pb-3 border-b border-white/5">
            <span>ID</span>
            <span>Buyer</span>
            <span>Seller</span>
            <span>Book</span>
            <span>Amount</span>
            <span>Commission</span>
            <span>Payout</span>
            <span>Method</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {paginated.length === 0 ? (
              <div className="py-16 text-center">
                <DollarSign size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No transactions match your filters.</p>
              </div>
            ) : paginated.map((txn) => (
              <div key={txn.id} className="grid grid-cols-[100px_1fr_1fr_1.5fr_80px_80px_80px_90px_90px] gap-3 items-center py-3">
                <p className="text-xs font-mono text-purple-400">{txn.id}</p>
                <p className="text-sm text-white truncate">{txn.buyer}</p>
                <p className="text-sm text-gray-400 truncate">{txn.seller}</p>
                <div className="min-w-0">
                  <p className="text-sm text-gray-300 truncate">{txn.book}</p>
                  <p className="text-xs text-gray-600">{txn.date} · {txn.time}</p>
                </div>
                <p className="text-sm font-semibold text-white">{txn.amount}</p>
                <p className="text-sm text-green-400">{txn.commission}</p>
                <p className="text-sm text-blue-400">{txn.payout}</p>
                <MethodBadge method={txn.method} />
                <StatusBadge status={txn.status} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost" size="icon"
                  className="w-8 h-8 text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p} variant="ghost" size="icon"
                    className={`w-8 h-8 text-sm ${p === page ? "bg-purple-500/20 text-purple-300" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="ghost" size="icon"
                  className="w-8 h-8 text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}