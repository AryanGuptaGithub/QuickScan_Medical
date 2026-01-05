// app/admin/payments/page.tsx

"use client"

import React from "react";

import DataTable from "@/components/admin/DataTable";

export default function PaymentsPage() {
  const columns = [
    { key: "id", label: "Payment ID", sortable: true },
    { key: "bookingId", label: "Booking ID" },
    { key: "patient", label: "Patient" },
    { key: "amount", label: "Amount", sortable: true },
    { key: "method", label: "Payment Method" },
    { key: "date", label: "Date", sortable: true },
    { key: "status", label: "Status" },
  ];

  const paymentsData = [
    {
      id: "PAY1001",
      bookingId: "QS123456",
      patient: "Rahul Sharma",
      amount: "₹2,500",
      method: "Credit Card",
      date: "15 Jan 2024",
      status: "Completed",
    },
    {
      id: "PAY1002",
      bookingId: "QS123457",
      patient: "Priya Patel",
      amount: "₹3,200",
      method: "UPI",
      date: "15 Jan 2024",
      status: "Completed",
    },
    {
      id: "PAY1003",
      bookingId: "QS123458",
      patient: "Amit Kumar",
      amount: "₹800",
      method: "Net Banking",
      date: "14 Jan 2024",
      status: "Completed",
    },
    {
      id: "PAY1004",
      bookingId: "QS123459",
      patient: "Neha Singh",
      amount: "₹1,500",
      method: "Wallet",
      date: "14 Jan 2024",
      status: "Pending",
    },
    {
      id: "PAY1005",
      bookingId: "QS123460",
      patient: "Sanjay Gupta",
      amount: "₹900",
      method: "Cash",
      date: "13 Jan 2024",
      status: "Failed",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
        <p className="text-gray-600">Track and manage payment transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">₹24.5L</p>
          <p className="text-green-600 text-sm mt-1">+18% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold mt-2">₹22.8L</p>
          <p className="text-green-600 text-sm mt-1">93% success rate</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold mt-2">₹1.2L</p>
          <p className="text-yellow-600 text-sm mt-1">24 transactions</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Failed</h3>
          <p className="text-2xl font-bold mt-2">₹0.5L</p>
          <p className="text-red-600 text-sm mt-1">12 transactions</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paymentsData}
        title="Payment Transactions"
        onView={(id) => console.log("View payment:", id)}
      />
    </div>
  );
}