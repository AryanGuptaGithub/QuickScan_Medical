// app/admin/services/page.tsx
"use client";

import { useState } from 'react';
import DataTable from "@/components/admin/DataTable";
import { useAdminServices } from '@/hooks/admin/useServices';
import { FiPlus, FiSearch } from 'react-icons/fi';

export default function ServicesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: services, loading, pagination } = useAdminServices({
    page,
    search,
    category: categoryFilter !== 'all' ? categoryFilter : undefined,
  });

  const columns = [
    { key: "name", label: "Service Name", sortable: true },
    { key: "category", label: "Category" },
    { key: "originalPrice", label: "Price", sortable: true },
    { key: "bookingCount", label: "Bookings", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true },
    { key: "labCount", label: "Labs", sortable: true },
    { key: "isPopular", label: "Popular" },
  ];

  const categories = ['all', 'mri', 'ct-scan', 'x-ray', 'health-checkup', 'blood-test', 'ultrasound'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = services?.reduce((sum, service) => sum + (service.revenue || 0), 0) || 0;
  const totalBookings = services?.reduce((sum, service) => sum + (service.bookingCount || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage medical tests and services</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <FiPlus />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-16">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Services</h3>
          <p className="text-2xl font-bold mt-2">{pagination.total || 0}</p>
          <p className="text-green-600 text-sm mt-1">+3 this month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Services</h3>
          <p className="text-2xl font-bold mt-2">{services?.filter(s => s.isActive !== false).length || 0}</p>
          <p className="text-green-600 text-sm mt-1">All running</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold mt-2">{totalBookings.toLocaleString()}</p>
          <p className="text-green-600 text-sm mt-1">Across all services</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">₹{(totalRevenue / 100000).toFixed(1)}L</p>
          <p className="text-green-600 text-sm mt-1">+5% from last month</p>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={services?.map(service => ({
          id: service.id,
          name: service.name,
          category: service.category,
          originalPrice: `₹${service.originalPrice?.toLocaleString()}`,
          bookingCount: service.bookingCount,
          revenue: `₹${(service.revenue || 0).toLocaleString()}`,
          labCount: service.labCount,
          isPopular: service.isPopular ? 'Yes' : 'No',
        })) || []}
        title="Medical Services"
      />
    </div>
  );
}