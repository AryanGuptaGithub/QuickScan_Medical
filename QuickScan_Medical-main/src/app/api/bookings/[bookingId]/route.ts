// app/api/bookings/[bookingId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Booking from "@/lib/models/Booking";
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Booking ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find and cancel booking
    const booking = await Booking.findOneAndUpdate(
      {
        bookingId: bookingId,
        status: { $in: ["pending", "confirmed"] }, // Only allow cancelling these statuses
      },
      {
        $set: {
          status: "cancelled",
          cancelledAt: new Date(),
          cancellationReason: "User cancelled",
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found or cannot be cancelled" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error("Cancel booking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to cancel booking",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET method for individual booking (if you need it)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Booking ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findOne({
      bookingId: bookingId,
    })
      .populate("serviceId", "name slug category")
      .populate("labId", "name address city phone")
      .lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error("Fetch booking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
