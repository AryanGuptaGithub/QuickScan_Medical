// components/booking/BookingStep5.tsx
"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import {
  FiCheck,
  FiCreditCard,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiFileText,
  FiHome,
  FiPackage,
  FiShield,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

interface Step5Props {
  data: any;
  updateData: (data: any) => void;
  prevStep: () => void;
  onSubmit: () => void;
}

export default function BookingStep5({
  data,
  updateData,
  prevStep,
  onSubmit,
}: Step5Props) {
  const [coupon, setCoupon] = useState(data.couponCode || "");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState(
    data.paymentMethod || "online"
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [calculations, setCalculations] = useState({
    baseAmount: 0,
    discount: 0,
    homeServiceCharge: 0,
    taxAmount: 0,
    totalAmount: 0,
  });

  // Calculate amounts on mount and when dependencies change
  useEffect(() => {
    const calculateAmounts = () => {
      // Base amount from service selection
      const baseAmount = data.baseAmount || 2500; // Default fallback

      // Home service charge
      const homeServiceCharge =
        data.appointmentType === "home-service" ? 200 : 0;

      // Discount logic (example coupons)
      let discount = 0;
      if (coupon === "QUICK50") discount = 50;
      else if (coupon === "HEALTH100") discount = 100;
      else if (coupon === "FIRSTBOOK") discount = 200;

      // Calculate GST (18%)
      const taxableAmount = baseAmount + homeServiceCharge - discount;
      const taxAmount = taxableAmount * 0.18;

      // Total amount
      const totalAmount = baseAmount + homeServiceCharge + taxAmount - discount;

      setCalculations({
        baseAmount,
        discount,
        homeServiceCharge,
        taxAmount,
        totalAmount,
      });

      // Update parent data
      updateData({
        baseAmount,
        discount,
        homeServiceCharge,
        taxAmount,
        totalAmount,
        paymentMethod,
        couponCode: coupon,
      });
    };

    calculateAmounts();
  }, [
    coupon,
    paymentMethod,
    data.appointmentType,
    data.baseAmount,
    updateData,
  ]);

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      setCouponMessage({ type: "error", text: "Please enter a coupon code" });
      return;
    }

    setApplyingCoupon(true);
    setCouponMessage(null);

    try {
      // In production, call your API
      const validCoupons = ["QUICK50", "HEALTH100", "FIRSTBOOK"];
      const couponUpper = coupon.toUpperCase();

      if (validCoupons.includes(couponUpper)) {
        const discountAmount =
          couponUpper === "QUICK50"
            ? 50
            : couponUpper === "HEALTH100"
            ? 100
            : 200;
        setCouponMessage({
          type: "success",
          text: `Coupon applied! ₹${discountAmount} discount added.`,
        });
        updateData({ couponCode: couponUpper });
      } else {
        setCouponMessage({
          type: "error",
          text: "Invalid or expired coupon code",
        });
      }
    } catch (error) {
      setCouponMessage({
        type: "error",
        text: "Failed to apply coupon. Please try again.",
      });
    } finally {
      setApplyingCoupon(false);
    }
  };

  const formatDate = (date: Date) => {
    if (!date) return "Not selected";
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return "Not selected";
    return timeSlot.replace("-", " to ");
  };

  const handlePaymentSubmit = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    console.log("📦 Submitting booking with data:", data);
    console.log("💰 Calculations:", calculations);

    try {
      // Test with simple data first
      const testData = {
        serviceId: "mri-scan",
        patientName: data.patientName || "Test Patient",
        patientEmail: data.patientEmail || "test@example.com",
        patientPhone: data.patientPhone || "1234567890",
        appointmentDate: data.appointmentDate || new Date(),
        timeSlot: data.timeSlot || "10:00-11:00",
        labId: data.labId || "6958b1c7f2b16294edc2f2ae", // Use your lab ID
        appointmentType: data.appointmentType || "lab-visit",
        paymentMethod: "cash", // Use cash for testing
      };

      console.log("🚀 Sending to API:", testData);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);

      const result = await response.json();
      console.log("✅ API Response:", result);

      if (result.success) {
        alert(`Booking successful! ID: ${result.bookingId}`);
        window.location.href = `/booking/success?bookingId=${result.bookingId}`;
      } else {
        alert(`Booking failed: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert("Booking failed. Check console for details.");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      console.log("Creating booking for online payment...");

      // First create the booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          paymentMethod: "online",
          paymentStatus: "pending",
        }),
      });

      const bookingResult = await bookingResponse.json();
      console.log("Booking creation result:", bookingResult);

      if (bookingResult.success) {
        // If payment integration is ready, handle payment
        if (bookingResult.data?.paymentLink) {
          // Redirect to payment page
          window.location.href = bookingResult.data.paymentLink;
        } else {
          // For now, just go to success page
          window.location.href = `/booking/success?bookingId=${bookingResult.bookingId}`;
        }
      } else {
        alert(`Booking failed: ${bookingResult.message}`);
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  const initiatePayment = async () => {
    try {
      console.log("Creating booking...");

      // First, create the booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          paymentMethod: "online",
          paymentStatus: "pending",
        }),
      });

      const bookingResult = await bookingResponse.json();
      console.log("Booking creation result:", bookingResult);

      if (bookingResult.success) {
        console.log("Creating payment...");

        // Create payment order
        const paymentResponse = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: bookingResult.bookingId,
          }),
        });

        const paymentResult = await paymentResponse.json();
        console.log("Payment creation result:", paymentResult);

        if (paymentResult.success) {
          // Handle simulated vs real payment
          if (paymentResult.simulated) {
            // For simulated payments, redirect directly to success
            console.log("Using simulated payment, redirecting to success...");
            window.location.href = `/booking/success?bookingId=${bookingResult.bookingId}`;
          } else {
            // For real payments, load Razorpay
            loadRazorpayScript(paymentResult, bookingResult.bookingId);
          }
        } else {
          alert(`Payment setup failed: ${paymentResult.message}`);
        }
      } else {
        alert(`Booking failed: ${bookingResult.message}`);
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const loadRazorpayScript = (paymentData: any, bookingId: string) => {
    // If simulated, skip Razorpay loading
    if (paymentData.simulated) {
      console.log("Skipping Razorpay for simulation");
      window.location.href = `/booking/success?bookingId=${bookingId}`;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: paymentData.key,
        amount: paymentData.amount * 100,
        currency: paymentData.currency || "INR",
        name: "QuickScan Medical",
        description: `Booking for ${data.serviceName}`,
        image: "/logo.png",
        order_id: paymentData.orderId,
        handler: function (response: any) {
          console.log("Payment successful:", response);
          // Verify payment on server and then redirect
          verifyPayment(response, bookingId);
        },
        prefill: {
          name: data.patientName,
          email: data.patientEmail,
          contact: data.patientPhone,
        },
        notes: {
          bookingId: bookingId,
          service: data.serviceName,
        },
        theme: {
          color: "#2563eb",
        },
      };

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      alert(
        "Payment system unavailable. Please try again or use cash payment."
      );
    };

    document.body.appendChild(script);
  };

  const verifyPayment = async (response: any, bookingId: string) => {
    try {
      const verifyResponse = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          bookingId,
        }),
      });

      const result = await verifyResponse.json();

      if (result.success) {
        window.location.href = `/booking/success?bookingId=${bookingId}`;
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("Payment verification failed. Please contact support.");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Review & Confirm Booking</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Summary Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiPackage className="mr-3 text-blue-600" />
              Booking Summary
            </h3>

            <div className="space-y-6">
              {/* Service Details */}
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h4 className="font-medium text-gray-700">Service</h4>
                  <p className="text-lg font-semibold">
                    {data.serviceName || "MRI Scan"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {data.appointmentType === "home-service"
                      ? "Home Service"
                      : "Lab Visit"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    ₹{calculations.baseAmount}
                  </div>
                  <div className="text-sm text-gray-500">Base amount</div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="mt-1 mr-3 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">Date & Time</div>
                    <div className="text-gray-700">
                      {formatDate(data.appointmentDate)} •{" "}
                      {formatTimeSlot(data.timeSlot)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">Location</div>
                    <div className="text-gray-700">
                      {data.labName || "Lab not selected"}
                      {data.labAddress && (
                        <div className="text-sm text-gray-600 mt-1">
                          {data.labAddress}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiUser className="mt-1 mr-3 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">Patient Details</div>
                    <div className="text-gray-700">
                      {data.patientName || "Not provided"}
                      {data.patientAge && data.patientGender && (
                        <span className="text-sm text-gray-600 ml-2">
                          ({data.patientAge} yrs, {data.patientGender})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {data.patientPhone} • {data.patientEmail}
                    </div>
                  </div>
                </div>

                {/* Home Service Address */}
                {data.appointmentType === "home-service" &&
                  data.homeServiceAddress && (
                    <div className="flex items-start">
                      <FiHome className="mt-1 mr-3 text-green-500" />
                      <div className="flex-1">
                        <div className="font-medium text-green-700">
                          Home Service Address
                        </div>
                        <div className="text-gray-700">
                          {data.homeServiceAddress}
                        </div>
                        {data.homeServicePincode && (
                          <div className="text-sm text-gray-600">
                            Pincode: {data.homeServicePincode}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiCreditCard className="mr-3 text-blue-600" />
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "online",
                  title: "Online Payment",
                  description: "Pay now with UPI, Card, NetBanking",
                  icon: "💳",
                  features: ["Instant confirmation", "Secure payment"],
                },
                {
                  id: "cash",
                  title: "Pay at Lab",
                  description: "Pay in cash at the diagnostic center",
                  icon: "💵",
                  features: ["Pay after service", "Cash only"],
                },
                {
                  id: "insurance",
                  title: "Use Insurance",
                  description: "Claim through health insurance",
                  icon: "🏥",
                  features: ["TPA supported", "Cashless claim"],
                },
                {
                  id: "wallet",
                  title: "QuickScan Wallet",
                  description: "Use wallet balance",
                  icon: "👛",
                  features: ["Instant payment", "Add money anytime"],
                },
              ].map((method) => (
                <div
                  key={method.id}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                    paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    setPaymentMethod(method.id);
                    updateData({ paymentMethod: method.id });
                  }}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{method.title}</div>
                      <div className="text-sm text-gray-600 mb-3">
                        {method.description}
                      </div>
                      <ul className="space-y-1">
                        {method.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <FiCheck
                              className="mr-1 text-green-500"
                              size={12}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {paymentMethod === method.id && (
                      <FiCheck className="text-blue-600 text-xl" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Price & Actions */}
        <div className="space-y-6">
          {/* Price Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiDollarSign className="mr-3 text-blue-600" />
              Price Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">₹{calculations.baseAmount}</span>
              </div>

              {calculations.homeServiceCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Home Service Charge</span>
                  <span className="font-medium">
                    ₹{calculations.homeServiceCharge}
                  </span>
                </div>
              )}

              {calculations.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount Applied</span>
                  <span className="font-medium">-₹{calculations.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">
                  ₹{calculations.taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">
                    ₹{calculations.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Have a coupon code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value.toUpperCase());
                    if (couponMessage) setCouponMessage(null);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter code"
                />
                <Button
                  onClick={applyCoupon}
                  disabled={applyingCoupon}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {applyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
              {couponMessage && (
                <div
                  className={`mt-2 text-sm font-medium ${
                    couponMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  . I understand that cancellations may be subject to charges.
                </label>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <FiShield className="mr-2 text-green-500" />
              <span>Secure payment • 256-bit SSL encrypted</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePaymentSubmit}
                disabled={!termsAccepted}
                variant="primary"
                className="w-full py-3 text-lg font-semibold"
              >
                {paymentMethod === "online" ? (
                  <>Pay ₹{calculations.totalAmount.toFixed(2)} Now</>
                ) : (
                  <>Confirm Booking</>
                )}
              </Button>

              <Button onClick={prevStep} variant="outline" className="w-full">
                ← Back
              </Button>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-start">
              <FiAlertCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <div className="font-semibold text-blue-800 mb-2">
                  Need Help?
                </div>
                <div className="text-sm text-blue-700 space-y-2">
                  <div>📞 Call: 1800-123-4567</div>
                  <div>💬 Chat with us (24×7)</div>
                  <div>✉️ Email: support@quickscan.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
