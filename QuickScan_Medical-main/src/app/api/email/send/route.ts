// Update your /app/api/email/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import BookingConfirmationEmail from '@/components/emails/BookingConfirmation';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
const useResend = process.env.RESEND_API_KEY && !process.env.EMAIL_TEST_MODE;

const resend = useResend ? new Resend(process.env.RESEND_API_KEY!) : null;

export async function POST(request: NextRequest) {
  try {
    const { to, subject, template, data } = await request.json();

    // Validation
    if (!to || !subject || !template) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log email in development
    console.log('📧 Email Request:', {
      to,
      subject,
      template,
      data,
      useResend,
      isDevelopment
    });

    // In development or test mode, just log and return success
    if (isDevelopment || process.env.EMAIL_TEST_MODE) {
      console.log('📝 Email would be sent to:', to);
      console.log('📝 Email subject:', subject);
      console.log('📝 Email data:', JSON.stringify(data, null, 2));
      
      return NextResponse.json({
        success: true,
        message: 'Email logged in development mode',
        developmentMode: true,
        to,
        subject,
        data
      });
    }

    // Production: Actually send with Resend
    if (!resend) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    let emailComponent;
    switch (template) {
      case 'booking-confirmation':
        emailComponent = BookingConfirmationEmail(data);
        break;
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid template' },
          { status: 400 }
        );
    }

    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      react: emailComponent,
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email', error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: emailData
    });

  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}