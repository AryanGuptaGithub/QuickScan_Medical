// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Booking from '@/lib/models/Booking';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId
    } = body;
    
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !bookingId) {
      return NextResponse.json(
        { success: false, message: 'Missing payment details' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Verify signature
    const text = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    
    // Update booking
    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        $set: {
          paymentStatus: 'paid',
          paymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          paymentDate: new Date(),
          status: 'confirmed',
          updatedAt: new Date()
        }
      },
      { new: true }
    );
    
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        bookingId: booking.bookingId,
        status: booking.status
      }
    });
    
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}