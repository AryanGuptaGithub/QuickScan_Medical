// components/admin/AdminHeader.tsx
"use client";

import { FiBell, FiSearch } from "react-icons/fi";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
           <h1> Admin Dashboard </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-300 hover:text-white rounded-lg border-0 bg-transparent">
            <FiBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-semibold">{user?.name || "Admin"}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}