// app/api/time-slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import TimeSlot from '@/lib/models/TimeSlot';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const labId = searchParams.get('labId');
    const dateStr = searchParams.get('date');
    const serviceType = searchParams.get('serviceType');
    
    if (!labId || !dateStr) {
      return NextResponse.json(
        { success: false, message: 'Lab ID and date are required' },
        { status: 400 }
      );
    }

    // Convert date to start and end of day
    const date = new Date(dateStr);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const query: any = {
      labId: new mongoose.Types.ObjectId(labId),
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    };

    // If service type provided, check if time slot supports it
    if (serviceType) {
      query.$or = [
        { serviceTypes: serviceType },
        { serviceTypes: [] }, // Slots that support all services
        { serviceTypes: { $exists: false } }
      ];
    }

    const timeSlots = await TimeSlot.find(query)
      .sort({ startTime: 1 })
      .lean();

    // Generate default slots if none exist
    if (timeSlots.length === 0) {
      const defaultSlots = generateDefaultTimeSlots(labId, new Date(dateStr));
      return NextResponse.json({
        success: true,
        data: defaultSlots,
        message: 'Default time slots generated'
      });
    }

    // Filter available slots (not full)
    const availableSlots = timeSlots.filter(slot => 
      slot.isAvailable && slot.currentBookings < slot.maxCapacity
    );

    return NextResponse.json({
      success: true,
      data: availableSlots,
      total: timeSlots.length,
      available: availableSlots.length
    });

  } catch (error: any) {
    console.error('Time slots error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch time slots', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['labId', 'date', 'startTime', 'endTime'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if slot already exists
    const existingSlot = await TimeSlot.findOne({
      labId: body.labId,
      date: new Date(body.date),
      startTime: body.startTime
    });

    if (existingSlot) {
      return NextResponse.json(
        { success: false, message: 'Time slot already exists' },
        { status: 409 }
      );
    }

    const timeSlot = new TimeSlot({
      ...body,
      date: new Date(body.date),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await timeSlot.save();

    return NextResponse.json({
      success: true,
      message: 'Time slot created successfully',
      data: timeSlot
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create time slot error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create time slot', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

function generateDefaultTimeSlots(labId: string, date: Date): any[] {
  const slots = [];
  const timeRanges = [
    { start: '09:00', end: '10:00', type: 'morning' },
    { start: '10:00', end: '11:00', type: 'morning' },
    { start: '11:00', end: '12:00', type: 'morning' },
    { start: '12:00', end: '13:00', type: 'afternoon' },
    { start: '14:00', end: '15:00', type: 'afternoon' },
    { start: '15:00', end: '16:00', type: 'afternoon' },
    { start: '16:00', end: '17:00', type: 'evening' },
    { start: '17:00', end: '18:00', type: 'evening' }
  ];

  for (let i = 0; i < timeRanges.length; i++) {
    const range = timeRanges[i];
    slots.push({
      slotId: `slot_${i + 1}`,
      labId,
      date,
      slotType: range.type,
      startTime: range.start,
      endTime: range.end,
      maxCapacity: 5,
      currentBookings: Math.floor(Math.random() * 3),
      isAvailable: Math.random() > 0.3, // 70% available
      serviceTypes: ['mri', 'ct-scan', 'x-ray', 'blood-test', 'health-checkup'],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return slots;
}