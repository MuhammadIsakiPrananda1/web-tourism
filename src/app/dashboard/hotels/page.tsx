"use client";

import React from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Star,
  MapPin,
  Hotel
} from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";
import { useState } from "react";
import DashboardModal from "@/components/dashboard/DashboardModal";

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: string;
  rating: string;
  rooms: string;
  status: string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    rating: "5.0",
    rooms: "100",
    status: "Active"
  });

  const handleAction = (action: string) => {
    if (action === "Add New Hotel") {
      setIsModalOpen(true);
    } else {
      showToast(`${action} action triggered`, "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHotel = {
      id: Date.now(),
      ...formData
    };
    setHotels([newHotel, ...hotels]);
    setIsModalOpen(false);
    setFormData({ name: "", location: "", price: "", rating: "5.0", rooms: "100", status: "Active" });
    showToast("Hotel added successfully", "success");
  };

  const handleDelete = (id: number) => {
    setHotels(hotels.filter(h => h.id !== id));
    showToast("Hotel deleted", "success");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hotel Management</h1>
          <p className="text-gray-400">Manage your hotel listings and their availability.</p>
        </div>
        <button 
          onClick={() => handleAction("Add New Hotel")}
          className="flex items-center gap-2 px-6 py-3 bg-lokara-gold text-lokara-navy font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-lokara-gold/20"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Hotel</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-lokara-gold transition-colors" />
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-hidden focus:border-lokara-gold/50 transition-all"
          />
        </div>
        <button 
          onClick={() => handleAction("Open Filters")}
          className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Hotels Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/5">
                <th className="px-6 py-5 font-medium">Hotel Details</th>
                <th className="px-6 py-5 font-medium">Location</th>
                <th className="px-6 py-5 font-medium">Price/Night</th>
                <th className="px-6 py-5 font-medium">Status</th>
                <th className="px-6 py-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {hotels.length > 0 ? hotels.map((hotel) => (
                <tr key={hotel.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Hotel className="w-6 h-6 text-lokara-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-lokara-gold transition-colors">{hotel.name}</p>
                        <div className="flex items-center gap-1 text-xs text-lokara-gold mt-1">
                          <Star className="w-3 h-3 fill-lokara-gold" />
                          <span>{hotel.rating} Rating</span>
                          <span className="text-gray-500 ml-2">• {hotel.rooms} Rooms</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span>{hotel.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-semibold text-white">{hotel.price}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hotel.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleAction("Edit Hotel")}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" 
                        aria-label="Edit hotel"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(hotel.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all" 
                        aria-label="Delete hotel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                    No hotels found. Click &quot;Add New Hotel&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Hotel Modal */}
      <DashboardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Hotel"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Hotel Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Nama Hotel"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Location</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Lokasi Hotel"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Price per Night</label>
              <input 
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
                placeholder="Masukkan Harga per Malam"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Total Rooms</label>
              <input 
                required
                type="number" 
                title="Total Rooms"
                placeholder="Masukkan Jumlah Kamar"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
                value={formData.rooms}
                onChange={(e) => setFormData({...formData, rooms: e.target.value})}
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
              Save Hotel
            </button>
          </div>
        </form>
      </DashboardModal>
    </div>
  );
}
