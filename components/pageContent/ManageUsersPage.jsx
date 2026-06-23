"use client";

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
import { deleteUser } from "@/lib/actions/users";
import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserMinus,
  UserPlus,
  Users
} from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 8;

// ── Sub-components ─────────────────────────────────────────
function RoleBadge({ role }) {
  return (
    <Badge variant="outline" className={`text-xs px-2 py-0 border-0 ${role === "Writer" ? "bg-purple-500/15 text-purple-400" : "bg-blue-500/15 text-blue-400"}`}>
      {role}
    </Badge>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: "bg-green-500/15 text-green-400",
    Inactive: "bg-gray-500/15 text-gray-400",
    Banned: "bg-red-500/15 text-red-400",
  };
  return (
    <Badge variant="outline" className={`text-xs px-2 py-0 border-0 ${map[status]}`}>
      {status}
    </Badge>
  );
}

// ── Row Action Menu ────────────────────────────────────────
function ActionMenu({ user, onAction, pending }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 text-gray-600 hover:text-gray-300 hover:bg-white/5"
        onClick={() => setOpen((o) => !o)}
        disabled={pending}
      >
        <MoreHorizontal size={16} />
      </Button>
      {open && (
        <div
          className="absolute right-0 top-9 z-20 bg-[#1a1a35] border border-white/10 rounded-xl shadow-2xl py-1 w-44"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50"
            disabled={pending}
            onClick={() => { onAction("ban", user); setOpen(false); }}
          >
            {user.status === "Banned"
              ? <><UserCheck size={14} className="text-green-400" /> Unban User</>
              : <><Ban size={14} className="text-red-400" /> Ban User</>
            }
          </button>
          <div className="border-t border-white/5 my-1" />
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            disabled={pending}
            onClick={() => { onAction("delete", user); setOpen(false); }}
          >
            <Trash2 size={14} /> Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function ManageUsersPage({ allUsers }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(
    (allUsers ?? []).map((u) => ({
      ...u,
      id: u._id ? String(u._id) : String(u.id),
    }))
  );
  const [pendingIds, setPendingIds] = useState(new Set());
  const [error, setError] = useState(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setPending = (id, isPending) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (isPending) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleAction = async (type, target) => {
    setError(null);
    setPending(target.id, true);

    try {
      if (type === "ban") {
        const newStatus = target.status === "Banned" ? "Active" : "Banned";
        setUsers((prev) =>
          prev.map((u) => (u.id === target.id ? { ...u, status: newStatus } : u))
        );
      } else if (type === "delete") {
        await deleteUser(target.id);
        setUsers((prev) => prev.filter((u) => u.id !== target.id));
      }
    } catch (err) {
      console.error(`Failed to ${type} user ${target.id}:`, err);
      setError("Failed to Delete Try Again");
    } finally {
      setPending(target.id, false);
    }
  };

  const stats = [
    { icon: Users, label: "Total Users", value: users.length, color: "bg-purple-500/20 text-purple-400" },
    { icon: UserPlus, label: "Writers", value: users.filter((u) => u.role === "Writer").length, color: "bg-blue-500/20 text-blue-400" },
    { icon: UserCheck, label: "Active", value: users.filter((u) => u.status === "Active").length, color: "bg-green-500/20 text-green-400" },
    { icon: UserMinus, label: "Banned", value: users.filter((u) => u.status === "Banned").length, color: "bg-red-500/20 text-red-400" },
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
          <h1 className="text-2xl font-bold text-white">Manage Users</h1>
          <p className="text-gray-400 text-sm mt-1">View, filter, and manage all registered users.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm h-9 px-4 rounded-xl hidden sm:flex items-center gap-2">
          <UserPlus size={15} /> Invite User
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-white text-base font-semibold flex-1">All Users</CardTitle>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search name or email…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full sm:w-56 h-9 pl-8 pr-3 bg-[#0d0d1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-500 flex-shrink-0" />
              <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setPage(1); }}>
                <SelectTrigger className="w-28 h-9 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                  <SelectItem value="All" className="text-xs focus:bg-purple-500/20 focus:text-white">All Roles</SelectItem>
                  <SelectItem value="Writer" className="text-xs focus:bg-purple-500/20 focus:text-white">Writers</SelectItem>
                  <SelectItem value="Reader" className="text-xs focus:bg-purple-500/20 focus:text-white">Readers</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-28 h-9 bg-[#0d0d1a] border-white/10 text-white text-xs focus:ring-purple-500 focus:ring-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                  <SelectItem value="All" className="text-xs focus:bg-purple-500/20 focus:text-white">All Status</SelectItem>
                  <SelectItem value="Active" className="text-xs focus:bg-purple-500/20 focus:text-white">Active</SelectItem>
                  <SelectItem value="Inactive" className="text-xs focus:bg-purple-500/20 focus:text-white">Inactive</SelectItem>
                  <SelectItem value="Banned" className="text-xs focus:bg-purple-500/20 focus:text-white">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1.5fr_80px_80px_90px_90px_36px] gap-3 text-xs text-gray-500 uppercase tracking-wide pb-3 border-b border-white/5">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Books</span>
            <span>Joined</span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.04]">
            {paginated.length === 0 ? (
              <div className="py-16 text-center">
                <Users size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No users match your filters.</p>
              </div>
            ) : paginated.map((user) => (
              <div
                key={user.id}
                className={`grid grid-cols-[2fr_1.5fr_80px_80px_90px_90px_36px] gap-3 items-center py-3 ${pendingIds.has(user.id) ? "opacity-50" : ""}`}
              >
                {/* Name */}
                <p className="text-sm font-medium text-white truncate">{user.name}</p>

                {/* Email */}
                <p className="text-sm text-gray-400 truncate">{user.email}</p>

                {/* Role */}
                <RoleBadge role={user.role} />

                {/* Status */}
                <StatusBadge status={user.status} />

                {/* Books */}
                <p className="text-sm text-gray-300">{user.books > 0 ? user.books : <span className="text-gray-600">—</span>}</p>

                {/* Joined */}
                <p className="text-xs text-gray-500">{user.joined}</p>

                {/* Actions */}
                <ActionMenu user={user} onAction={handleAction} pending={pendingIds.has(user.id)} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} users
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-gray-500 hover:text-white hover:bg-white/5 disabled:opacity-30"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant="ghost"
                    size="icon"
                    className={`w-8 h-8 text-sm ${p === page ? "bg-purple-500/20 text-purple-300" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
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