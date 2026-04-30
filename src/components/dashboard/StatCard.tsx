"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-dark p-6 rounded-2xl border border-white/10 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-lokara-gold/10 rounded-xl group-hover:bg-lokara-gold/20 transition-colors">
          <Icon className="w-6 h-6 text-lokara-gold" />
        </div>
      </div>
      
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>

      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-linear-to-r from-lokara-gold to-lokara-gold-dark"
        />
      </div>
    </motion.div>
  );
};
