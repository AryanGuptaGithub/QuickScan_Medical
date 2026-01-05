// app/api/admin/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/database';
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
    const status = searchParams.get('status');
    const method = searchParams.get('method');
    const skip = (page - 1) * limit;

    // Build filter for payments (use Booking model)
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { paymentId: { $regex: search, $options: 'i' } },
        { patientName: { $regex: search, $options: 'i' } },
        { patientEmail: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (status && status !== 'all') {
      filter.paymentStatus = status;
    }
    
    if (method && method !== 'all') {
      filter.paymentMethod = method;
    }

    // Get total
    const total = await Booking.countDocuments(filter);
    
    // Get payments
    const payments = await Booking.find(filter)
      .sort({ paymentDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('serviceId', 'name')
      .lean();

    // Format payments data
    const formattedPayments = payments.map(payment => ({
      id: payment._id.toString(),
      paymentId: payment.paymentId || payment.bookingId,
      bookingId: payment.bookingId,
      patient: payment.patientName,
      email: payment.patientEmail,
      service: payment.serviceName,
      amount: payment.totalAmount,
      method: payment.paymentMethod,
      status: payment.paymentStatus,
      date: payment.paymentDate || payment.createdAt,
      bookingStatus: payment.status,
    }));

    return NextResponse.json({
      success: true,
      data: formattedPayments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Admin payments API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}