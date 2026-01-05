// app/admin/labs/page.tsx
"use client";

import { useState } from 'react';
import DataTable from "@/components/admin/DataTable";
import { useAdminLabs } from '@/hooks/admin/useLabs';
import { FiSearch } from 'react-icons/fi';

export default function LabsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const { data: labs, loading, pagination } = useAdminLabs({
    page,
    search,
    city: cityFilter !== 'all' ? cityFilter : undefined,
  });

  const columns = [
    { key: "name", label: "Lab Name", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "phone", label: "Contact" },
    { key: "services", label: "Services" },
    { key: "bookingCount", label: "Bookings", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true },
    { key: "isActive", label: "Status" },
  ];

  // Extract unique cities for filter
  const uniqueCities = Array.from(new Set(labs?.map(lab => lab.city) || []));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lab Centers Management</h1>
        <p className="text-gray-600">Manage partner lab centers and diagnostics</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-16">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search labs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Labs</h3>
          <p className="text-2xl font-bold mt-2">{pagination.total || 0}</p>
          <p className="text-green-600 text-sm mt-1">+5% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Labs</h3>
          <p className="text-2xl font-bold mt-2">
            {labs?.filter(l => l.isActive).length || 0}
          </p>
          <p className="text-green-600 text-sm mt-1">+4% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Under Review</h3>
          <p className="text-2xl font-bold mt-2">
            {labs?.filter(l => !l.isActive).length || 0}
          </p>
          <p className="text-yellow-600 text-sm mt-1">+2 from last month</p>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={labs?.map(lab => ({
          id: lab.id,
          name: lab.name,
          city: lab.city,
          phone: lab.phone,
          services: lab.services?.slice(0, 2).join(', ') + (lab.services?.length > 2 ? '...' : ''),
          bookingCount: lab.bookingCount,
          revenue: `₹${(lab.revenue || 0).toLocaleString()}`,
          isActive: lab.isActive ? 'Active' : 'Inactive',
        })) || []}
        title="Partner Labs"
      />
    </div>
  );
}