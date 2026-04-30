"use client";

import React from "react";
import { 
  Users, 
  Hotel, 
  Ticket, 
  DollarSign,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";

const recentBookings: any[] = [];

import { useState, useEffect } from "react";
import { showToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const handleAction = (action: string) => {
    if (action === "Add New Hotel") {
      router.push("/dashboard/hotels");
    } else {
      showToast(`${action} action triggered`, "success");
    }
  };
  const [stats, setStats] = useState([
    { title: "Total Revenue", value: 0, prefix: "Rp ", suffix: "M", icon: DollarSign },
    { title: "Total Bookings", value: 0, prefix: "", suffix: "", icon: Ticket },
    { title: "Active Hotels", value: 0, prefix: "", suffix: "", icon: Hotel },
    { title: "New Customers", value: 0, prefix: "", suffix: "", icon: Users },
  ]);

  useEffect(() => {
    // Initial data fetch simulation - staying at 0
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard 
            key={i} 
            {...stat} 
            value={`${stat.prefix}${stat.value}${stat.suffix}`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-dark rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
            <button 
              onClick={() => handleAction("View All Bookings")}
              className="text-lokara-gold text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/5">
                  <th className="px-6 py-4 font-medium">Booking ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
              {recentBookings.length > 0 ? recentBookings.map((booking) => (
                <tr key={booking.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{booking.id}</td>
                  <td className="px-6 py-4 text-gray-300">{booking.customer}</td>
                  <td className="px-6 py-4 text-gray-300">{booking.item}</td>
                  <td className="px-6 py-4 text-white font-semibold">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Paid" ? "bg-emerald-500/10 text-emerald-400" :
                      booking.status === "Pending" ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-white" aria-label="More options">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-3xl border border-white/10 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => handleAction("Add New Hotel")}
              className="w-full flex items-center justify-between p-4 bg-lokara-gold rounded-2xl text-lokara-navy font-bold hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Add New Hotel</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleAction("Create Promo Code")}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium hover:bg-white/10 transition-all"
            >
              <span>Create Promo Code</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleAction("Send Newsletter")}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium hover:bg-white/10 transition-all"
            >
              <span>Send Newsletter</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
