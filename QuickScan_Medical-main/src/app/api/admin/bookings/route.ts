// app/api/admin/bookings/route.ts - SIMPLIFIED
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/database";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Dynamically get the Booking model
    const Booking = mongoose.models.Booking;
    if (!Booking) {
      return NextResponse.json(
        { error: "Booking model not found" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Simple query without populate
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Booking.countDocuments({});

    const formattedBookings = bookings.map((booking: any) => ({
      id: booking._id.toString(),
      bookingId: booking.bookingId || `BK-${booking._id.toString().slice(-6)}`,
      patientName: booking.patientName || "N/A",
      patientEmail: booking.patientEmail || "N/A",
      serviceName: booking.serviceName || "N/A",
      labName: booking.labName || "N/A",
      appointmentDate: booking.appointmentDate || booking.createdAt,
      amount: booking.totalAmount || 0,
      status: booking.status || "pending",
      paymentStatus: booking.paymentStatus || "pending",
    }));

    return NextResponse.json({
      success: true,
      data: formattedBookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin bookings API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
