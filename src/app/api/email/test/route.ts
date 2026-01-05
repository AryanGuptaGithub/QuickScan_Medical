// app/api/email/test/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test email payload
    const testPayload = {
      to: process.env.EMAIL_TEST_ADDRESS || 'test@example.com',
      subject: 'Test Email from QuickScan Medical',
      template: 'booking-confirmation',
      data: {
        patientName: 'John Doe',
        bookingId: 'QS123456',
        serviceName: 'MRI Scan',
        appointmentDate: 'Mon, 15 Jan 2024',
        timeSlot: '10:00 AM - 10:30 AM',
        labName: 'QuickScan Diagnostic Center',
        labAddress: '123 Medical Street, Mumbai',
        labPhone: '022-12345678',
        amount: 2500,
        paymentStatus: 'paid',
        instructions: [
          'Fast for 8-10 hours before the test',
          'Bring previous medical reports'
        ]
      }
    };

    // Call your email API
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Test email sent',
      testPayload,
      emailResult: result
    });
    
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Test failed', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}