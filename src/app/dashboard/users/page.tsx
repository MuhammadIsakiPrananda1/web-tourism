"use client";

import React, { useState } from "react";
import { User, Mail, Shield, MoreVertical, Search, Filter, Trash2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Partner";
  status: "Active" | "Inactive";
  joinedDate: string;
}

import DashboardModal from "@/components/dashboard/DashboardModal";
import { DashboardSelect } from "@/components/dashboard/DashboardSelect";

export default function UsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Member" as "Admin" | "Member" | "Partner",
    status: "Active" as "Active" | "Inactive"
  });

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    showToast("User deleted successfully", "success");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserAccount = {
      id: `USR${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      ...formData,
      joinedDate: new Date().toISOString().split("T")[0]
    };
    setUsers([newUser, ...users]);
    setIsModalOpen(false);
    setFormData({ name: "", email: "", role: "Member", status: "Active" });
    showToast("User added successfully", "success");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Monitor and manage all registered accounts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-lokara-gold text-lokara-navy font-bold rounded-2xl hover:scale-105 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      <DashboardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Register New User"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Nama Lengkap"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
              placeholder="Masukkan Alamat Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DashboardSelect 
              label="Assign Role"
              value={formData.role}
              onChange={(val) => setFormData({...formData, role: val as any})}
              options={[
                { value: "Member", label: "Member" },
                { value: "Partner", label: "Partner" },
                { value: "Admin", label: "Admin" },
              ]}
            />
            <DashboardSelect 
              label="Status"
              value={formData.status}
              onChange={(val) => setFormData({...formData, status: val as any})}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
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
              Register User
            </button>
          </div>
        </form>
      </DashboardModal>

      {/* Filters/Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Cari pengguna berdasarkan nama atau email..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all"
          />
        </div>
        <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Users Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/5">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="text-sm hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-lokara-gold/10 flex items-center justify-center border border-lokara-gold/20">
                        <User className="w-5 h-5 text-lokara-gold" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{user.name}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Shield className="w-4 h-4 text-lokara-gold" />
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
