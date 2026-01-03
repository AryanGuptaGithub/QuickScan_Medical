"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  FiCheckCircle,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiPackage,
  FiLoader
} from "react-icons/fi";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError("No booking ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching booking:", bookingId);
        
        const response = await fetch(`/api/bookings/${bookingId}`);
        const result = await response.json();
        
        console.log("Booking API response:", result);
        
        if (result.success) {
          setBooking(result.data);
        } else {
          setError(result.message || "Failed to fetch booking details");
        }
      } catch (error: any) {
        console.error("Error fetching booking:", error);
        setError("Network error. Please try again.");
        
        // Fallback to mock data for development
        setBooking({
          bookingId,
          serviceName: "MRI Scan",
          patientName: "Test Patient",
          appointmentDate: new Date(),
          timeSlot: "10:00-11:00",
          labName: "QuickScan Diagnostic Center",
          labAddress: "123 Medical Street, Mumbai",
          totalAmount: 2950,
          paymentStatus: "Paid",
          status: "confirmed"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return "";
    return timeSlot.replace('-', ' to ');
  };

  const downloadReceipt = () => {
    if (!booking) return;
    
    // Create a simple receipt
    const receiptContent = `
      QuickScan Medical Receipt
      -------------------------
      Booking ID: ${booking.bookingId}
      Date: ${new Date().toLocaleDateString()}
      
      Patient: ${booking.patientName}
      Service: ${booking.serviceName}
      Lab: ${booking.labName}
      Date: ${formatDate(booking.appointmentDate)}
      Time: ${formatTimeSlot(booking.timeSlot)}
      
      Amount: ₹${booking.totalAmount}
      Status: ${booking.paymentStatus}
      
      Thank you for choosing QuickScan!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Unable to Load Booking</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button href="/dashboard">Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20">
      <div className="container-custom px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="text-green-600 text-4xl" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Your appointment has been successfully scheduled. We&apos;ve sent
              the confirmation details to your email and phone.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Booking ID: {booking?.bookingId || bookingId}
              </div>
              <p className="text-gray-700">
                Keep this ID handy for all future communications
              </p>
            </div>

            {/* Booking Details */}
            {booking && (
              <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FiPackage className="mr-2" />
                  Booking Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiCalendar className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-semibold">
                        {formatDate(booking.appointmentDate)} at {formatTimeSlot(booking.timeSlot)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiPackage className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Service</div>
                      <div className="font-semibold">{booking.serviceName}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiUser className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Patient Name</div>
                      <div className="font-semibold">{booking.patientName}</div>
                      {booking.patientAge && booking.patientGender && (
                        <div className="text-sm text-gray-500">
                          {booking.patientAge} years, {booking.patientGender}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiCreditCard className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Amount Paid</div>
                      <div className="font-semibold">₹{booking.totalAmount}</div>
                      <div className="text-sm text-gray-500">
                        Status: <span className="font-medium capitalize">{booking.paymentStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiMapPin className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Lab Location</div>
                      <div className="font-semibold">{booking.labName}</div>
                      {booking.labAddress && (
                        <div className="text-sm text-gray-500">{booking.labAddress}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-lg mr-4">
                      <FiMail className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Contact</div>
                      <div className="font-semibold">{booking.patientPhone}</div>
                      <div className="text-sm text-gray-500">{booking.patientEmail}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <FiCheckCircle className="mr-2" />
                    Important Instructions:
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Arrive 15 minutes before your appointment time</li>
                    <li>• Carry a valid government ID proof</li>
                    {booking.serviceType === 'mri' && (
                      <li>• For MRI: Remove all metal objects before scan</li>
                    )}
                    {booking.serviceType === 'blood-test' || booking.serviceType === 'health-checkup' ? (
                      <li>• Fasting required: 8-12 hours for accurate results</li>
                    ) : (
                      <li>• No special preparation required</li>
                    )}
                    {booking.appointmentType === 'home-service' && (
                      <li>• Please be available at the given address during the time slot</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                variant="primary" 
                onClick={downloadReceipt}
                disabled={!booking}
              >
                <FiDownload className="inline mr-2" />
                Download Receipt
              </Button>
              <Button href="/dashboard" variant="outline" className="no-underline">
                View My Bookings
              </Button>
              <Button href="/" variant="secondary" className="no-underline">
                Back to Home
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">
              What Happens Next?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-bold mb-2">Confirmation Call</h4>
                <p className="text-gray-600 text-sm">
                  Our team will call you within 30 minutes to confirm your appointment
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-bold mb-2">Sample Collection</h4>
                <p className="text-gray-600 text-sm">
                  Visit the lab or our technician will visit your home as per booking
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-bold mb-2">Report Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Get digital reports on email/WhatsApp within promised timeline
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600 mb-4">
                Need help? Contact our support team
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center">
                  <FiPhone className="text-blue-600 mr-2" />
                  <span className="font-semibold">1800-123-4567</span>
                </div>
                <div className="flex items-center">
                  <FiMail className="text-blue-600 mr-2" />
                  <span className="font-semibold">support@quickscan.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}