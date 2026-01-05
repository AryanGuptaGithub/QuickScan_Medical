import { NextResponse } from "next/server";

console.log("🔧 DEBUG ROUTE LOADED");

export async function GET() {
  console.log("📞 DEBUG API CALLED");
  
  return NextResponse.json({
    message: "Debug route working",
    timestamp: new Date().toISOString(),
    env: {
      hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasMongoURI: !!process.env.MONGODB_URI
    }
  });
}   