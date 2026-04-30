"use client";

import React, { useState } from "react";
import { MapPin, Star, Plus, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";
import DashboardModal from "@/components/dashboard/DashboardModal";
import { DashboardSelect } from "@/components/dashboard/DashboardSelect";

interface Destination {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: string;
  packages: string;
  status: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Nature & Adventure",
    location: "",
    rating: "5.0",
    packages: "5",
    status: "Active"
  });

  const handleAction = (action: string) => {
    if (action === "New Destination") {
      setIsModalOpen(true);
    } else {
      showToast(`${action} action triggered`, "success");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDest = {
      id: Date.now(),
      ...formData
    };
    setDestinations([newDest, ...destinations]);
    setIsModalOpen(false);
    setFormData({ name: "", category: "Nature & Adventure", location: "", rating: "5.0", packages: "5", status: "Active" });
    showToast("Destination added successfully", "success");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Destination Content</h1>
          <p className="text-gray-400">Manage tour packages and attraction details.</p>
        </div>
        <button 
          onClick={() => handleAction("New Destination")}
          className="flex items-center gap-2 px-6 py-3 bg-lokara-gold text-lokara-navy font-bold rounded-2xl hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Destination</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.length > 0 ? destinations.map((dest) => (
          <motion.div 
            key={dest.id}
            whileHover={{ y: -5 }}
            className="glass-dark rounded-[32px] border border-white/10 overflow-hidden group"
          >
            <div className="h-40 bg-white/5 flex items-center justify-center relative">
              <Globe className="w-12 h-12 text-white/10 group-hover:text-lokara-gold/20 transition-colors" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-lokara-navy/80 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-bold text-lokara-gold uppercase tracking-wider">{dest.category}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-lokara-gold transition-colors">{dest.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-3 h-3" />
                <span>{dest.location}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-lokara-gold text-lokara-gold" />
                  <span className="text-sm font-bold text-white">{dest.rating}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{dest.packages} Packages</span>
                </div>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-white/10 rounded-3xl">
            No destinations found. Click &quot;New Destination&quot; to start.
          </div>
        )}
      </div>

      <DashboardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Destination"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Destination Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Nama Destinasi"
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
              placeholder="Masukkan Lokasi Destinasi"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <DashboardSelect 
            label="Category"
            value={formData.category}
            onChange={(val) => setFormData({...formData, category: val})}
            options={[
              { value: "Nature & Adventure", label: "Nature & Adventure" },
              { value: "Marine Tourism", label: "Marine Tourism" },
              { value: "Cultural Heritage", label: "Cultural Heritage" },
              { value: "Wildlife", label: "Wildlife" },
            ]}
          />
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
              Add Destination
            </button>
          </div>
        </form>
      </DashboardModal>
    </div>
  );
}
