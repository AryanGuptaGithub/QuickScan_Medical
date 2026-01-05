// app/api/admin/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/database';
import mongoose from 'mongoose';

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

    // Get User model dynamically
    const User = mongoose.models.User;
    const Booking = mongoose.models.Booking;
    
    if (!User) {
      return NextResponse.json(
        { error: 'User model not found' },
        { status: 500 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // Build filter - get users with role 'user' (patients)
    const filter: any = { role: 'user' };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count
    const total = await User.countDocuments(filter);
    
    // Fetch patients (users with role 'user')
    const patients = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get additional stats for each patient
    const patientsWithStats = await Promise.all(
      patients.map(async (patient: any) => {
        let bookingCount = 0;
        let lastVisit = null;
        
        if (Booking) {
          // Get booking count
          bookingCount = await Booking.countDocuments({ 
            userId: patient._id 
          });
          
          // Get last booking date
          const lastBooking = await Booking.findOne({ 
            userId: patient._id 
          })
          .sort({ appointmentDate: -1 })
          .select('appointmentDate')
          .lean();

          lastVisit = lastBooking?.appointmentDate;
        }

        // Calculate age from dateOfBirth if available
        let age = null;
        if (patient.dateOfBirth) {
          const birthDate = new Date(patient.dateOfBirth);
          const today = new Date();
          age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
        }

        return {
          id: patient._id.toString(),
          name: patient.name || 'Unknown',
          email: patient.email || 'No email',
          phone: patient.phone || 'No phone',
          age: age || 'N/A',
          gender: patient.gender || 'Not specified',
          city: patient.address?.city || 'Unknown',
          totalBookings: bookingCount,
          lastVisit: lastVisit 
            ? new Date(lastVisit).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
            : 'Never',
          createdAt: patient.createdAt,
          isVerified: patient.isVerified || false,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: patientsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Admin patients API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}