"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiLoader,
  FiAlertCircle,
  FiDownload,
  FiRefreshCw,
  FiXCircle,
} from "react-icons/fi";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching bookings for user...");
      const response = await fetch("/api/bookings?limit=20");
      const result = await response.json();

      console.log("Bookings API response:", result);

      if (result.success) {
        setBookings(result.data || []);
      } else {
        setError(result.message || "Failed to fetch bookings");
      }
    } catch (error: any) {
      console.error("Failed to fetch bookings:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return "";
    return timeSlot.replace("-", " to ");
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancellingId(bookingId);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Booking cancelled successfully");
        fetchBookings(); // Refresh the list
      } else {
        alert(`Failed to cancel booking: ${result.message}`);
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleReschedule = (bookingId: string) => {
    // For now, just redirect to booking page
    router.push(`/booking?reschedule=${bookingId}`);
  };

  const downloadReceipt = (booking: any) => {
    const receiptContent = `
      QuickScan Medical Receipt
      -------------------------
      Booking ID: ${booking.bookingId}
      Date: ${new Date().toLocaleDateString()}
      
      Patient: ${booking.patientName}
      Service: ${booking.serviceName}
      Lab: ${booking.labName}
      Appointment: ${formatDate(booking.appointmentDate)} at ${formatTimeSlot(
      booking.timeSlot
    )}
      
      Amount: ₹${booking.totalAmount}
      Payment Status: ${booking.paymentStatus}
      Booking Status: ${booking.status}
      
      Thank you for choosing QuickScan!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${booking.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="mt-40 pb-20">
      <div className="container-custom px-4">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session.user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your appointments, reports, and profile
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <FiUser className="text-blue-600 text-2xl" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{session.user?.name}</h3>
                  <p className="text-gray-600 text-sm">{session.user?.email}</p>
                  <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 text-center rounded-full mt-1">
                    {session.user?.role === "admin"
                      ? "Administrator"
                      : "Member"}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left flex items-center p-3 border-0 rounded-lg transition duration-300 ${
                    activeTab === "overview"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiCalendar className="mr-3" />
                  Overview
                </button>

                <button
                  onClick={() => {
                    setActiveTab("appointments");
                    fetchBookings();
                  }}
                  className={`w-full text-left flex items-center p-3 border-0 rounded-lg transition duration-300 ${
                    activeTab === "appointments"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiClock className="mr-3" />
                  My Appointments
                </button>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center p-3 no-underline rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  <FiUser className="mr-3" />
                  Profile Settings
                </Link>

                <button
                  onClick={() => setActiveTab("reports")}
                  className={`w-full text-left flex items-center p-3 border-0 rounded-lg transition duration-300 ${
                    activeTab === "reports"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiFileText className="mr-3" />
                  My Reports
                </button>

                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full text-left flex items-center border-0 p-3 rounded-lg transition duration-300 ${
                    activeTab === "billing"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiDollarSign className="mr-3" />
                  Billing
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 rounded-lg border-0 bg-red-50 text-red-600 hover:bg-red-100 transition duration-300 w-full"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <div className="text-sm opacity-90">Total Bookings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ₹
                    {bookings.reduce(
                      (sum, booking) => sum + (booking.totalAmount || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm opacity-90">Total Spent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "completed").length}
                  </div>
                  <div className="text-sm opacity-90">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div>
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 mb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Welcome back, {session.user?.name}!
                      </h2>
                      <p className="text-gray-600">
                        You have{" "}
                        {
                          bookings.filter(
                            (b) =>
                              b.status === "confirmed" || b.status === "pending"
                          ).length
                        }{" "}
                        upcoming appointments.
                      </p>
                    </div>
                    <Button href="/booking" variant="primary" className="no-underline">
                      Book New Test
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                      <FiAlertCircle className="text-red-600 mr-3" />
                      <div>
                        <p className="text-red-800 font-medium">{error}</p>
                        <button
                          onClick={fetchBookings}
                          className="text-red-600 hover:text-red-800 text-sm mt-1 flex items-center"
                        >
                          <FiRefreshCw className="mr-1" />
                          Try again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Upcoming Appointments</h3>
                    <button
                      onClick={fetchBookings}
                      className="text-blue-600 py-2 px-4 rounded-2xl border-blue-200 bg-blue-50 text-blue-700  hover:text-blue-700 font-semibold flex items-center"
                    >
                      <FiRefreshCw className="mr-2" />
                      Refresh
                    </button>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings
                        .filter((b) =>
                          ["pending", "confirmed"].includes(b.status)
                        )
                        .slice(0, 5)
                        .map((booking) => (
                          <div
                            key={booking._id || booking.bookingId}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-300"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-bold text-lg">
                                  {booking.serviceName}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  {formatDate(booking.appointmentDate)} at{" "}
                                  {formatTimeSlot(booking.timeSlot)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Lab:</span>{" "}
                                  {booking.labName || booking.labId?.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">Patient:</span>{" "}
                                  {booking.patientName}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  ₹{booking.totalAmount}
                                </div>
                                <div
                                  className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${getStatusColor(
                                    booking.status
                                  )}`}
                                >
                                  {booking.status?.toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-500 mt-2">
                                  ID: {booking.bookingId}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {booking.status !== "cancelled" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleReschedule(booking.bookingId)
                                    }
                                    className="px-4 py-2 bg-blue-100 border-0 text-blue-700 hover:bg-blue-200 rounded-lg text-sm transition"
                                  >
                                    Reschedule
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCancelBooking(booking.bookingId)
                                    }
                                    disabled={
                                      cancellingId === booking.bookingId
                                    }
                                    className="px-4 py-2 border-0 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm transition disabled:opacity-50"
                                  >
                                    {cancellingId === booking.bookingId ? (
                                      <FiLoader className="animate-spin inline mr-1" />
                                    ) : (
                                      <FiXCircle className="inline mr-1" />
                                    )}
                                    Cancel
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => downloadReceipt(booking)}
                                className="px-4 py-2 border-0 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm transition"
                              >
                                <FiDownload className="inline mr-1" />
                                Receipt
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiCalendar className="text-4xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        No upcoming appointments
                      </p>
                      <Button href="/booking" variant="primary">
                        Book Your First Test
                      </Button>
                    </div>
                  )}
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6">Recent Reports</h3>

                  {bookings.filter((b) => b.status === "completed").length >
                  0 ? (
                    <div className="space-y-4">
                      {bookings
                        .filter((b) => b.status === "completed")
                        .slice(0, 3)
                        .map((booking) => (
                          <div
                            key={booking._id || booking.bookingId}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bold">
                                  {booking.serviceName}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Completed on{" "}
                                  {formatDate(
                                    booking.updatedAt || booking.createdAt
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Patient: {booking.patientName}
                                </div>
                              </div>
                              <div className="space-x-2">
                                <button
                                  onClick={() => downloadReceipt(booking)}
                                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm"
                                >
                                  Download Report
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiFileText className="text-4xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No reports available yet</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Your reports will appear here once tests are completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">All Appointments</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchBookings}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center"
                    >
                      <FiRefreshCw className="mr-2" />
                      Refresh
                    </button>
                    <Button href="/booking" variant="primary">
                      Book New
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <FiAlertCircle className="text-red-600 mr-3" />
                      <span className="text-red-800">{error}</span>
                    </div>
                  </div>
                )}

                {bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Booking ID</th>
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4">Date & Time</th>
                          <th className="text-left py-3 px-4">Patient</th>
                          <th className="text-left py-3 px-4">Amount</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr
                            key={booking._id || booking.bookingId}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <span className="font-mono text-sm">
                                {booking.bookingId}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium">
                                {booking.serviceName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.labName}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{formatDate(booking.appointmentDate)}</div>
                              <div className="text-sm text-gray-600">
                                {formatTimeSlot(booking.timeSlot)}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{booking.patientName}</div>
                              <div className="text-sm text-gray-600">
                                {booking.patientPhone}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-bold">
                              ₹{booking.totalAmount}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                  booking.status
                                )}`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => downloadReceipt(booking)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                  title="Download Receipt"
                                >
                                  <FiDownload />
                                </button>
                                {booking.status !== "cancelled" &&
                                  booking.status !== "completed" && (
                                    <button
                                      onClick={() =>
                                        handleCancelBooking(booking.bookingId)
                                      }
                                      disabled={
                                        cancellingId === booking.bookingId
                                      }
                                      className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                                      title="Cancel Booking"
                                    >
                                      {cancellingId === booking.bookingId ? (
                                        <FiLoader className="animate-spin" />
                                      ) : (
                                        <FiXCircle />
                                      )}
                                    </button>
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No appointments found</p>
                    <Button href="/booking" variant="primary">
                      Book Your First Test
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reports" && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">My Reports</h2>
                <div className="text-center py-12">
                  <FiFileText className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Reports feature coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    You'll be able to view and download all your medical reports
                    here
                  </p>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Billing History</h2>
                <div className="text-center py-12">
                  <FiDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Billing feature coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    View your payment history and download invoices
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
