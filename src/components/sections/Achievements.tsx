"use client";

import { motion } from "framer-motion";
import { Trophy, Code, Award } from "lucide-react";

const achievements = [
  {
    title: "LeetCode Knight",
    subtitle: "Top 4% Globally",
    icon: <Code className="w-8 h-8 text-yellow-500" />,
    stats: [
      { label: "Rating", value: "1,896" },
      { label: "Problems Solved", value: "600+" },
    ],
    accent: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
  },
  {
    title: "OCI Certified",
    subtitle: "Oracle Cloud Infrastructure",
    icon: <Trophy className="w-8 h-8 text-red-500" />,
    stats: [
      { label: "Foundation", value: "Associate" },
      { label: "DevOps", value: "Professional" },
    ],
    accent: "bg-red-500/10 border-red-500/20 text-red-500",
  },
  {
    title: "NIMCET AIR",
    subtitle: "All India Rank",
    icon: <Award className="w-8 h-8 text-blue-500" />,
    stats: [
      { label: "Rank", value: "1,030" },
      { label: "Candidates", value: "> 50,000" },
    ],
    accent: "bg-blue-500/10 border-blue-500/20 text-blue-500",
  },
];

export default function Achievements() {
  // Simulate a heatmap deterministically to prevent hydration errors
  const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => (i * 13) % 100 > 70 ? (i % 4) + 1 : 0);

  return (
    <section className="relative w-full py-32 bg-black flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-white/50 tracking-widest uppercase text-sm">Milestones & Certifications</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 w-full max-w-5xl mx-auto" style={{
          gridTemplateRows: 'auto auto',
        }}>
          {/* LeetCode Bento Box (Full Width) - Most prominent */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative md:col-span-2 bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 hover:border-yellow-500/30 rounded-[32px] p-10 md:p-14 overflow-hidden flex flex-col justify-between min-h-[380px] transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <Code className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="text-yellow-500 font-mono text-sm tracking-wider uppercase">Algorithm Expert</span>
                </div>
                <div className="flex items-center gap-4">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">LeetCode Knight</h3>
                  {/* Username Pill - Reveals on Hover */}
                  <div className="hidden md:flex opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white text-sm font-mono">@Aayush_Kumar_Bhat_08</span>
                  </div>
                </div>
                <p className="text-xl text-white/60">Top 2.31% Globally</p>
                
                {/* Mobile Username (Always visible or different styling on small screens) */}
                <div className="flex md:hidden mt-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full w-max items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-white/70 text-xs font-mono">@Aayush_Kumar_Bhat_08</span>
                </div>
              </div>
              
              <div className="flex gap-8 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Max Rating</p>
                  <p className="text-3xl font-mono text-yellow-400">2,021</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Problems Solved</p>
                  <p className="text-3xl font-mono text-white">686</p>
                </div>
              </div>
            </div>

            {/* Heatmap Background decoration */}
            <div className="absolute bottom-4 left-8 right-8 h-24 opacity-20 pointer-events-none flex items-end">
              <div className="w-full flex gap-1 justify-between items-end">
                {heatmapData.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: 4 }}
                    whileInView={{ opacity: val === 0 ? 0.2 : val * 0.3, height: val === 0 ? 4 : val * 12 + 4 }}
                    transition={{ duration: 1, delay: i * 0.01 }}
                    className={`w-1.5 rounded-t-sm ${val === 0 ? 'bg-white/40' : 'bg-yellow-500'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* OCI Certified Bento Box - Slightly larger */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-white/5 border border-white/10 hover:border-red-500/30 rounded-3xl p-9 overflow-hidden min-h-[340px] transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-500/20 transition-all duration-700" />
            <Trophy className="absolute -right-4 -bottom-4 w-40 h-40 text-red-500 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 w-max mb-6">
                <Trophy className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">OCI Certified</h3>
              <p className="text-white/60 mb-8">Oracle Cloud Infrastructure</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-sm text-white/50 uppercase tracking-wider">DevOps</span>
                  <span className="font-mono text-lg text-white">Professional</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-white/50 uppercase tracking-wider">Architecture</span>
                  <span className="font-mono text-lg text-white">Associate</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* NIMCET AIR Bento Box - Smallest of three */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="group relative bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-3xl p-7 overflow-hidden min-h-[340px] transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
            <Award className="absolute -right-4 -bottom-4 w-40 h-40 text-blue-500 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 w-max mb-6">
                <Award className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">NIMCET AIR</h3>
              <p className="text-white/60 mb-8">All India Rank Selection</p>
              
              <div className="mt-auto">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Rank / Candidates</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-mono text-blue-400">1,030</span>
                  <span className="text-white/30 font-mono text-xl">/ 50k+</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "2%" }} 
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-blue-500 rounded-full" 
                  />
                </div>
                <p className="text-xs text-white/40 mt-2 text-right">Top 2%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
