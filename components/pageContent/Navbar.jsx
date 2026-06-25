"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FloatingParticles from "../tools/FloatingParticles";


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/all-books" },
    { name: "Dashboard", href: `/dashboard/${userRole}` },
  ];

  if (pathname.includes('dashboard')) {
    return null;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setDrawerOpen(false);
    if (!session) {
      router.push("/login");
    } else {
      router.push(`/dashboard/${userRole}`);
    }
  };

  return (
    <>
      <nav className="overflow-hidden w-full bg-[#070314] text-white border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
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
              {navLinks.map((link) =>
                link.name === "Dashboard" ? (
                  <button
                    key={link.name}
                    onClick={handleDashboardClick}
                    className={`text-[15px] transition-colors ${pathname.startsWith("/dashboard")
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </button>
                ) : (
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
                )
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />
                ) : (
                  <div className="w-4.5 h-4.5" />
                )}
              </button>

              {/* Desktop: User / Auth */}
              <div className="hidden md:flex items-center gap-4">
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
                          render={<Link href={`/dashboard/${userRole}`} />}
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
                  <>
                    <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="text-sm bg-[#6344f5] hover:bg-[#5032e6] px-6 py-2.5 rounded-lg text-white transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile: Hamburger */}
              <button
                className="md:hidden p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#0a0520] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setDrawerOpen(false)}>
            <Image src="/logo.png" alt="Fable Logo" width={28} height={28} priority />
            <span className="text-xl font-bold bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Fable
            </span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-1 px-4 py-5">
          {navLinks.map((link) =>
            link.name === "Dashboard" ? (
              <button
                key={link.name}
                onClick={handleDashboardClick}
                className={`w-full text-left px-4 py-3 rounded-xl text-[15px] transition-colors ${pathname.startsWith("/dashboard")
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-xl text-[15px] transition-colors ${pathname === link.href
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        {/* User Section */}
        <div className="px-4 py-5 flex flex-col gap-2">
          {session ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-1">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="User avatar"
                    sizes="36px"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                </div>
              </div>

              <Link
                href={`/dashboard/${userRole}`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-gray-400" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/profile"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <User className="h-4 w-4 text-gray-400" />
                <span>Profile</span>
              </Link>

              <div className="mx-0 border-t border-white/10 my-1" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setDrawerOpen(false)}
                className="block text-center px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setDrawerOpen(false)}
                className="block text-center px-4 py-3 rounded-xl text-sm bg-[#6344f5] hover:bg-[#5032e6] text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}