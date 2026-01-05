"use client";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useAdminStats } from "@/hooks/useAdminStats";
import RecentBookings from "@/components/admin/RecentBookings";

export default function AdminDashboard() {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your medical platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.bookings?.total.toLocaleString() || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm">
              ↑ {stats?.bookings?.growth || "0%"} from last month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.revenue?.formatted || "₹0"}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm">
              ↑ {stats?.revenue?.growth || "0%"} from last month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium text-gray-500">Active Patients</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.patients?.total?.toLocaleString() || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm">↑ 8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium text-gray-500">Lab Centers</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.labs?.total?.toLocaleString() || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm">↑ 5% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <RecentBookings />
      </div>
    </div>
  );
}
