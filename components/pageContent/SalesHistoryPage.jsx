// "use client";

// import {
//   Calendar,
//   ChevronDown,
//   ChevronLeft, ChevronRight, ChevronUp,
//   Copy,
//   Download,
//   LayoutList,
//   MoreVertical,
// } from "lucide-react";
// import { useState } from "react";
// import {
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   DropdownMenu, DropdownMenuContent,
//   DropdownMenuItem, DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // ── Data ───────────────────────────────────────────────────
// const BOOK_COLORS = ["#8b5cf6", "#60a5fa", "#f472b6", "#fb923c", "#4ade80"];

// const SALES_BY_BOOK = [
//   { name: "The Lost Kingdom", value: 30, pct: "35.7%" },
//   { name: "Love & Other Worlds", value: 22, pct: "26.2%" },
//   { name: "Beyond the Stars", value: 16, pct: "19.0%" },
//   { name: "Whispers in the Dark", value: 10, pct: "11.9%" },
//   { name: "Beyond the Horizon", value: 6, pct: "7.1%" },
// ];

// const EARNINGS_BY_BOOK = [
//   { name: "The Lost Kingdom", value: 407.60, display: "$407.60", pct: "48.4%" },
//   { name: "Love & Other Worlds", value: 191.28, display: "$191.28", pct: "22.7%" },
//   { name: "Beyond the Stars", value: 120.32, display: "$120.32", pct: "14.3%" },
//   { name: "Whispers in the Dark", value: 83.10, display: "$83.10", pct: "9.9%" },
//   { name: "Beyond the Horizon", value: 40.00, display: "$40.00", pct: "4.7%" },
// ];

// const SALES = [
//   { id: "#ORD-0001245", date: "May 20, 2024", time: "10:24 PM", title: "The Lost Kingdom", genre: "Fantasy", buyer: "Michael Johnson", email: "michaelj@email.com", price: "$9.99", earnings: "$7.99", status: "Completed", color: "from-blue-800 to-indigo-900" },
//   { id: "#ORD-0001244", date: "May 20, 2024", time: "06:15 PM", title: "Love & Other Worlds", genre: "Romance", buyer: "Sarah Williams", email: "sarah.w@email.com", price: "$3.99", earnings: "$3.19", status: "Completed", color: "from-rose-700 to-pink-900" },
//   { id: "#ORD-0001243", date: "May 19, 2024", time: "11:47 PM", title: "Beyond the Stars", genre: "Sci-Fi", buyer: "David Brown", email: "david.b@email.com", price: "$0.00", earnings: "$0.00", status: "Free", color: "from-violet-800 to-purple-900" },
//   { id: "#ORD-0001242", date: "May 19, 2024", time: "08:33 PM", title: "Whispers in the Dark", genre: "Horror", buyer: "Emma Davis", email: "emma.d@email.com", price: "$4.99", earnings: "$3.99", status: "Completed", color: "from-gray-700 to-slate-900" },
//   { id: "#ORD-0001241", date: "May 18, 2024", time: "05:22 PM", title: "The Lost Kingdom", genre: "Fantasy", buyer: "James Wilson", email: "james.w@email.com", price: "$9.99", earnings: "$7.99", status: "Completed", color: "from-blue-800 to-indigo-900" },
// ];

// const STATUS_STYLES = {
//   Completed: "bg-green-500/15 text-green-400 border-0",
//   Free: "bg-purple-500/15 text-purple-400 border-0",
//   Refunded: "bg-red-500/15 text-red-400 border-0",
// };

// // ── Custom Donut Label (center text) ───────────────────────
// function DonutCenter({ cx, cy, label, sub }) {
//   return (
//     <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
//       <tspan x={cx} dy="-0.4em" fontSize="20" fontWeight="700" fill="white">{label}</tspan>
//       <tspan x={cx} dy="1.5em" fontSize="11" fill="#6b7280">{sub}</tspan>
//     </text>
//   );
// }

// // ── Custom Pie Tooltip ─────────────────────────────────────
// const PieTooltip = ({ active, payload }) => {
//   if (active && payload?.length) {
//     return (
//       <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
//         <p className="text-white font-semibold">{payload[0].name}</p>
//         <p className="text-gray-400 mt-0.5">{payload[0].value}</p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function SalesHistoryPage() {
//   const [sortDir, setSortDir] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [copied, setCopied] = useState(null);
//   const TOTAL_PAGES = 17;

//   const copyId = (id) => {
//     navigator.clipboard.writeText(id);
//     setCopied(id);
//     setTimeout(() => setCopied(null), 1500);
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

//       {/* Header */}
//       <div className="flex items-start justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-white">Sales History</h1>
//           <p className="text-gray-400 text-sm mt-1">Track your ebook sales and earnings over time.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" className="border-white/10 bg-[#13132a] hover:bg-white/5 text-white text-sm gap-2">
//             <Calendar size={14} className="text-purple-400" />
//             May 14 – May 20, 2024
//             <ChevronDown size={14} className="text-gray-400" />
//           </Button>
//           <Button className="gap-2 text-sm" style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}>
//             <Download size={14} />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Pie Charts Row */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

//         {/* Sales by Book */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-2">
//             <CardTitle className="text-white text-base font-semibold">Sales by Book</CardTitle>
//             <p className="text-gray-500 text-xs mt-1">Based on books sold</p>
//           </CardHeader>
//           <CardContent className="px-6 pb-6">
//             <div className="flex items-center gap-6">
//               {/* Donut */}
//               <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
//                 <ResponsiveContainer width={200} height={200}>
//                   <PieChart>
//                     <Pie
//                       data={SALES_BY_BOOK}
//                       cx={95} cy={95}
//                       innerRadius={62} outerRadius={90}
//                       dataKey="value"
//                       strokeWidth={2}
//                       stroke="#0d0d1a"
//                     >
//                       {SALES_BY_BOOK.map((_, i) => (
//                         <Cell key={i} fill={BOOK_COLORS[i]} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<PieTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 {/* Center label */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                   <span className="text-xl font-bold text-white">84</span>
//                   <span className="text-xs text-gray-500">Total Sales</span>
//                 </div>
//               </div>

//               {/* Legend */}
//               <div className="flex-1 space-y-2.5">
//                 {SALES_BY_BOOK.map((item, i) => (
//                   <div key={item.name} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 min-w-0">
//                       <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BOOK_COLORS[i] }} />
//                       <span className="text-sm text-gray-300 truncate">{item.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2 flex-shrink-0 ml-2">
//                       <span className="text-sm text-white font-medium">{item.value}</span>
//                       <span className="text-xs text-gray-500">({item.pct})</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Earnings by Book */}
//         <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//           <CardHeader className="px-6 pt-6 pb-2">
//             <CardTitle className="text-white text-base font-semibold">Earnings by Book</CardTitle>
//             <p className="text-gray-500 text-xs mt-1">Based on earnings (USD)</p>
//           </CardHeader>
//           <CardContent className="px-6 pb-6">
//             <div className="flex items-center gap-6">
//               {/* Donut */}
//               <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
//                 <ResponsiveContainer width={200} height={200}>
//                   <PieChart>
//                     <Pie
//                       data={EARNINGS_BY_BOOK}
//                       cx={95} cy={95}
//                       innerRadius={62} outerRadius={90}
//                       dataKey="value"
//                       strokeWidth={2}
//                       stroke="#0d0d1a"
//                     >
//                       {EARNINGS_BY_BOOK.map((_, i) => (
//                         <Cell key={i} fill={BOOK_COLORS[i]} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<PieTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                   <span className="text-lg font-bold text-white">$842.30</span>
//                   <span className="text-xs text-gray-500">Total Earnings</span>
//                 </div>
//               </div>

//               {/* Legend */}
//               <div className="flex-1 space-y-2.5">
//                 {EARNINGS_BY_BOOK.map((item, i) => (
//                   <div key={item.name} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 min-w-0">
//                       <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BOOK_COLORS[i] }} />
//                       <span className="text-sm text-gray-300 truncate">{item.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2 flex-shrink-0 ml-2">
//                       <span className="text-sm text-white font-medium">{item.display}</span>
//                       <span className="text-xs text-gray-500">({item.pct})</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Transactions Table */}
//       <Card className="bg-[#13132a] border-white/5 rounded-2xl">
//         {/* Table Header */}
//         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
//           <LayoutList size={16} className="text-purple-400" />
//           <span className="text-white font-semibold text-sm">Sales Transactions</span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-white/5">
//                 {[
//                   { label: "Date", sortable: true },
//                   { label: "Book" },
//                   { label: "Order ID" },
//                   { label: "Buyer" },
//                   { label: "Price" },
//                   { label: "Earnings" },
//                   { label: "Status" },
//                   { label: "" },
//                 ].map(({ label, sortable }) => (
//                   <th key={label} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
//                     {sortable ? (
//                       <button
//                         onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
//                         className="flex items-center gap-1 hover:text-white transition-colors"
//                       >
//                         {label}
//                         <span className="flex flex-col">
//                           <ChevronUp size={10} className={sortDir === "asc" ? "text-purple-400" : "text-gray-600"} />
//                           <ChevronDown size={10} className={sortDir === "desc" ? "text-purple-400" : "text-gray-600"} />
//                         </span>
//                       </button>
//                     ) : label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {SALES.map((row) => (
//                 <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">

//                   {/* Date */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <p className="text-white text-sm">{row.date}</p>
//                     <p className="text-gray-500 text-xs">{row.time}</p>
//                   </td>

//                   {/* Book */}
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-9 h-12 rounded bg-gradient-to-br ${row.color} flex-shrink-0`} />
//                       <div>
//                         <p className="text-white font-medium whitespace-nowrap">{row.title}</p>
//                         <p className="text-gray-500 text-xs">{row.genre}</p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Order ID */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-300 font-mono text-xs">{row.id}</span>
//                       <button
//                         onClick={() => copyId(row.id)}
//                         className="text-gray-600 hover:text-purple-400 transition-colors"
//                       >
//                         {copied === row.id
//                           ? <span className="text-green-400 text-xs">✓</span>
//                           : <Copy size={12} />}
//                       </button>
//                     </div>
//                   </td>

//                   {/* Buyer */}
//                   <td className="px-6 py-4">
//                     <p className="text-white whitespace-nowrap">{row.buyer}</p>
//                     <p className="text-gray-500 text-xs">{row.email}</p>
//                   </td>

//                   {/* Price */}
//                   <td className="px-6 py-4 text-white whitespace-nowrap">{row.price}</td>

//                   {/* Earnings */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={row.earnings === "$0.00" ? "text-gray-500" : "text-green-400 font-semibold"}>
//                       {row.earnings}
//                     </span>
//                   </td>

//                   {/* Status */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge className={STATUS_STYLES[row.status]}>{row.status}</Badge>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-4 py-4">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-white hover:bg-white/10">
//                           <MoreVertical size={14} />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="bg-[#1a1a35] border-white/10 text-white text-sm" align="end">
//                         <DropdownMenuItem className="focus:bg-purple-500/20 cursor-pointer">View Details</DropdownMenuItem>
//                         <DropdownMenuItem className="focus:bg-purple-500/20 cursor-pointer">Download Invoice</DropdownMenuItem>
//                         <DropdownMenuItem className="focus:bg-red-500/20 text-red-400 cursor-pointer">Issue Refund</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
//           <p className="text-xs text-gray-500">
//             Showing {(page - 1) * 5 + 1} to {Math.min(page * 5, 84)} of 84 results
//           </p>
//           <div className="flex items-center gap-1">
//             <Button
//               variant="ghost" size="icon"
//               className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
//               disabled={page === 1}
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//             >
//               <ChevronLeft size={15} />
//             </Button>

//             {[1, 2, 3].map((p) => (
//               <Button
//                 key={p} variant="ghost" size="icon"
//                 className={`w-8 h-8 text-sm font-medium ${page === p ? "bg-purple-600 text-white hover:bg-purple-700" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
//                 onClick={() => setPage(p)}
//               >
//                 {p}
//               </Button>
//             ))}

//             <span className="text-gray-600 px-1 text-sm">...</span>

//             <Button
//               variant="ghost" size="icon"
//               className={`w-8 h-8 text-sm font-medium ${page === 17 ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
//               onClick={() => setPage(17)}
//             >
//               17
//             </Button>

//             <Button
//               variant="ghost" size="icon"
//               className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
//               disabled={page === TOTAL_PAGES}
//               onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
//             >
//               <ChevronRight size={15} />
//             </Button>
//           </div>
//         </div>
//       </Card>

//     </div>
//   );
// }

"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  LayoutList,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Constants ──────────────────────────────────────────────
const BOOK_COLORS = ["#8b5cf6", "#60a5fa", "#f472b6", "#fb923c", "#4ade80"];
const PAGE_SIZE = 5;

// ── Helpers ────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return { date: "—", time: "" };
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
}

function shortId(mongoId) {
  if (!mongoId) return "—";
  return `#ORD-${String(mongoId).slice(-7).toUpperCase()}`;
}

// ── Custom Pie Tooltip ─────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1a35] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-gray-400 mt-0.5">{payload[0].payload.display ?? payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// ── Main Component ─────────────────────────────────────────
export default function SalesHistoryPage({ soldBooks = [] }) {
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(null);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  // ── Derived stats ──────────────────────────────────────
  const totalSales = soldBooks.length;
  const totalEarnings = soldBooks.reduce((acc, b) => acc + (Number(b.price) || 0), 0);

  // Sales by book (top 5)
  const salesByBook = useMemo(() => {
    const map = {};
    soldBooks.forEach((b) => {
      const key = b.bookTitle || "Unknown";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name,
        value,
        pct: totalSales ? `${((value / totalSales) * 100).toFixed(1)}%` : "0%",
      }));
  }, [soldBooks, totalSales]);

  // Earnings by book (top 5)
  const earningsByBook = useMemo(() => {
    const map = {};
    soldBooks.forEach((b) => {
      const key = b.bookTitle || "Unknown";
      map[key] = (map[key] || 0) + (Number(b.price) || 0);
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name,
        value,
        display: `$${value.toFixed(2)}`,
        pct: totalEarnings ? `${((value / totalEarnings) * 100).toFixed(1)}%` : "0%",
      }));
  }, [soldBooks, totalEarnings]);

  // ── Sorted + paginated rows ───────────────────────────
  const sorted = useMemo(() => {
    return [...soldBooks].sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sortDir === "desc" ? db - da : da - db;
    });
  }, [soldBooks, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales History</h1>
          <p className="text-gray-400 text-sm mt-1">Track your ebook sales and earnings over time.</p>
        </div>
        <Button className="gap-2 text-sm" style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}>
          <Download size={14} />
          Export
        </Button>
      </div>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Sales by Book */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-white text-base font-semibold">Sales by Book</CardTitle>
            <p className="text-gray-500 text-xs mt-1">Based on books sold</p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {salesByBook.length === 0 ? (
              <p className="text-gray-600 text-sm py-8 text-center">No sales yet.</p>
            ) : (
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie data={salesByBook} cx={95} cy={95} innerRadius={62} outerRadius={90} dataKey="value" strokeWidth={2} stroke="#0d0d1a">
                        {salesByBook.map((_, i) => <Cell key={i} fill={BOOK_COLORS[i % BOOK_COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-white">{totalSales}</span>
                    <span className="text-xs text-gray-500">Total Sales</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  {salesByBook.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BOOK_COLORS[i % BOOK_COLORS.length] }} />
                        <span className="text-sm text-gray-300 truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-sm text-white font-medium">{item.value}</span>
                        <span className="text-xs text-gray-500">({item.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Earnings by Book */}
        <Card className="bg-[#13132a] border-white/5 rounded-2xl">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-white text-base font-semibold">Earnings by Book</CardTitle>
            <p className="text-gray-500 text-xs mt-1">Based on earnings (USD)</p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {earningsByBook.length === 0 ? (
              <p className="text-gray-600 text-sm py-8 text-center">No earnings yet.</p>
            ) : (
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie data={earningsByBook} cx={95} cy={95} innerRadius={62} outerRadius={90} dataKey="value" strokeWidth={2} stroke="#0d0d1a">
                        {earningsByBook.map((_, i) => <Cell key={i} fill={BOOK_COLORS[i % BOOK_COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-bold text-white">${totalEarnings.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">Total Earnings</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  {earningsByBook.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BOOK_COLORS[i % BOOK_COLORS.length] }} />
                        <span className="text-sm text-gray-300 truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-sm text-white font-medium">{item.display}</span>
                        <span className="text-xs text-gray-500">({item.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
          <LayoutList size={16} className="text-purple-400" />
          <span className="text-white font-semibold text-sm">Sales Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { label: "Date", sortable: true },
                  { label: "Book" },
                  { label: "Order ID" },
                  { label: "Buyer" },
                  { label: "Price" },
                  { label: "Status" },
                  { label: "" },
                ].map(({ label, sortable }) => (
                  <th key={label} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    {sortable ? (
                      <button onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")} className="flex items-center gap-1 hover:text-white transition-colors">
                        {label}
                        <span className="flex flex-col">
                          <ChevronUp size={10} className={sortDir === "asc" ? "text-purple-400" : "text-gray-600"} />
                          <ChevronDown size={10} className={sortDir === "desc" ? "text-purple-400" : "text-gray-600"} />
                        </span>
                      </button>
                    ) : label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-600 text-sm">No sales found.</td>
                </tr>
              ) : pageRows.map((row) => {
                const { date, time } = formatDate(row.createdAt);
                const orderId = shortId(row._id);
                const price = Number(row.price) || 0;

                return (
                  <tr key={row._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-white text-sm">{date}</p>
                      <p className="text-gray-500 text-xs">{time}</p>
                    </td>

                    {/* Book */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-12 rounded overflow-hidden bg-[#1a1035] flex-shrink-0 relative">
                          {row.coverImage ? (
                            <Image src={row.coverImage} alt={row.bookTitle} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-violet-800 to-purple-900" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium whitespace-nowrap">{row.bookTitle}</p>
                          <p className="text-gray-500 text-xs">{row.author}</p>
                        </div>
                      </div>
                    </td>

                    {/* Order ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 font-mono text-xs">{orderId}</span>
                        <button onClick={() => copyId(orderId)} className="text-gray-600 hover:text-purple-400 transition-colors">
                          {copied === orderId ? <span className="text-green-400 text-xs">✓</span> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="px-6 py-4">
                      <p className="text-white whitespace-nowrap">{row.name || "—"}</p>
                      <p className="text-gray-500 text-xs">{row.email}</p>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-white whitespace-nowrap">
                      {price > 0 ? `$${price.toFixed(2)}` : <span className="text-gray-500">Free</span>}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={price > 0 ? "bg-green-500/15 text-green-400 border-0" : "bg-purple-500/15 text-purple-400 border-0"}>
                        {price > 0 ? "Completed" : "Free"}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500 hover:text-white hover:bg-white/10">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1a1a35] border-white/10 text-white text-sm" align="end">
                          <DropdownMenuItem className="focus:bg-purple-500/20 cursor-pointer">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-purple-500/20 cursor-pointer">Download Invoice</DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-red-500/20 text-red-400 cursor-pointer">Issue Refund</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-gray-500">
            Showing {totalSales === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, totalSales)} of {totalSales} results
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft size={15} />
            </Button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant="ghost" size="icon"
                className={`w-8 h-8 text-sm font-medium ${page === p ? "bg-purple-600 text-white hover:bg-purple-700" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            {totalPages > 3 && <span className="text-gray-600 px-1 text-sm">...</span>}
            {totalPages > 3 && (
              <Button variant="ghost" size="icon"
                className={`w-8 h-8 text-sm font-medium ${page === totalPages ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
}