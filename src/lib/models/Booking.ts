// lib/models/Booking.ts - SIMPLIFIED VERSION
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },

    // User Information
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    patientName: { type: String, required: true },
    patientAge: { type: Number },
    patientGender: { type: String, enum: ["male", "female", "other"] },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },

    // Service Information
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    serviceName: { type: String, required: true },
    serviceType: {
      type: String,
      enum: ["mri", "ct-scan", "x-ray", "health-checkup", "blood-test"],
    },

    // Lab/Center Information
    labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
    labName: { type: String },
    labAddress: { type: String },
    labCity: { type: String },

    // Appointment Details
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    appointmentType: {
      type: String,
      enum: ["lab-visit", "home-service"],
      default: "lab-visit",
    },

    // Home Service Details
    homeServiceAddress: { type: String },
    homeServicePincode: { type: String },
    homeServiceLandmark: { type: String },

    // Medical Details
    doctorReferral: { type: Boolean, default: false },
    doctorName: { type: String },
    symptoms: { type: String },
    previousReports: { type: String },

    // Payment Details
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    homeServiceCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    // Payment Status
    paymentMethod: {
      type: String,
      enum: ["online", "cash", "insurance", "wallet"],
      default: "online",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "partially_refunded"],
      default: "pending",
    },
    paymentId: { type: String },
    paymentDate: { type: Date },

    // Booking Status
    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "confirmed",
        "sample-collected",
        "processing",
        "completed",
        "cancelled",
        "no-show",
      ],
      default: "pending",
    },

    // Reports
    reportUrl: { type: String },
    reportGeneratedAt: { type: Date },
    reportViewed: { type: Boolean, default: false },

    // Timestamps - Let Mongoose handle them
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelledAt: { type: Date },
    cancellationReason: { type: String },

    // Additional Information
    notes: { type: String },
    specialInstructions: { type: String },
    couponCode: { type: String },
    referralCode: { type: String },
  },
  {
    // Enable timestamps - Mongoose will handle createdAt and updatedAt
    timestamps: true,
  }
);

// NO PRE-SAVE HOOKS - Let Mongoose handle timestamps automatically

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
