// app/api/payment/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectDB } from '@/lib/database';
import Booking from '@/lib/models/Booking';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
const useSimulation = isDevelopment && !process.env.RAZORPAY_KEY_ID;

// Initialize Razorpay only if keys exist
let razorpay: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
  });
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { bookingId } = await request.json();
    
    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: 'Booking ID required' },
        { status: 400 }
      );
    }
    
    const booking = await Booking.findOne({ bookingId });
    
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }
    
    if (booking.paymentStatus === 'paid') {
      return NextResponse.json(
        { success: false, message: 'Payment already completed' },
        { status: 400 }
      );
    }

    // DEVELOPMENT MODE: Simulated Payment
    if (useSimulation) {
      console.log('🔧 Using simulated payment for development');
      
      // Simulate payment success after 2 seconds
      setTimeout(async () => {
        await Booking.findOneAndUpdate(
          { bookingId },
          {
            $set: {
              paymentStatus: 'paid',
              paymentDate: new Date(),
              status: 'confirmed',
              updatedAt: new Date()
            }
          }
        );
        console.log(`✅ Simulated payment completed for booking ${bookingId}`);
      }, 2000);
      
      return NextResponse.json({
        success: true,
        orderId: `simulated_order_${Date.now()}`,
        amount: booking.totalAmount,
        currency: 'INR',
        key: 'rzp_test_simulation_key',
        simulated: true,
        redirectUrl: `/booking/success?bookingId=${bookingId}`
      });
    }
    
    // PRODUCTION MODE: Real Razorpay
    if (!razorpay) {
      throw new Error('Razorpay not configured');
    }
    
    // Create Razorpay order
    const options = {
      amount: Math.round(booking.totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${booking.bookingId}`,
      notes: {
        bookingId: booking.bookingId,
        patientName: booking.patientName,
        service: booking.serviceName,
        appointmentDate: booking.appointmentDate.toISOString()
      },
      payment_capture: 1
    };
    
    const order = await razorpay.orders.create(options);
    
    // Update booking with payment details
    await Booking.findOneAndUpdate(
      { bookingId },
      {
        $set: {
          razorpayOrderId: order.id,
          paymentStatus: 'pending',
          updatedAt: new Date()
        }
      }
    );
    
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: booking.totalAmount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      simulated: false
    });
    
  } catch (error: any) {
    console.error('Payment creation error:', error);
    
    // Fallback to simulation in development if Razorpay fails
    if (isDevelopment) {
      const { bookingId } = await request.json();
      return NextResponse.json({
        success: true,
        orderId: `fallback_order_${Date.now()}`,
        amount: 0,
        currency: 'INR',
        key: 'rzp_test_fallback_key',
        simulated: true,
        fallback: true,
        redirectUrl: `/booking/success?bookingId=${bookingId}`
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create payment order', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}