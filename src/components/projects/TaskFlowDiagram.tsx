"use client";

import { motion } from "framer-motion";
import { User, ShieldCheck, Network, Database, Layers, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskFlowDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection paths */}
        {[
          { from: [10, 50], to: [35, 20] }, // User -> Auth Service
          { from: [10, 50], to: [35, 50] }, // User -> Next.js Web App
          { from: [10, 50], to: [35, 80] }, // User -> Socket Server
          { from: [35, 20], to: [70, 35] }, // Auth Service -> DB
          { from: [35, 50], to: [70, 35] }, // Next.js -> DB
          { from: [35, 50], to: [70, 65] }, // Next.js -> Redis
          { from: [35, 80], to: [70, 65] }, // Socket -> Redis
        ].map((edge, i) => {
          const [x1, y1] = edge.from;
          const [x2, y2] = edge.to;
          const d = `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <motion.path
              key={i}
              d={d}
              stroke="#3b82f6" // blue-500
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.2 }}
            />
          );
        })}

        {/* Animated Packets */}
        {[
          { path: "M 10 50 C 22.5 50, 22.5 20, 35 20", delay: 0 }, // Auth
          { path: "M 10 50 L 35 50", delay: 0.5 }, // Web
          { path: "M 10 50 C 22.5 50, 22.5 80, 35 80", delay: 1 }, // Socket
          { path: "M 35 20 C 52.5 20, 52.5 35, 70 35", delay: 1.5 }, // Auth -> DB
          { path: "M 35 50 C 52.5 50, 52.5 35, 70 35", delay: 2 }, // Web -> DB
          { path: "M 35 80 C 52.5 80, 52.5 65, 70 65", delay: 2.5 }, // Socket -> Redis
        ].map((packet, i) => (
          <circle key={`packet-${i}`} r="1" fill="#60a5fa" filter="drop-shadow(0 0 4px #60a5fa)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={packet.path} begin={`${packet.delay}s`} />
          </circle>
        ))}
        
        {/* Real-time CRDT sync packet */}
        <circle r="0.8" fill="#a855f7" filter="drop-shadow(0 0 4px #a855f7)">
            <animateMotion dur="1s" repeatCount="indefinite" path="M 10 50 C 22.5 50, 22.5 80, 35 80" />
        </circle>
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {[
          { id: 'user', icon: User, label: 'Client', x: 10, y: 50, color: 'text-white' },
          { id: 'auth', icon: ShieldCheck, label: 'Auth (Port 3003)', x: 35, y: 20, color: 'text-emerald-400' },
          { id: 'web', icon: Layers, label: 'Next.js (Port 3000)', x: 35, y: 50, color: 'text-blue-400' },
          { id: 'socket', icon: Network, label: 'Socket (Port 3002)', x: 35, y: 80, color: 'text-purple-400', pulse: true },
          { id: 'postgres', icon: Database, label: 'PostgreSQL', x: 70, y: 35, color: 'text-blue-500' },
          { id: 'redis', icon: Zap, label: 'Redis Cache', x: 70, y: 65, color: 'text-red-400' },
        ].map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative p-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors shadow-2xl">
              <node.icon className={`w-5 h-5 md:w-6 md:h-6 ${node.color}`} />
              {node.pulse && (
                <div className="absolute inset-0 rounded-xl border border-purple-400/30 animate-ping opacity-50" />
              )}
            </div>
            <span className="mt-2 text-[10px] md:text-xs font-medium text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
              {node.label}
            </span>
            {node.id === 'socket' && (
              <span className="absolute -top-6 text-[9px] text-purple-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Yjs CRDTs
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
