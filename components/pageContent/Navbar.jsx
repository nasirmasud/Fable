"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/all-books" },
    { name: "Dashboard", href: `/dashboard/${userRole}` },
  ];

  if (pathname.includes('dashboard')) {
    return null
  }

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-[#070314] text-white border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="w-full px-6 md:px-10 lg:px-16 mx-auto">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Fable Logo" width={34} height={34} priority />
            <span className="text-2xl font-bold bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Fable
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] transition-colors ${pathname === link.href
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User / Auth */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  nativeButton={false}
                  render={
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 cursor-pointer hover:ring-2 ring-white/20 transition-all shrink-0" />
                  }
                >
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="User avatar"
                    sizes="36px"
                    fill
                    className="object-cover pointer-events-none"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-60 bg-[#0d0724] border border-white/10 p-2 rounded-xl text-white shadow-2xl"
                  align="end"
                  sideOffset={8}
                >
                  {/* User Info */}
                  <div className="px-2 py-3">
                    <p className="text-sm font-semibold truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#6344f5]/20 text-[#6344f5] uppercase tracking-wider">
                      {session.user.role || "User"}
                    </span>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <div className="py-1">
                    <DropdownMenuItem
                      render={<Link href="/dashboard" />}
                      className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg px-2 py-2"
                    >
                      <LayoutDashboard className="h-4 w-4 text-gray-400" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      render={<Link href="/profile" />}
                      className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg px-2 py-2"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <div className="py-1">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg px-2 py-2 text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="text-sm bg-[#6344f5] hover:bg-[#5032e6] px-6 py-2.5 rounded-lg text-white transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}