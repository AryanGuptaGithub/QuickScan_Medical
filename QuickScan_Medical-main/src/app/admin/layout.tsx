// src/app/admin/layout.tsx - UPDATED
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/auth/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar with lower z-index */}
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="ml-64 relative">
        {/* Header with higher z-index */}
        <AdminHeader user={session.user} />
        
        {/* Main content */}
        <main className="p-6 pt-0">
          {/* Add padding-top to account for fixed header */}
          <div className="pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}