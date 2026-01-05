// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { signOut } from "next-auth/react";

const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Bookings", href: "/admin/bookings", icon: FiCalendar },
  { name: "Patients", href: "/admin/patients", icon: FiUsers },
  { name: "Labs", href: "/admin/labs", icon: FiBriefcase },
  { name: "Services", href: "/admin/services", icon: FiFileText },
  { name: "Payments", href: "/admin/payments", icon: FiDollarSign },
  { name: "Reports", href: "/admin/reports", icon: FiBarChart2 },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-3 no-underline">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">QS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">QuickScan Admin</h1>
            <p className="text-xs text-gray-400">Medical Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg no-underline ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0  right-0 p-4 border-t border-gray-800">
       

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center space-x-3 px-4 py-3 border-0 text-black hover:text-white transition-colors duration-300 hover:bg-red-800 rounded-lg w-full"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
