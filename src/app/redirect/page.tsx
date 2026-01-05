// app/redirect/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/login");
      return;
    }

    // Check if user is admin
    if (session.user?.role === "admin") {
      console.log("User is admin, redirecting to /admin");
      router.push("/admin");
    } else {
      console.log("User is not admin, redirecting to /dashboard");
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
        <p className="text-sm text-gray-400 mt-2">Please wait</p>
      </div>
    </div>
  );
}