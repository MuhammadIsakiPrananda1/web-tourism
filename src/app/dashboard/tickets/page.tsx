"use client";

import React from "react";
import { Plus, Ticket as TicketIcon, Plane, Bus, Train } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";

import { useState } from "react";
import DashboardModal from "@/components/dashboard/DashboardModal";
import { DashboardSelect } from "@/components/dashboard/DashboardSelect";

interface Ticket {
  id: number;
  name: string;
  provider: string;
  type: string;
  price: string;
  stock: number;
  status: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    type: "Flight",
    price: "",
    stock: 50,
    status: "Available"
  });

  const handleAction = (action: string) => {
    if (action === "Issue New Ticket") {
      setIsModalOpen(true);
    } else {
      showToast(`${action} action triggered`, "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      ...formData
    };
    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    setFormData({ name: "", provider: "", type: "Flight", price: "", stock: 50, status: "Available" });
    showToast("Ticket issued successfully", "success");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ticket Management</h1>
          <p className="text-gray-400">Control flight, bus, and train inventory.</p>
        </div>
        <button 
          onClick={() => handleAction("Issue New Ticket")}
          className="flex items-center gap-2 px-6 py-3 bg-lokara-gold text-lokara-navy font-bold rounded-2xl hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Issue New Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.length > 0 ? tickets.map((ticket) => (
          <motion.div 
            key={ticket.id}
            whileHover={{ y: -5 }}
            className="glass-dark p-6 rounded-3xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {ticket.type === "Flight" ? <Plane className="w-16 h-16" /> : ticket.type === "Bus" ? <Bus className="w-16 h-16" /> : <Train className="w-16 h-16" />}
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-lokara-gold/10 rounded-lg">
                <TicketIcon className="w-5 h-5 text-lokara-gold" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-lokara-gold">{ticket.type}</span>
            </div>

            <h3 className="font-bold text-white mb-1">{ticket.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{ticket.provider}</p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 mb-1">Price per seat</p>
                <p className="text-lg font-bold text-white">{ticket.price}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-bold ${ticket.stock === 0 ? "text-red-400" : ticket.stock < 10 ? "text-amber-400" : "text-emerald-400"}`}>
                  {ticket.status}
                </p>
                <p className="text-xs text-gray-500">{ticket.stock} left</p>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-white/10 rounded-3xl">
            No tickets found. Click &quot;Issue New Ticket&quot; to add inventory.
          </div>
        )}
      </div>

      <DashboardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Issue New Ticket"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Ticket Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Nama Tiket"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Provider</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Nama Provider"
              value={formData.provider}
              onChange={(e) => setFormData({...formData, provider: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <DashboardSelect 
              label="Transport Type"
              value={formData.type}
              onChange={(val) => setFormData({...formData, type: val})}
              options={[
                { value: "Flight", label: "Flight" },
                { value: "Bus", label: "Bus" },
                { value: "Train", label: "Train" },
              ]}
            />
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Total Stock</label>
              <input 
                required
                type="number" 
                title="Total Stock"
                placeholder="Masukkan Jumlah Stok"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Price</label>
              <input 
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
                placeholder="Masukkan Harga"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-xl hover:bg-white/5 text-gray-400 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3 bg-lokara-gold text-lokara-navy font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-lokara-gold/20"
            >
              Issue Ticket
            </button>
          </div>
        </form>
      </DashboardModal>
    </div>
  );
}
