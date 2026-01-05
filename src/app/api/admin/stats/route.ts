// app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/database';
import Booking from '@/lib/models/Booking';
import User from '@/lib/models/User';
import Service from '@/lib/models/Service';
import Lab from '@/lib/models/Lab';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate admin
    const session = await auth();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // 2. Calculate date ranges
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // 3. Fetch all stats in parallel
    const [
      totalBookings,
      bookingsThisMonth,
      bookingsLastMonth,
      totalRevenue,
      revenueThisMonth,
      revenueLastMonth,
      completedBookings,
      pendingBookings,
      totalPatients,
      totalLabs,
      todayBookings,
      yesterdayBookings,
    ] = await Promise.all([
      // Total bookings
      Booking.countDocuments(),
      
      // This month bookings
      Booking.countDocuments({
        createdAt: { $gte: startOfMonth }
      }),
      
      // Last month bookings
      Booking.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
      }),
      
      // Total revenue
      Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // This month revenue
      Booking.aggregate([
        { 
          $match: { 
            paymentStatus: 'paid',
            createdAt: { $gte: startOfMonth }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Last month revenue
      Booking.aggregate([
        { 
          $match: { 
            paymentStatus: 'paid',
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Completed bookings
      Booking.countDocuments({ status: 'completed' }),
      
      // Pending bookings
      Booking.countDocuments({ status: { $in: ['pending', 'confirmed'] } }),
      
      // Total patients (users with role 'user')
      User.countDocuments({ role: 'user' }),
      
      // Total labs
      Lab.countDocuments(),
      
      // Today's bookings
      Booking.countDocuments({
        appointmentDate: { $gte: startOfToday }
      }),
      
      // Yesterday's bookings for comparison
      Booking.countDocuments({
        appointmentDate: { 
          $gte: new Date(new Date().setDate(today.getDate() - 1)),
          $lt: startOfToday
        }
      }),
    ]);

    // 4. Calculate percentages
    const bookingGrowth = bookingsLastMonth > 0 
      ? ((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth * 100).toFixed(1)
      : '100';
    
    const revenueTotal = totalRevenue[0]?.total || 0;
    const revenueThisMonthTotal = revenueThisMonth[0]?.total || 0;
    const revenueLastMonthTotal = revenueLastMonth[0]?.total || 0;
    
    const revenueGrowth = revenueLastMonthTotal > 0
      ? ((revenueThisMonthTotal - revenueLastMonthTotal) / revenueLastMonthTotal * 100).toFixed(1)
      : '100';

    // 5. Format response
    const stats = {
      bookings: {
        total: totalBookings,
        thisMonth: bookingsThisMonth,
        growth: `${bookingGrowth}%`,
        today: todayBookings,
        yesterday: yesterdayBookings,
      },
      revenue: {
        total: revenueTotal,
        thisMonth: revenueThisMonthTotal,
        growth: `${revenueGrowth}%`,
        formatted: formatCurrency(revenueTotal),
      },
      patients: {
        total: totalPatients,
        active: totalPatients, // You might want to define "active" differently
      },
      labs: {
        total: totalLabs,
        active: totalLabs, // You might want to check lab status
      },
      status: {
        completed: completedBookings,
        pending: pendingBookings,
      },
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('Admin stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)}K`;
  }
  return `₹${amount}`;
}