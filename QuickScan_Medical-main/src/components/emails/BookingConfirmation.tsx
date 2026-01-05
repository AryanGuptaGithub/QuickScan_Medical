// components/emails/BookingConfirmation.tsx
import React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Heading,
  Hr,
  Tailwind,
  Img
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  patientName: string;
  bookingId: string;
  serviceName: string;
  appointmentDate: string;
  timeSlot: string;
  labName: string;
  labAddress: string;
  labPhone?: string;
  amount: number;
  paymentStatus: string;
  instructions?: string[];
}

export default function BookingConfirmationEmail({
  patientName,
  bookingId,
  serviceName,
  appointmentDate,
  timeSlot,
  labName,
  labAddress,
  labPhone = '1800-123-4567',
  amount,
  paymentStatus,
  instructions = []
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Preview>Your QuickScan Medical Appointment is Confirmed!</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-2xl mx-auto p-0">
            {/* Header */}
            <Section className="bg-blue-600 text-white p-8 text-center">
              <Heading className="text-3xl font-bold m-0">
                🎉 Appointment Confirmed!
              </Heading>
              <Text className="text-blue-100 mt-2">
                Your diagnostic appointment has been successfully booked
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white p-8">
              <Text className="text-lg mb-6">
                Dear <strong>{patientName}</strong>,
              </Text>
              
              <Text className="text-gray-700 mb-8">
                Thank you for choosing QuickScan Medical. Your appointment has been confirmed. 
                Here are your appointment details:
              </Text>

              {/* Booking Details Card */}
              <Section className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Booking ID:</Text>
                    <Text className="font-bold text-blue-600">{bookingId}</Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Service:</Text>
                    <Text className="font-semibold">{serviceName}</Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Date & Time:</Text>
                    <Text className="font-semibold">
                      {appointmentDate} at {timeSlot}
                    </Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Diagnostic Center:</Text>
                    <Text className="font-semibold">{labName}</Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Address:</Text>
                    <Text className="font-semibold">{labAddress}</Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Amount:</Text>
                    <Text className="font-bold text-lg">₹{amount}</Text>
                  </div>
                  
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Payment Status:</Text>
                    <Text className={`font-semibold ${
                      paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {paymentStatus.toUpperCase()}
                    </Text>
                  </div>
                </div>
              </Section>

              {/* Instructions */}
              <Section className="mb-8">
                <Heading className="text-xl font-bold mb-4">
                  📋 Important Instructions
                </Heading>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Arrive 15 minutes before your scheduled time</li>
                  <li>Bring a valid photo ID proof (Aadhar, Driving License, etc.)</li>
                  <li>Carry any previous medical reports</li>
                  <li>Fast for 8-10 hours if required for your test</li>
                  <li>Bring doctor&apos;s prescription if applicable</li>
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </Section>

              {/* Contact Info */}
              <Section className="border-t border-gray-200 pt-6">
                <Text className="text-gray-600 mb-2">
                  <strong>📞 Lab Contact:</strong> {labPhone}
                </Text>
                <Text className="text-gray-600 mb-2">
                  <strong>📍 Address:</strong> {labName}, {labAddress}
                </Text>
                <Text className="text-gray-600">
                  Need to reschedule or cancel? Visit your dashboard or call us at 1800-123-4567
                </Text>
              </Section>

              {/* Action Button */}
              <Section className="text-center mt-8">
                <Link
                  href="https://quickscan.vercel.app/dashboard"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg no-underline"
                >
                  View in Dashboard
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-100 p-6 text-center">
              <Text className="text-gray-600 text-sm">
                © {new Date().getFullYear()} QuickScan Medical. All rights reserved.
              </Text>
              <Text className="text-gray-500 text-xs mt-2">
                123 Medical Street, Mumbai, Maharashtra 400001
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                This is an automated email, please do not reply.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}