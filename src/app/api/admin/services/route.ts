// app/api/admin/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/database';
import Service from '@/lib/models/Service';
import Booking from '@/lib/models/Booking';

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
    const category = searchParams.get('category');
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Get total
    const total = await Service.countDocuments(filter);
    
    // Get services
    const services = await Service.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get booking counts for each service
    const servicesWithStats = await Promise.all(
      services.map(async (service) => {
        const bookingCount = await Booking.countDocuments({ 
          serviceId: service._id 
        });
        
        const revenue = await Booking.aggregate([
          { $match: { serviceId: service._id, paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        return {
          id: service._id.toString(),
          name: service.name,
          slug: service.slug,
          category: service.category,
          description: service.description,
          originalPrice: service.originalPrice,
          discountedPrice: service.discountedPrice,
          isPopular: service.isPopular,
          isHomeService: service.isHomeService,
          labCount: service.labIds?.length || 0,
          bookingCount,
          revenue: revenue[0]?.total || 0,
          createdAt: service.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: servicesWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Admin services API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}