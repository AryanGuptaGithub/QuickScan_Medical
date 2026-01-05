// components/admin/StatsGrid.tsx
"use client";

import { 
  FiCalendar, 
  FiDollarSign, 
  FiUsers, 
  FiHome,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiActivity
} from "react-icons/fi";

export default function StatsGrid() {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,245",
      change: "+12%",
      icon: FiCalendar,
      color: "bg-blue-500",
      trend: "up"
    },
    {
      title: "Total Revenue",
      value: "₹24.5L",
      change: "+18%",
      icon: FiDollarSign,
      color: "bg-green-500",
      trend: "up"
    },
    {
      title: "Active Patients",
      value: "845",
      change: "+8%",
      icon: FiUsers,
      color: "bg-purple-500",
      trend: "up"
    },
    {
      title: "Lab Centers",
      value: "950",
      change: "+5%",
      icon: FiHome,
      color: "bg-orange-500",
      trend: "up"
    },
    {
      title: "Completed",
      value: "1,100",
      change: "+15%",
      icon: FiCheckCircle,
      color: "bg-teal-500",
      trend: "up"
    },
    {
      title: "Pending",
      value: "24",
      change: "-3%",
      icon: FiClock,
      color: "bg-yellow-500",
      trend: "down"
    },
    {
      title: "Growth Rate",
      value: "24.5%",
      change: "+4.2%",
      icon: FiTrendingUp,
      color: "bg-pink-500",
      trend: "up"
    },
    {
      title: "Avg. Daily",
      value: "42",
      change: "+7%",
      icon: FiActivity,
      color: "bg-indigo-500",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = !stat.change.startsWith('-');
        
        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs mt-1 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '↗' : '↘'} {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="text-white text-lg" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}