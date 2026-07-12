"use client";

import { motion } from "framer-motion";
import { User, Server, Network } from "lucide-react";
import { useEffect, useState } from "react";

export default function DrawTogetherDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      
      {/* Collaborative Canvas Simulation */}
      <motion.div 
        className="absolute inset-0 m-auto w-3/4 h-2/3 border border-purple-500/20 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg className="w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M 20 50 Q 30 20, 50 50 T 80 50" 
            stroke="#a855f7" 
            strokeWidth="1.5" 
            fill="none" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {/* Virtual cursors */}
          <motion.g
            animate={{ x: [20, 50, 80], y: [50, 50, 50] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <path d="M0,0 L0,4 L3,3 Z" fill="#fff" />
            <text x="4" y="6" fontSize="4" fill="#fff" className="font-mono">User A</text>
          </motion.g>
        </svg>
      </motion.div>

      {/* SVG Connections (Sockets) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {[
          { from: [15, 80], to: [50, 80] }, // User A -> Server
          { from: [50, 80], to: [85, 80] }, // Server -> User B
        ].map((edge, i) => {
          const [x1, y1] = edge.from;
          const [x2, y2] = edge.to;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#a855f7" // purple-500
              strokeWidth="0.5"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.5 }}
            />
          );
        })}

        {/* Socket Packets (Binary Payloads) */}
        <circle r="1" fill="#c084fc">
          <animateMotion dur="1s" repeatCount="indefinite" path="M 15 80 L 50 80" />
        </circle>
        <circle r="1" fill="#c084fc">
          <animateMotion dur="1s" repeatCount="indefinite" path="M 50 80 L 85 80" begin="0.5s" />
        </circle>
        
        {/* Acks returning */}
        <circle r="0.5" fill="#f87171" opacity="0.5">
          <animateMotion dur="1s" repeatCount="indefinite" path="M 50 80 L 15 80" begin="0.8s" />
        </circle>
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {[
          { id: 'userA', icon: User, label: 'User A', x: 15, y: 80, color: 'text-white' },
          { id: 'socket', icon: Network, label: 'WebSocket (Binary)', x: 50, y: 80, color: 'text-purple-400', pulse: true },
          { id: 'userB', icon: User, label: 'User B', x: 85, y: 80, color: 'text-white' },
        ].map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.3 + 1 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative p-3 bg-black/80 border border-purple-500/30 rounded-xl backdrop-blur-xl shadow-2xl">
              <node.icon className={`w-5 h-5 ${node.color}`} />
              {node.pulse && (
                <div className="absolute inset-0 rounded-xl border border-purple-400/30 animate-ping" />
              )}
            </div>
            <span className="mt-2 text-[10px] font-semibold text-white/80 text-center w-24">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
