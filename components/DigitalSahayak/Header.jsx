import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Cpu, ShieldCheck, MapPin } from "lucide-react";

export default function Header({ theme, toggleTheme, activeLoopState }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-500 border-b ${
        isDark
          ? "bg-black/80 border-cyan-900/30 text-white"
          : "bg-[#FDFBF7]/90 border-amber-900/10 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Western Railway Tag */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
              isDark
                ? "bg-gradient-to-tr from-cyan-600 to-teal-400 text-black"
                : "bg-gradient-to-tr from-amber-600 to-amber-500 text-white"
            }`}
          >
            <Cpu className="w-5 h-5" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight font-sans">
                Digital Sahayak
              </span>
              <span
                className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full ${
                  isDark
                    ? "bg-cyan-950 text-cyan-400 border border-cyan-800"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}
              >
                AI v2.0
              </span>
            </div>
            <p className="text-[10px] opacity-75 font-sans flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500 inline" />
              Western Railway Authorised Partner
            </p>
          </div>
        </div>

        {/* Live Loop Status and Controls */}
        <div className="flex items-center gap-4">
          {/* Agent Loop Status Pill */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
              isDark
                ? "bg-slate-900/80 border-cyan-900/40 text-cyan-300"
                : "bg-amber-50 border-amber-200/50 text-amber-800"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono">
              Loop State: <strong className="uppercase">{activeLoopState}</strong>
            </span>
          </div>

          {/* Theme Toggler */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
              isDark
                ? "bg-slate-900 border-cyan-950 hover:bg-slate-800 text-yellow-400"
                : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
            }`}
            title="Toggle Soft UI Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
