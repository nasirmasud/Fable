"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DASHBOARD_HOME = {
  reader: { label: "Dashboard", href: "/dashboard/reader" },
  writer: { label: "Dashboard", href: "/dashboard/writer" },
  admin: { label: "Overview", href: "/dashboard/admin" },
};

const ROUTE_LABELS = {
  "/dashboard/reader/purchased-ebooks": "Purchased Ebooks",
  "/dashboard/reader/purchase-history": "Purchase History",
  "/dashboard/reader/bookmarks": "My Bookmarks",
  "/dashboard/writer/manage-ebooks": "Manage Ebooks",
  "/dashboard/writer/add-ebook": "Add Ebook",
  "/dashboard/writer/sales-history": "Sales History",
  "/dashboard/writer/bookmarks": "My Bookmarks",
  "/dashboard/admin/manage-users": "Manage Users",
  "/dashboard/admin/manage-all-ebooks": "Manage All Ebooks",
  "/dashboard/admin/transactions": "View All Transactions",
};

function getBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "dashboard" || !segments[1]) return [];

  const role = segments[1];
  const home = DASHBOARD_HOME[role];
  if (!home) return [];

  const currentLabel = ROUTE_LABELS[pathname];
  const isHome = pathname === home.href;

  if (isHome) {
    return [{ label: home.label, href: null }];
  }

  if (currentLabel) {
    return [
      { label: home.label, href: home.href },
      { label: currentLabel, href: null },
    ];
  }

  const fallback = segments
    .slice(2)
    .join(" ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return [
    { label: home.label, href: home.href },
    { label: fallback, href: null },
  ];
}

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="px-6 pt-6 pb-2 text-sm text-gray-400 flex items-center gap-2 flex-wrap"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-600">›</span>}
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="hover:text-purple-400 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? "text-white font-medium" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
