"use client";

import React from "react";
import { Filter, Download, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";

const bookings: any[] = [];

export default function BookingsPage() {
  const handleAction = (action: string) => {
    showToast(`${action} action triggered`, "success");
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Transactions</h1>
          <p className="text-gray-400">Track and manage all user transactions.</p>
        </div>
        <button 
          onClick={() => handleAction("Export CSV")}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-2xl hover:bg-white/10 transition-all"
        >
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {["All", "Success", "Pending", "Failed"].map((tab) => (
              <button key={tab} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === "All" ? "bg-lokara-gold text-lokara-navy" : "text-gray-400 hover:text-white"
              }`}>
                {tab}
              </button>
            ))}
          </div>
          <button 
            onClick={() => handleAction("Sort Bookings")}
            className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
          >
            <Filter className="w-4 h-4" />
            Sort by: Newest
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-bold">Transaction ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Item</th>
                <th className="px-6 py-4 font-bold">Method</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-lokara-gold font-mono">{booking.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{booking.user}</td>
                  <td className="px-6 py-4 text-gray-400">{booking.item}</td>
                  <td className="px-6 py-4 text-gray-400">{booking.method}</td>
                  <td className="px-6 py-4 text-white font-bold">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        booking.status === "Success" ? "bg-emerald-400" :
                        booking.status === "Pending" ? "bg-amber-400" : "bg-red-400"
                      }`} />
                      <span className={
                        booking.status === "Success" ? "text-emerald-400" :
                        booking.status === "Pending" ? "text-amber-400" : "text-red-400"
                      }>{booking.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-white" aria-label="More options">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
