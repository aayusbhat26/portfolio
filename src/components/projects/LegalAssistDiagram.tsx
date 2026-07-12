"use client";

import { motion } from "framer-motion";
import { FileText, Cpu, Network, Database, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function LegalAssistDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      
      {/* Knowledge Graph Hero Moment Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 4, duration: 2 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle 
              key={`kg-node-${i}`} 
              cx={Math.random() * 100} 
              cy={Math.random() * 100} 
              r="0.5" 
              fill="#10b981" 
            />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <path 
              key={`kg-edge-${i}`} 
              d={`M ${Math.random() * 100} ${Math.random() * 100} L ${Math.random() * 100} ${Math.random() * 100}`} 
              stroke="#10b981" 
              strokeWidth="0.1" 
              opacity="0.3" 
            />
          ))}
        </svg>
      </motion.div>

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {[
          { from: [15, 50], to: [30, 50] }, // PDF -> Gemini
          { from: [30, 50], to: [50, 30] }, // Gemini -> Embeddings
          { from: [50, 30], to: [70, 50] }, // Embeddings -> Vector DB
          { from: [70, 50], to: [85, 50] }, // Vector DB -> Answer
          { from: [30, 50], to: [85, 50] }, // Gemini -> Answer (direct stream)
        ].map((edge, i) => {
          const [x1, y1] = edge.from;
          const [x2, y2] = edge.to;
          const d = `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <motion.path
              key={i}
              d={d}
              stroke="#10b981" // emerald-500
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.3 }}
            />
          );
        })}

        {/* Animated Packets */}
        {[
          { path: "M 15 50 L 30 50", delay: 0 },
          { path: "M 30 50 C 40 50, 40 30, 50 30", delay: 1 },
          { path: "M 50 30 C 60 30, 60 50, 70 50", delay: 2 },
          { path: "M 70 50 L 85 50", delay: 3 },
        ].map((packet, i) => (
          <circle key={`packet-${i}`} r="1.5" fill="#34d399" filter="drop-shadow(0 0 4px #34d399)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={packet.path} begin={`${packet.delay}s`} />
          </circle>
        ))}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full z-10">
        {[
          { id: 'pdf', icon: FileText, label: 'Upload PDF', x: 15, y: 50, color: 'text-white' },
          { id: 'gemini', icon: Cpu, label: 'Gemini Pro', x: 30, y: 50, color: 'text-emerald-400', pulse: true },
          { id: 'embeddings', icon: Network, label: 'Embeddings', x: 50, y: 30, color: 'text-emerald-300' },
          { id: 'vectordb', icon: Database, label: 'Vector DB', x: 70, y: 50, color: 'text-blue-400' },
          { id: 'answer', icon: MessageSquare, label: 'Final Answer', x: 85, y: 50, color: 'text-white' },
        ].map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 + 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative p-3 md:p-4 bg-black/80 border border-white/20 rounded-xl backdrop-blur-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors shadow-2xl">
              <node.icon className={`w-5 h-5 md:w-6 md:h-6 ${node.color}`} />
              {node.pulse && (
                <div className="absolute inset-0 rounded-xl border border-emerald-400/30 animate-ping" />
              )}
            </div>
            <span className="mt-2 text-[10px] md:text-xs font-semibold text-white/80 group-hover:text-white transition-colors text-center w-24">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
