// app/admin/reports/page.tsx
"use client";

import { useState } from 'react';
import { FiDownload, FiCalendar } from 'react-icons/fi';
import { useAdminStats } from '@/hooks/useAdminStats';

export default function ReportsPage() {
  const { stats, loading } = useAdminStats();
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('this_month');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and download detailed reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generate Report Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Generate New Report</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="revenue">Revenue Report</option>
                <option value="bookings">Booking Report</option>
                <option value="patients">Patient Report</option>
                <option value="services">Service Performance</option>
                <option value="labs">Lab Performance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
              <FiDownload />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-xl font-bold mt-1">{stats?.bookings?.total?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold mt-1">{stats?.revenue?.formatted || '₹0'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Active Patients</p>
              <p className="text-xl font-bold mt-1">{stats?.patients?.total?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Lab Centers</p>
              <p className="text-xl font-bold mt-1">{stats?.labs?.total?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New bookings today</p>
              <p className="text-sm text-gray-500">{stats?.bookings?.today || 0} bookings</p>
            </div>
            <span className="text-green-600 font-medium">+{stats?.bookings?.growth || '0%'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Revenue this month</p>
              <p className="text-sm text-gray-500">{stats?.revenue?.thisMonth?.toLocaleString() || 0}</p>
            </div>
            <span className="text-green-600 font-medium">+{stats?.revenue?.growth || '0%'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}