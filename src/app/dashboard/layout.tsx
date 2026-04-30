"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(authStatus);
    
    if (!authStatus && !isLoginPage) {
      router.push("/dashboard/login");
    }
    
    setIsLoading(false);
  }, [isLoginPage, router]);

  // Handle loading state to prevent flash
  if (isLoading && !isLoginPage) {
    return (
      <div className="min-h-screen bg-lokara-navy flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-lokara-gold/20 border-t-lokara-gold rounded-full animate-spin" />
      </div>
    );
  }

  // Login page gets a clean layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-lokara-navy text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
