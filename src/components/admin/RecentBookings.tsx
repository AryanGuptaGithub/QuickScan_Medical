"use client";

import { useState, useEffect } from "react";
import { FiEye, FiCheck, FiX, FiDownload, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface Booking {
  id: string;
  bookingId: string;
  patientName: string;
  patientEmail: string;
  serviceName: string;
  appointmentDate: string;
  timeSlot: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}

export default function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecentBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/bookings?limit=5&page=1");

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const result = await response.json();

      if (result.success) {
        const recentBookings = result.data.slice(0, 5).map((booking: any) => ({
          id: booking.id,
          bookingId: booking.bookingId,
          patientName: booking.patient?.name || booking.patientName,
          patientEmail: booking.patient?.email || booking.patientEmail,
          serviceName: booking.service?.name || booking.serviceName,
          appointmentDate: booking.appointmentDate,
          timeSlot: booking.timeSlot,
          totalAmount: booking.amount,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
        }));

        setBookings(recentBookings);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load recent bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRecentBookings();
  };

  const handleConfirmBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/confirm`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      toast.success("Booking confirmed");
      fetchRecentBookings();
    } catch {
      toast.error("Failed to confirm booking");
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}/cancel`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      toast.success("Booking cancelled");
      fetchRecentBookings();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "processing":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm
          border border-gray-200 rounded-xl
          hover:border-blue-300 hover:text-blue-600
          transition shadow-sm disabled:opacity-50"
        >
          <FiRefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {[
                "Booking ID",
                "Patient",
                "Service",
                "Date & Time",
                "Amount",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="py-4 px-4 text-left text-xs uppercase tracking-wide font-semibold text-gray-500"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="group border-b border-gray-100 hover:bg-blue-50/40 transition"
              >
                <td className="py-4 px-4 font-mono text-sm text-blue-600">
                  {booking.bookingId ||
                    `BK-${booking.id.slice(-6).toUpperCase()}`}
                </td>

                <td className="py-4 px-4">
                  <div className="font-medium text-gray-800">
                    {booking.patientName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.patientEmail}
                  </div>
                </td>

                <td className="py-4 px-4 font-medium">{booking.serviceName}</td>

                <td className="py-4 px-4">
                  <div className="font-medium">
                    {formatDate(booking.appointmentDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.timeSlot}
                  </div>
                </td>

                <td className="py-4 px-4 font-semibold">
                  ₹{booking.totalAmount.toLocaleString()}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <ActionBtn icon={<FiEye />} />
                    <ActionBtn icon={<FiDownload />} />

                    {booking.status === "pending" && (
                      <>
                        <ActionBtn
                          icon={<FiCheck />}
                          color="green"
                          onClick={() => handleConfirmBooking(booking.id)}
                        />
                        <ActionBtn
                          icon={<FiX />}
                          color="red"
                          onClick={() => handleCancelBooking(booking.id)}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No recent bookings found
          </div>
        )}
      </div>
    </div>
  );
}

/* Small reusable action button */
function ActionBtn({
  icon,
  onClick,
  color = "gray",
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  color?: "gray" | "green" | "red";
}) {
  const colors = {
    gray: "hover:bg-gray-300 text-gray-600",
    green: "hover:bg-green-300 text-green-600",
    red: "hover:bg-red-300 text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border-0 transition transform hover:scale-105 ${colors[color]}`}
    >
      {icon}
    </button>
  );
}
