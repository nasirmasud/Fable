// DB থেকে ডেটা নেওয়ার জন্য শুধু এই লাইনটা replace করো:
// js// এইটা সরাও:
// const history = MOCK_HISTORY;

// // এইটা দাও:
// const history = await getPurchaseHistory(readerEmail);


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

function FilterBar() {
  const tabs = ["All", "Completed", "Pending", "Refunded", "Failed"];
  return (
    <div className="px-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0
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
  );
}

// ── Mock data — replace with real DB call ───────────────────────────────────
const MOCK_HISTORY = [
  {
    _id: "txn_001",
    transactionId: "TXN-2024-00123",
    book: { title: "The Lost Kingdom", genre: "Fantasy", coverPreview: null },
    author: "Luna Everhart",
    purchasedAt: "2024-05-20T10:32:00Z",
    price: 9.99,
    paymentMethod: "Visa •••• 4242",
    status: "completed",
  },
  {
    _id: "txn_002",
    transactionId: "TXN-2024-00118",
    book: { title: "Beyond the Stars", genre: "Sci-Fi", coverPreview: null },
    author: "Orion Blake",
    purchasedAt: "2024-05-18T15:14:00Z",
    price: 5.99,
    paymentMethod: "PayPal",
    status: "completed",
  },
  {
    _id: "txn_003",
    transactionId: "TXN-2024-00104",
    book: { title: "Love & Other Worlds", genre: "Romance", coverPreview: null },
    author: "Aurora West",
    purchasedAt: "2024-05-15T09:05:00Z",
    price: 3.99,
    paymentMethod: "Visa •••• 4242",
    status: "completed",
  },
  {
    _id: "txn_004",
    transactionId: "TXN-2024-00098",
    book: { title: "Whispers in the Dark", genre: "Horror", coverPreview: null },
    author: "M. R. Shadow",
    purchasedAt: "2024-05-10T20:47:00Z",
    price: 4.99,
    paymentMethod: "Mastercard •••• 8891",
    status: "refunded",
  },
  {
    _id: "txn_005",
    transactionId: "TXN-2024-00089",
    book: { title: "Beyond the Horizon", genre: "Adventure", coverPreview: null },
    author: "Ethan Walker",
    purchasedAt: "2024-05-05T13:22:00Z",
    price: 4.99,
    paymentMethod: "Visa •••• 4242",
    status: "completed",
  },
  {
    _id: "txn_006",
    transactionId: "TXN-2024-00071",
    book: { title: "The Dragon's Legacy", genre: "Fantasy", coverPreview: null },
    author: "Luna Everhart",
    purchasedAt: "2024-05-01T08:10:00Z",
    price: 6.99,
    paymentMethod: "PayPal",
    status: "pending",
  },
];

export default function PurchaseHistory() {
  // Replace MOCK_HISTORY with: const history = await getPurchaseHistory(readerEmail);
  const history = MOCK_HISTORY;

  const totalTransactions = history.length;
  const totalSpent = history
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + (t.price ?? 0), 0);
  const thisMonth = history.filter((t) => {
    const d = new Date(t.purchasedAt);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;
  const refunds = history.filter((t) => t.status === "refunded").length;

  return (
    <div className="bg-[#0d0d1a] text-white pb-10 min-h-screen">

      {/* Hero Banner */}
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
            <h1 className="text-2xl font-bold">Purchase History</h1>
          </div>
          <p className="text-purple-200/70 text-sm leading-relaxed">
            View all your past transactions and<br />payment details in one place.
          </p>
        </div>

        {/* Decorative right side */}
        <div className="hidden md:flex items-center gap-3 relative z-10 mr-8 opacity-30">
          <div className="flex flex-col gap-2">
            <div className="w-32 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
            <div className="w-24 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
            <div className="w-28 h-8 rounded-lg bg-purple-400/20 border border-purple-300/20" />
          </div>
          <Receipt size={48} className="text-purple-200/50" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="px-6 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Receipt} label="Total Transactions" value={totalTransactions} color="purple" />
        <StatCard icon={TrendingUp} label="Total Spent" value={`$${totalSpent.toFixed(2)}`} color="green" />
        <StatCard icon={CalendarDays} label="This Month" value={thisMonth} color="blue" />
        <StatCard icon={BookMarked} label="Refunds" value={refunds} color="amber" />
      </div>

      {/* Filter Tabs + Search */}
      <FilterBar />

      {/* Table */}
      <div className="mx-6 bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden">

        {/* Table header */}
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

        {/* Rows */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Receipt size={36} className="text-gray-700" />
            <p className="text-sm text-gray-600">No transactions found.</p>
          </div>
        ) : (
          history.map((txn, idx) => (
            <div
              key={txn._id ?? idx}
              className="grid items-center gap-x-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
              style={{ gridTemplateColumns: "80px 2fr 1fr 1.2fr 80px 1.1fr 110px 60px" }}
            >
              {/* Cover */}
              <div className="w-14 h-20 rounded-lg overflow-hidden bg-[#1a1035] border border-white/5 relative shrink-0">
                {txn.book?.coverPreview ? (
                  <Image
                    src={txn.book.coverPreview}
                    alt={txn.book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={16} className="text-purple-500/30" />
                  </div>
                )}
              </div>

              {/* Book title + author + genre */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {txn.book?.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{txn.author}</p>
                <div className="mt-1.5">
                  <GenreBadge genre={txn.book?.genre} />
                </div>
              </div>

              {/* Transaction ID */}
              <div className="text-xs text-gray-400 font-mono truncate">{txn.transactionId}</div>

              {/* Date & Time */}
              <div>
                <p className="text-xs text-gray-300">{formatDate(txn.purchasedAt)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatTime(txn.purchasedAt)}</p>
              </div>

              {/* Amount */}
              <div className="text-sm font-semibold text-white">
                {txn.status === "refunded"
                  ? <span className="text-purple-400">-${Number(txn.price).toFixed(2)}</span>
                  : `$${Number(txn.price).toFixed(2)}`}
              </div>

              {/* Payment method */}
              <div className="text-xs text-gray-400 truncate">{txn.paymentMethod}</div>

              {/* Status */}
              <div>
                <PaymentStatusBadge status={txn.status} />
              </div>

              {/* Invoice download */}
              <div className="flex justify-end">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/7 text-gray-400 hover:bg-white/5 hover:text-purple-400 transition-colors"
                  title="Download Invoice"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-gray-500">Showing 1 to 6 of 24 transactions</p>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === 1
                  ? "bg-purple-600 text-white"
                  : "border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {p}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <select className="bg-[#13132a] border border-white/5 rounded-lg px-3 py-1.5 text-gray-300 text-xs outline-none focus:border-purple-500/50 cursor-pointer">
              <option>6 per page</option>
              <option>12 per page</option>
              <option>24 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}


