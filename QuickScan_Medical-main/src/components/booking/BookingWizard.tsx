"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingStep4 from "./BookingStep4";
import BookingStep5 from "./BookingStep5";

interface BookingData {
  // Step 1: Service Selection
  serviceId: string;
  serviceName: string;
  serviceType: string;
  appointmentType: "lab-visit" | "home-service";

  // Step 2: Patient Details
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientEmail: string;
  patientPhone: string;

  // Step 3: Location & Time
  labId: string;
  labName: string;
  appointmentDate: Date;
  timeSlot: string;

  // Step 4: Medical Details
  doctorReferral: boolean;
  doctorName: string;
  symptoms: string;
  previousReports: string;
  specialInstructions: string;

  // Step 5: Payment
  couponCode: string;
  paymentMethod: string;
}

export default function BookingWizard({
  initialService,
}: {
  initialService?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    // Initialize with user data if logged in
    patientName: session?.user?.name || "",
    patientEmail: session?.user?.email || "",
    patientPhone: "",
    patientAge: 0,
    patientGender: "",

    // Service data
    serviceId: initialService || "",
    serviceName: "",
    serviceType: "",
    appointmentType: "lab-visit",

    // Location & Time
    labId: "",
    labName: "",
    appointmentDate: new Date(),
    timeSlot: "",

    // Medical
    doctorReferral: false,
    doctorName: "",
    symptoms: "",
    previousReports: "",
    specialInstructions: "",

    // Payment
    couponCode: "",
    paymentMethod: "online",
  });

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting booking:", bookingData);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log("Booking response:", data);

      if (data.success) {
        // If online payment, handle payment flow
        if (bookingData.paymentMethod === "online" && data.data?.paymentLink) {
          // You could redirect to payment page here
          // window.location.href = data.data.paymentLink;
          // Or show payment modal
        } else {
          // For cash payments, go directly to success
          router.push(`/booking/success?bookingId=${data.bookingId}`);
        }
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const steps = [
    { number: 1, title: "Select Service", description: "Choose test/scan" },
    { number: 2, title: "Patient Details", description: "Enter patient info" },
    { number: 3, title: "Time & Location", description: "Pick date & lab" },
    { number: 4, title: "Medical Info", description: "Add medical details" },
    { number: 5, title: "Confirmation", description: "Review & pay" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center relative flex-1"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                ${
                  currentStep >= step.number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number}
              </div>
              <div className="text-center">
                <div
                  className={`font-semibold text-sm ${
                    currentStep >= step.number
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>

              {/* Connector line */}
              {step.number < steps.length && (
                <div
                  className={`absolute top-6 left-1/2 w-full h-0.5 -z-10
                  ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 1 && (
          <BookingStep1
            data={bookingData}
            updateData={updateBookingData}
            nextStep={nextStep}
          />
        )}

        {currentStep === 2 && (
          <BookingStep2
            data={bookingData}
            updateData={updateBookingData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 3 && (
          <BookingStep3
            data={bookingData}
            updateData={updateBookingData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 4 && (
          <BookingStep4
            data={bookingData}
            updateData={updateBookingData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 5 && (
          <BookingStep5
            data={bookingData}
            updateData={updateBookingData}
            prevStep={prevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
