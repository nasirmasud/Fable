"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaBookmark, FaChartLine, FaHistory, FaMoneyBill, FaUser, FaUsers } from "react-icons/fa";

const DashboardItems = {
  reader: [
    { icon: FaChartLine, label: "Dashboard", link: "/dashboard/reader" },
    { icon: FaBook, label: "Purchased Ebooks", link: "/dashboard/reader/purchased-ebooks" },
    { icon: FaHistory, label: "Purchase History", link: "/dashboard/reader/purchase-history" },
    { icon: FaBookmark, label: "My Bookmarks", link: "/dashboard/reader/bookmarks" },
    { icon: FaUser, label: "Profile", link: "/dashboard/reader/profile" },
  ],
  writer: [
    { icon: FaChartLine, label: "Dashboard", link: "/dashboard/writer" },
    { icon: FaBook, label: "Manage Ebooks", link: "/dashboard/writer/manage-ebooks" },
    { icon: FaBook, label: "Add Ebook", link: "/dashboard/writer/add-ebook" },
    { icon: FaMoneyBill, label: "Sales History", link: "/dashboard/writer/sales-history" },
    { icon: FaBookmark, label: "My Bookmarks", link: "/dashboard/writer/bookmarks" },
  ],
  admin: [
    { icon: FaChartLine, label: "Overview", link: "/dashboard/admin" },
    { icon: FaUsers, label: "Manage Users", link: "/dashboard/admin/manage-users" },
    { icon: FaBook, label: "Manage All Ebooks", link: "/dashboard/admin/manage-all-ebooks" },
    { icon: FaMoneyBill, label: "View All Transactions", link: "/dashboard/admin/transactions" },
  ],
};

function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image src="/logo.png" alt="Fable Logo" width={34} height={34} priority sizes="44px" />
      <span className="text-2xl font-bold bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
        Fable
      </span>
    </Link>
  );
}

function SidebarHeader({ onClose }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-6">
        <AppLogo />
        {onClose && (
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white transition-colors">
          </button>
        )}
      </div>
      <div className="px-6 mb-4">
        <div className="h-px bg-white/10" />
      </div>
    </div>
  );
}

function NavLinks({ pathname, items, onClose }) {
  return (
    <div className="flex flex-col gap-1 px-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.link);
        return (
          <Link
            key={item.label}
            href={item.link}
            onClick={onClose}
            className={`flex items-center gap-4 h-12 px-4 rounded-lg transition-all ${isActive ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <Icon size={20} className="shrink-0" />
            <span className="text-[15px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

function SidebarUser({ session }) {
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  if (!session) return null;

  return (
    <div className="border-t border-white/10 p-4 bg-white/2">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10">
          <Image src={session.user.image || "/default-avatar.png"} alt={session.user.name || "User"} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
          <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
        </div>
      </div>
      <div className="mt-3">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-[#6344f5]/20 text-[#6344f5]">
          {session.user.role}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link href={`/dashboard/${session.user.role}/profile`} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white">
          <User size={16} /> Profile
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role || "reader";
  const navItems = DashboardItems[role] || [];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isPending) return null;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="md:hidden fixed top-4 left-4 z-30 p-2 bg-[#070314] border border-white/10 text-white rounded-lg">
        <Menu size={30} />
      </button>

      {isOpen && <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />}

      <aside className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed top-0 left-0 h-full w-64 bg-[#070314] border-r border-white/10 z-50 flex flex-col transition-transform duration-300`}>
        <SidebarHeader onClose={() => setIsOpen(false)} />
        <div className="flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} items={navItems} onClose={() => setIsOpen(false)} />
        </div>
        <SidebarUser session={session} />
      </aside>
    </>
  );
}