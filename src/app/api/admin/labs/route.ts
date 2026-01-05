// app/api/admin/labs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/database';
import Lab from '@/lib/models/Lab';
import Booking from '@/lib/models/Booking';
import Service from '@/lib/models/Service';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (city && city !== 'all') {
      filter.city = city;
    }

    // Get total
    const total = await Lab.countDocuments(filter);
    
    // Get labs
    const labs = await Lab.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get stats for each lab
    const labsWithStats = await Promise.all(
      labs.map(async (lab) => {
        const bookingCount = await Booking.countDocuments({ 
          labId: lab._id 
        });
        
        const revenue = await Booking.aggregate([
          { $match: { labId: lab._id, paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const serviceCount = await Service.countDocuments({
          labIds: lab._id
        });

        return {
          id: lab._id.toString(),
          name: lab.name,
          address: lab.address,
          city: lab.city,
          state: lab.state,
          phone: lab.phone,
          email: lab.email,
          services: lab.services,
          facilities: lab.facilities,
          rating: lab.rating,
          isActive: lab.isActive,
          isHomeServiceAvailable: lab.isHomeServiceAvailable,
          bookingCount,
          revenue: revenue[0]?.total || 0,
          serviceCount,
          createdAt: lab.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: labsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Admin labs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}