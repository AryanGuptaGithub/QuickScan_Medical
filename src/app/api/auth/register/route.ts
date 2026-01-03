import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("📝 REGISTRATION ATTEMPT:", {
      email: body.email,
      name: body.name,
      passwordLength: body.password?.length,
    });

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // 🔑 CRITICAL: Hash the password
    console.log("🔑 Hashing password...");
    const hashedPassword = await bcrypt.hash(body.password, 12);
    console.log("✅ Password hashed:", hashedPassword.substring(0, 30) + "...");

    // Create user
    const user = new User({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: hashedPassword, // Hashed password
      isVerified: false,
      role: "user",
      createdAt: new Date(),
    });

    await user.save();
    console.log("✅ User created:", user.email);

    // After user.save(), add:
    console.log("✅ User saved, verifying...");

    // Force immediate read from database
    const verifiedUser = await User.findOne({ email: body.email }).lean();
    console.log("🔍 Verified stored data:", {
      email: verifiedUser.email,
      storedHash: verifiedUser.password,
      storedHashPrefix: verifiedUser.password.substring(0, 30),
      expectedHashPrefix: hashedPassword.substring(0, 30),
      match: verifiedUser.password === hashedPassword,
    });

    if (verifiedUser.password !== hashedPassword) {
      console.error("🚨 CRITICAL: Hash mismatch!");
      console.error("Expected:", hashedPassword);
      console.error("Actual:", verifiedUser.password);
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        data: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("🔥 Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
