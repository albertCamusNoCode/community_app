"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/my-communities", icon: Users, label: "Communities" },
    { href: "/dashboard/events", icon: Calendar, label: "Events" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-background border-t"
      style={{ zIndex: 50 }}
      data-oid="2voq0a3"
    >
      <div
        className="container mx-auto flex justify-around items-center h-16"
        data-oid="5u:17t7"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname === item.href ? "text-primary" : "text-gray-500"
            }`}
            data-oid="-j4cois"
          >
            <item.icon className="w-6 h-6" data-oid="p704p7k" />
            <span className="text-xs mt-1" data-oid="r:iv3sm">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
