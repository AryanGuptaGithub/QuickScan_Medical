"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { FiSearch, FiFilter } from "react-icons/fi";

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: bookings,
    loading,
    pagination,
  } = useAdminBookings({
    page,
    search,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const columns = [
    { key: "bookingId", label: "Booking ID", sortable: true },
    { key: "patient.name", label: "Patient", sortable: true },
    { key: "service.name", label: "Service" },
    { key: "appointmentDate", label: "Date & Time", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "status", label: "Status" },
  ];

  const handleView = (id: string) => console.log("View booking:", id);
  const handleEdit = (id: string) => console.log("Edit booking:", id);
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      console.log("Delete booking:", id);
    }
  };

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>

        <div className="h-72 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  /* -------------------- PAGE -------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Bookings Management
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage all patient bookings
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-15 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search booking ID, patient, email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200
              rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={pagination.total || 0}
          trend="+12%"
        />
        <StatCard
          title="Confirmed"
          value={bookings?.filter((b) => b.status === "confirmed").length || 0}
          trend="+15%"
          positive
        />
        <StatCard
          title="Pending"
          value={bookings?.filter((b) => b.status === "pending").length || 0}
          trend="-3%"
        />
        <StatCard
          title="Revenue"
          value={`₹${bookings
            ?.reduce((sum, b) => sum + (b.amount || 0), 0)
            .toLocaleString()}`}
          trend="+18%"
          positive
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <DataTable
          columns={columns}
          data={
            bookings?.map((booking) => ({
              id: booking.id,
              bookingId: booking.bookingId,
              "patient.name": booking.patient?.name || booking.patientName,
              "service.name": booking.service?.name || booking.serviceName,
              appointmentDate: new Date(
                booking.appointmentDate
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              amount: `₹${booking.amount?.toLocaleString()}`,
              status: booking.status,
            })) || []
          }
          title="All Bookings"
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

/* -------------------- STAT CARD -------------------- */
function StatCard({
  title,
  value,
  trend,
  positive = false,
}: {
  title: string;
  value: string | number;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-2 text-gray-900">{value}</p>
      <p
        className={`text-sm mt-1 ${
          positive ? "text-green-600" : "text-red-500"
        }`}
      >
        {trend} from last month
      </p>
    </div>
  );
}
